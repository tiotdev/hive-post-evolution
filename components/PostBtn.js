// TODO: Implement link sanitization (nofollow, exit Url,...)

export default function PostBtn({ link, text }) {
  return (
    <div className="not-prose py-3 text-center">
      <a
        className="bg-green-700 hover:bg-green-600 text-white p-2 rounded"
        href={link}
      >
        {text}
      </a>
    </div>
  );
}
