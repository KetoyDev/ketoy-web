import { codeToHtml } from 'shiki';
import CopyButton from './CopyButton';

const LANG_ALIASES = {
  sh: 'bash',
  shell: 'bash',
  console: 'bash',
  text: 'plaintext',
  plain: 'plaintext',
  jsonc: 'json',
  yml: 'yaml',
  proto: 'protobuf',
};

const SUPPORTED = new Set([
  'bash', 'plaintext', 'kotlin', 'java', 'json', 'yaml', 'xml', 'gradle',
  'groovy', 'js', 'javascript', 'ts', 'typescript', 'jsx', 'tsx', 'sql',
  'toml', 'properties', 'protobuf', 'diff', 'markdown', 'md', 'http',
]);

export async function CodeBlock({ className = '', children, file }) {
  const langMatch = /language-([a-zA-Z0-9_+-]+)/.exec(className || '');
  let lang = langMatch ? langMatch[1] : 'plaintext';
  if (LANG_ALIASES[lang]) lang = LANG_ALIASES[lang];
  if (!SUPPORTED.has(lang)) lang = 'plaintext';

  const code = typeof children === 'string'
    ? children
    : Array.isArray(children) ? children.join('') : String(children ?? '');

  const trimmed = code.replace(/\n$/, '');
  const html = await codeToHtml(trimmed, { lang, theme: 'github-dark' });

  return (
    <div className="code-window">
      <div className="code-chrome">
        <div className="dots"><i></i><i></i><i></i></div>
        {file && <span className="file">{file}</span>}
        {!file && lang !== 'plaintext' && <span className="file">{lang}</span>}
        <CopyButton text={trimmed} />
      </div>
      <div
        className="code-body shiki-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

export function Pre({ children }) {
  if (children && children.props) {
    const { className, children: code } = children.props;
    return <CodeBlock className={className}>{code}</CodeBlock>;
  }
  return <pre>{children}</pre>;
}
