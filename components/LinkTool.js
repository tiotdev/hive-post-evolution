export default function LinkTool({
  permlink,
  author,
  title,
  description,
  image,
}) {
  if (!title || !description) return <></>;
  return (
    <div className="not-prose font-sans">
      <div className="mb-2 text-center text-xs uppercase tracking-wide text-gray-400 dark:text-gray-600">
        Read more
      </div>
      <a href={`/@${author}/${permlink}`}>
        <div className="group mb-5">
          <div
            className="flex items-stretch overflow-hidden rounded-xl bg-red-100 shadow-sm
      "
          >
            {image && (
              <div className="relative w-32 shrink-0 sm:w-56">
                <div className="relative h-full w-32 transition-all duration-1000 group-hover:scale-110 sm:w-56">
                  <img
                    className="object-cover object-center h-full"
                    alt={title}
                    src={image}
                  />
                </div>
              </div>
            )}
            <div className="relative w-full bg-red-100 p-8 group-hover:bg-red-200 dark:bg-red-900 dark:group-hover:bg-red-800">
              <div className="flex h-full">
                <div className="m-auto">
                  <h5 className="mb-1 text-2xl font-semibold text-red-900 dark:text-red-100">
                    {title}
                  </h5>
                  <div className="mb-2 text-sm text-red-700 dark:text-red-400">
                    by {author}
                  </div>
                  <div className="hidden text-base text-gray-700 dark:text-gray-300 sm:block">
                    {description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
