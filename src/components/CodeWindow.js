import { codeToHtml } from 'shiki';

export default async function CodeWindow({
  file,
  tag,
  tagStyle,
  lang = 'kotlin',
  children,
}) {
  const code = typeof children === 'string'
    ? children
    : Array.isArray(children) ? children.join('') : String(children ?? '');

  const html = await codeToHtml(code, {
    lang,
    theme: 'github-dark',
  });

  return (
    <div className="code-window">
      <div className="code-chrome">
        <div className="dots"><i></i><i></i><i></i></div>
        {file && <span className="file">{file}</span>}
        {tag && <span className="tag" style={tagStyle}>{tag}</span>}
      </div>
      <div
        className="code-body shiki-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
