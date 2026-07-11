// Renders a JSON-LD structured-data block. Server component: the script is
// part of the static HTML, so crawlers and LLMs see it without executing JS.
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
