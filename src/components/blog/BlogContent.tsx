export default function BlogContent({ html }: { html: string }) {
  return (
    <div
      className="blog-prose mt-10"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
