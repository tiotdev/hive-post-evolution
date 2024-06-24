import parseHtmlToReact from "helpers/parseHtmlToReact";
import { AuthContext } from "components/Docs/AuthProvider";
import React, { useContext } from "react";
import LanguagePicker from "./LanguagePicker";

const BlogPost = ({ post }) => {
  const { isLoggedIn } = useContext(AuthContext);

  const reactParsed = parseHtmlToReact(
    isLoggedIn && post.fullHtmlBody ? post.fullHtmlBody : post.htmlBody,
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
      <LanguagePicker post={post} />
      <div className="prose max-w-none">{reactParsed}</div>
    </div>
  );
};

export default BlogPost;
