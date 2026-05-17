import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const CONTENT_ROOT = join(process.cwd(), 'content');

export async function GET() {
  try {
    const html = await readFile(join(CONTENT_ROOT, 'index.html'), 'utf8');
    return new Response(html, {
      headers: { 'content-type': 'text/html; charset=utf-8' },
    });
  } catch {
    return new Response('Not Found', { status: 404 });
  }
}
