export function GET() {
  return new Response('0.4.21-alpha', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
