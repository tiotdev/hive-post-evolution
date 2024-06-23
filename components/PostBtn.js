// TODO: Implement link sanitization (nofollow, exit Url,...)

export default function PostBtn({ link, text }) {
  return (
    <div className="not-prose py-3 text-center">
      <a
        className="rounded bg-red-700 p-2 text-white hover:bg-red-600"
        href={link}
      >
        {text}
      </a>
    </div>
  );
}
