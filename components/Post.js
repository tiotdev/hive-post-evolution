import React from "react";
import parseHtmlToReact from "helpers/parseHtmlToReact";

const BlogPost = ({ post }) => {
  const reactParsed = parseHtmlToReact(post.htmlBody);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="prose max-w-none">{reactParsed}</div>
    </div>
  );
};

export default BlogPost;
