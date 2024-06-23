import parse from "html-react-parser";

const parseHtmlToReact = htmlBody => {
  return parse(htmlBody);
};

export default parseHtmlToReact;
