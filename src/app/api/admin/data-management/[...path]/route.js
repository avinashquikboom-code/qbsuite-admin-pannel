const SESSION_COOKIE = 'qb_admin_session';

function apiBase() {
  return (
    process.env.API_BASE_URL?.replace(/\/$/, '') ||
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '')
  );
}

async function proxy(request, { params }) {
  const base = apiBase();
  if (!base) {
    return Response.json(
      { message: 'API_BASE_URL is not configured on the admin panel.' },
      { status: 503 },
    );
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    return Response.json({ message: 'Super Admin session required.' }, { status: 401 });
  }

  const segments = (await params).path || [];
  const subPath = Array.isArray(segments) ? segments.join('/') : String(segments);
  const customerId =
    request.headers.get('x-customer-id') ||
    request.nextUrl.searchParams.get('customerId');

  const targetUrl = new URL(`${base}/admin/data-management/${subPath}`);
  request.nextUrl.searchParams.forEach((value, key) => {
    if (key !== 'customerId') {
      targetUrl.searchParams.set(key, value);
    }
  });

  const method = request.method;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  };
  if (customerId) {
    headers['x-customer-id'] = String(customerId);
  }

  const init = { method, headers, cache: 'no-store' };

  if (method !== 'GET' && method !== 'HEAD') {
    const text = await request.text();
    headers['Content-Type'] = 'application/json';
    init.body = text || undefined;
  }

  const upstream = await fetch(targetUrl.toString(), init);
  const bodyText = await upstream.text();
  let json = {};
  if (bodyText) {
    try {
      json = JSON.parse(bodyText);
    } catch {
      json = { message: bodyText };
    }
  }

  return Response.json(json, { status: upstream.status });
}

export async function GET(request, context) {
  return proxy(request, context);
}

export async function POST(request, context) {
  return proxy(request, context);
}
