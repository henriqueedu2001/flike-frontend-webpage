import {
  DigitalKeyRequest,
  DigitalKeyRequestStatus,
} from "@/types/digitalKey";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function bearerHeaders(): HeadersInit {
  const token = localStorage.getItem("access_token");

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function getKeyRequests(
  status?: DigitalKeyRequestStatus
): Promise<DigitalKeyRequest[]> {
  const query = status ? `?status=${status}` : "";

  const res = await fetch(`${API_URL}/admin/keys/requests${query}`, {
    headers: bearerHeaders(),
  });

  const body = await res.json();

  if (!res.ok) throw new Error(JSON.stringify(body, null, 2));

  return body;
}

export async function approveKeyRequest(id: number) {
  const res = await fetch(`${API_URL}/admin/keys/requests/${id}/approve`, {
    method: "POST",
    headers: {
      ...bearerHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  const body = await res.json();

  if (!res.ok) throw new Error(JSON.stringify(body, null, 2));

  return body;
}

export async function rejectKeyRequest(id: number) {
  const res = await fetch(`${API_URL}/admin/keys/requests/${id}/reject`, {
    method: "POST",
    headers: bearerHeaders(),
  });

  const body = await res.json();

  if (!res.ok) throw new Error(JSON.stringify(body, null, 2));

  return body;
}
