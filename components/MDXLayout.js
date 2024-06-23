export default function MDXLayout({ children }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="prose max-w-none">{children}</div>
    </div>
  );
}
