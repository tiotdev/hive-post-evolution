import hive from "@hiveio/hive-js";
import renderer from "helpers/renderContent";
import Post from "components/Post";

const PostPage = ({ post }) => {
  return <Post post={post} />;
};

// This function gets called at request time
export async function getServerSideProps({ params }) {
  if (params.author[0] !== "@") {
    return {
      redirect: {
        destination: `/@${params.author}/${params.languageOrPermlink}`,
        permanent: true,
      },
    };
  }

  const language = "en";

  const author = params.author.replace(/@/, "");
  const permlink = params.languageOrPermlink;

  try {
    // Fetch the post from the Hive blockchain
    const post = await hive.api.getContentAsync(author, permlink);

    // Check if post was found
    if (!post || post.author === "") {
      return { notFound: true };
    }

    let meta = {};
    try {
      meta = JSON.parse(post.json_metadata);
    } catch (err) {
      console.error(err);
    }
    let langVersion = meta && meta.languages ? meta.languages[language] : {};
    if (!langVersion) langVersion = {};
    const langBody = langVersion.body
      ? JSON.parse(langVersion.body)
      : post.body;
    const langTitle = langVersion.title || post.title;

    const availableLanguages =
      meta && meta.languages ? Object.keys(meta.languages) : [];
    if (availableLanguages.length > 0) {
      const languageIndex = availableLanguages.indexOf(language);
      if (languageIndex > -1) {
        // remove the current language from available languages
        availableLanguages.splice(languageIndex, 1);
      }
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
