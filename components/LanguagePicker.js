import languageCodeToName from "helpers/languageCodeToName.json";

export default function LanguagePicker({ post }) {
  if (!post.availableLanguages || post.availableLanguages.length === 0)
    return <></>;
  return (
    <div className="pb-2">
      This post is also available in:{" "}
      {post.availableLanguages.map(language => {
        return (
          <span key={language}>
            <a
              className="underline hover:text-red-600"
              href={
                language === "en"
                  ? `/@${post.author}/${post.permlink}`
                  : `/@${post.author}/${language}/${post.permlink}`
              }
            >
              {languageCodeToName[language]}
            </a>{" "}
          </span>
        );
      })}
    </div>
  );
}
