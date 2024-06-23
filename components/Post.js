import React from "react";
import parseHtmlToReact from "helpers/parseHtmlToReact";

const BlogPost = ({ post }) => {
  const reactParsed = parseHtmlToReact(post.htmlBody);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
      <div className="prose max-w-none">{reactParsed}</div>
    </div>
  );
};

export default BlogPost;
