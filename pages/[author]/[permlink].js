import hive from "@hiveio/hive-js";

const PostPage = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
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
    // Pass data to the page via props
    return { props: { post } };
  } catch (error) {
    console.error("Error fetching post from Hive:", error);
    return { notFound: true };
  }
}

export default PostPage;
