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

  const permlink = params.languageOrPermlink;
  const author = params.author.replace(/@/, "");

  try {
    // Fetch the post from the Hive blockchain
    const post = await hive.api.getContentAsync(author, permlink);

    // Check if post was found
    if (!post || post.author === "") {
      return { notFound: true };
    }

    let fullHtmlBody = "";

    try {
      const meta = JSON.parse(post.json_metadata);
      if (
        meta &&
        meta.onlyExcerpt &&
        meta.languages &&
        meta.languages.en &&
        meta.languages.en.body
      ) {
        fullHtmlBody = renderer.render(JSON.parse(meta.languages.en.body));
      }
    } catch (err) {
      console.error(err);
    }

    const htmlBody = renderer.render(post.body);

    // Pass data to the page via props
    return { props: { post: { ...post, htmlBody, fullHtmlBody } } };
  } catch (error) {
    console.error("Error fetching post from Hive:", error);
    return { notFound: true };
  }
}

export default PostPage;
