export function GET() {
  return new Response('0.1.2', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}