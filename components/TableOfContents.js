import getSlug from "speakingurl";

function TocElement({ title, index1, index2, index3 }) {
  return (
    <div className="py-1">
      <a href={`#${getSlug(title)}`}>
        <div className="flex leading-7 text-red-900 hover:text-red-600 hover:underline dark:text-red-300 dark:hover:text-red-500">
          <span className="mr-3 font-bold">
            {index1 + 1}
            {index2 !== undefined ? `.${index2 + 1}` : ""}
            {index3 !== undefined ? `.${index3 + 1}` : ""}{" "}
          </span>
          {title}
        </div>
      </a>
    </div>
  );
}

export default function TableOfContents(props) {
  const { headings } = props;

  if (!headings || headings.length < 1) return <></>;

  return (
    <div className="not-prose font-sans">
      <div className="relative mb-10 rounded-lg border-l-8 border-red-600 bg-red-200 pb-5 dark:bg-red-800">
        <div className="relative z-10 p-10 pb-5">
          <div className="mb-5 text-4xl font-bold uppercase tracking-wide text-red-800 dark:text-red-200">
            Table of Contents
          </div>
          <ol className="sm:columns-2">
            {headings.map((heading, index1) => {
              return (
                <li key={heading.title}>
                  <TocElement title={heading.title} index1={index1} />
                  {heading.subheadings.length > 0 && (
                    <ol className="ml-5">
                      {heading.subheadings.map((subheading, index2) => {
                        return (
                          <li key={subheading.title}>
                            <TocElement
                              title={subheading.title}
                              index1={index1}
                              index2={index2}
                            />
                            {subheading.subheadings.length > 0 && (
                              <ol className="ml-5">
                                {subheading.subheadings.map((sh, index3) => {
                                  return (
                                    <TocElement
                                      key={sh.title}
                                      title={sh.title}
                                      index1={index1}
                                      index2={index2}
                                      index3={index3}
                                    />
                                  );
                                })}
                              </ol>
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
