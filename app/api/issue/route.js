const JSON_HEADERS = { 'content-type': 'application/json; charset=utf-8' };

export async function POST(request) {
  const baseUrl = process.env.WAITLIST_API_BASE_URL;
  if (!baseUrl) {
    return new Response(
      JSON.stringify({ message: 'WAITLIST_API_BASE_URL is not set' }),
      { status: 500, headers: JSON_HEADERS }
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ message: 'Invalid JSON payload' }),
      { status: 400, headers: JSON_HEADERS }
    );
  }

  const target = baseUrl.replace(/\/$/, '') + '/issue';

  try {
    const upstream = await fetch(target, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const bodyText = await upstream.text();
    const contentType = upstream.headers.get('content-type') || 'application/json; charset=utf-8';

    return new Response(bodyText, {
      status: upstream.status,
      headers: { 'content-type': contentType },
    });
  } catch {
    return new Response(
      JSON.stringify({ message: 'Upstream request failed' }),
      { status: 502, headers: JSON_HEADERS }
    );
  }
}
