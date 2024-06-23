import parse from "html-react-parser";
import PostBtn from "components/PostBtn";

const parseHtmlToReact = htmlBody => {
  const parseOptions = {
    replace: ({ name, attribs, children, parent }) => {
      if (!attribs) return;
      if (name === "div" && attribs.json) {
        try {
          const json = JSON.parse(attribs.json);

          if (json.type === "button") {
            return <PostBtn {...json.data} />;
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
