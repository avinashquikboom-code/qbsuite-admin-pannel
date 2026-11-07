import { getAuthToken } from '@/lib/auth/admin-session';

function buildHeaders(customerId) {
  const headers = { Accept: 'application/json', 'Content-Type': 'application/json' };
  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  if (customerId) {
    headers['x-customer-id'] = String(customerId);
  }
  return headers;
}

async function parseResponse(res) {
  const text = await res.text();
  let body = {};
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = { message: text };
    }
  }
  if (!res.ok) {
    const err = new Error(body?.message || body?.detail || 'Request failed');
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return body;
}

const BFF = '/api/admin/data-management';

export async function fetchDataManagementOverview(customerId) {
  const qs = customerId ? `?customerId=${encodeURIComponent(customerId)}` : '';
  const res = await fetch(`${BFF}/overview${qs}`, {
    credentials: 'same-origin',
    headers: buildHeaders(customerId),
  });
  return parseResponse(res);
}

export async function fetchDataManagementModules(customerId) {
  const qs = customerId ? `?customerId=${encodeURIComponent(customerId)}` : '';
  const res = await fetch(`${BFF}/modules${qs}`, {
    credentials: 'same-origin',
    headers: buildHeaders(customerId),
  });
  return parseResponse(res);
}

export async function fetchDataManagementHistory(customerId) {
  const qs = customerId ? `?customerId=${encodeURIComponent(customerId)}` : '';
  const res = await fetch(`${BFF}/history${qs}`, {
    credentials: 'same-origin',
    headers: buildHeaders(customerId),
  });
  return parseResponse(res);
}

export async function postDeletionPreview(customerId, payload) {
  const res = await fetch(`${BFF}/preview`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: buildHeaders(customerId),
    body: JSON.stringify(payload),
  });
  return parseResponse(res);
}

export async function postDeletionExecute(customerId, payload) {
  const res = await fetch(`${BFF}/execute`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: buildHeaders(customerId),
    body: JSON.stringify(payload),
  });
  return parseResponse(res);
}
