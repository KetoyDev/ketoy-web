import { childrenToText, slugify } from '@/modules/docs/lib/slug';

export function Heading({ as: Tag = 'h2', children, id: idProp, ...rest }) {
  const id = idProp || slugify(childrenToText(children));
  return (
    <Tag id={id} className="doc-heading" {...rest}>
      <a href={`#${id}`} className="doc-heading-anchor" aria-label="Link to section">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </a>
      <span className="doc-heading-text">{children}</span>
    </Tag>
  );
}

export const H2 = (props) => <Heading as="h2" {...props} />;
export const H3 = (props) => <Heading as="h3" {...props} />;
export const H4 = (props) => <Heading as="h4" {...props} />;
