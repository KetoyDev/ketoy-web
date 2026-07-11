export function GET() {
  return new Response('0.4.13-alpha', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
