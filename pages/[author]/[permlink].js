import hive from "@hiveio/hive-js";
import parseHtmlToReact from "helpers/parseHtmlToReact";
import renderer from "helpers/renderContent";

const PostPage = ({ post }) => {
  const reactParsed = parseHtmlToReact(post.htmlBody);
  return (
    <div>
      <h1>{post.title}</h1>
      <div>{reactParsed}</div>
    </div>
  );
};

// This function gets called at request time
export async function getServerSideProps({ params }) {
  if (params.author[0] !== "@") {
    return {
      redirect: {
        destination: `/@${params.author}/${params.permlink}`,
        permanent: true,
      },
    };
  }

  const { permlink } = params;
  const author = params.author.replace(/@/, "");

  try {
    // Fetch the post from the Hive blockchain
    const post = await hive.api.getContentAsync(author, permlink);

    // Check if post was found
    if (!post || post.author === "") {
      return { notFound: true };
    }

    const htmlBody = renderer.render(post.body);

    // Pass data to the page via props
    return { props: { post: { ...post, htmlBody } } };
  } catch (error) {
    console.error("Error fetching post from Hive:", error);
    return { notFound: true };
  }
}

export default PostPage;
