import parse from "html-react-parser";
import PostBtn from "components/PostBtn";
import TableOfContents from "components/TableOfContents";
import getSlug from "speakingurl";

const parseHtmlToReact = htmlBody => {
  const parseOptions = {
    replace: ({ name, attribs, children, parent }) => {
      if (!attribs) return;
      if (
        (name === "h1" || name === "h2" || name === "h3" || name === "h4") &&
        children &&
        children.length > 0 &&
        children[0].data &&
        typeof children[0].data === "string"
      ) {
        // Add id to headings for table of contents links
        attribs.id = getSlug(children[0].data);
      }
      if (name === "div" && attribs.json) {
        try {
          const json = JSON.parse(attribs.json);

          if (json.type === "button") {
            return <PostBtn {...json.data} />;
          }
          if (json.type === "tableOfContents") {
            return <TableOfContents headings={json.data.headings} />;
          }
          return;
        } catch {
          return;
        }
      }
    },
  };

  return parse(htmlBody, parseOptions);
};

export default parseHtmlToReact;
