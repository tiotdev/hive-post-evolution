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
    if (!langVersion || !langVersion.title || !langVersion.body)
      return { notFound: true };

    let htmlBody = renderer.render(JSON.parse(langVersion.body));

    let fullHtmlBody = "";
    if (meta.onlyExcerpt) {
      fullHtmlBody = renderer.render(JSON.parse(langVersion.body));
      htmlBody = renderer.render(
        JSON.parse(langVersion.body).split("\n")[0] +
          "\n\nLogin to read the full post",
      );
    }

    // Pass data to the page via props
    return {
      props: {
        post: { ...post, htmlBody, fullHtmlBody, title: langVersion.title },
      },
    };
  } catch (error) {
    console.error("Error fetching post from Hive:", error);
    return { notFound: true };
  }
}

export default PostPage;
