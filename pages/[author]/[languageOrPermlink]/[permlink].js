import hive from "@hiveio/hive-js";
import renderer from "helpers/renderContent";
import Post from "components/Post";
import iso639Languages from "helpers/iso639Languages.json";

const PostPage = ({ post }) => {
  return <Post post={post} />;
};

// This function gets called at request time
export async function getServerSideProps({ params }) {
  if (params.author[0] !== "@") {
    return {
      redirect: {
        destination: `/@${params.author}/${params.languageOrPermlink}/${params.permlink}`,
        permanent: true,
      },
    };
  }

  const language = params.languageOrPermlink;
  if (language === "en")
    return {
      redirect: {
        destination: `/${params.author}/${params.permlink}`,
        permanent: true,
      },
    };

  if (iso639Languages.indexOf(language) === -1) return { notFound: true };

  const author = params.author.replace(/@/, "");
  const { permlink } = params;

  try {
    // Fetch the post from the Hive blockchain
    const post = await hive.api.getContentAsync(author, permlink);

    // Check if post was found
    if (!post || post.author === "") {
      return { notFound: true };
    }

    const meta = JSON.parse(post.json_metadata);
    const langVersion = meta.languages[language];
    if (!langVersion) return { notFound: true };
    const langBody = langVersion.body
      ? JSON.parse(langVersion.body)
      : post.body;
    const langTitle = langVersion.title || post.title;

    const availableLanguages = Object.keys(meta.languages);
    const languageIndex = availableLanguages.indexOf(language);
    if (languageIndex > -1) {
      // remove the current language from available languages
      availableLanguages.splice(languageIndex, 1);
    }

    let htmlBody = renderer.render(langBody);

    let fullHtmlBody = "";
    if (meta.onlyExcerpt) {
      fullHtmlBody = renderer.render(langBody);
      htmlBody = renderer.render(
        langBody.split("\n")[0] + "\n\nLogin to read the full post",
      );
    }

    // Pass data to the page via props
    return {
      props: {
        post: {
          author: post.author,
          permlink: post.permlink,
          htmlBody,
          fullHtmlBody,
          title: langTitle,
          availableLanguages,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching post from Hive:", error);
    return { notFound: true };
  }
}

export default PostPage;
