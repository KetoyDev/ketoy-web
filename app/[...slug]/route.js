import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const CONTENT_ROOT = join(process.cwd(), 'content');

function isSafePath(parts) {
  return parts.every((part) => part && part !== '..' && !part.includes('\\'));
}

export async function GET(request, { params }) {
  const { slug } = await params;
  const slugParts = Array.isArray(slug) ? slug : [];

  if (!isSafePath(slugParts)) {
    return new Response('Not Found', { status: 404 });
  }

  const slugPath = slugParts.join('/');

  // Redirect .html URLs to clean versions
  if (slugPath.endsWith('.html')) {
    const clean = slugPath.slice(0, -5); // strip .html
    const target = clean === 'index' ? '/' : `/${clean}`;
    return Response.redirect(new URL(target, request.url), 301);
  }

  // Serve clean URL → look up matching .html file
  try {
    const html = await readFile(join(CONTENT_ROOT, `${slugPath}.html`), 'utf8');
    return new Response(html, {
      headers: { 'content-type': 'text/html; charset=utf-8' },
    });
  } catch {
    return new Response('Not Found', { status: 404 });
  }
}
