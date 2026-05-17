import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const CONTENT_ROOT = join(process.cwd(), 'content');

function isSafePath(parts) {
  return parts.every((part) => part && part !== '..' && !part.includes('\\'));
}

export async function GET(_request, { params }) {
  const slugParts = Array.isArray(params?.slug) ? params.slug : [];
  const slugPath = slugParts.join('/');

  if (!slugPath || !slugPath.endsWith('.html')) {
    return new Response('Not Found', { status: 404 });
  }

  if (!isSafePath(slugParts)) {
    return new Response('Not Found', { status: 404 });
  }

  try {
    const html = await readFile(join(CONTENT_ROOT, slugPath), 'utf8');
    return new Response(html, {
      headers: { 'content-type': 'text/html; charset=utf-8' },
    });
  } catch {
    return new Response('Not Found', { status: 404 });
  }
}
