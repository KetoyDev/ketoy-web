export function GET() {
  return new Response('0.3.4-alpha', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
