const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8787";

function authHeaders(extra: Record<string, string> = {}) {
  const secret = import.meta.env.VITE_ADMIN_API_SECRET as string | undefined;
  return {
    ...extra,
    Authorization: `Bearer ${secret ?? ""}`,
  };
}

export async function uploadCSV(csvData: any[]) {
  const res = await fetch(`${BASE}/api/attendees/upload`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ csvData }),
  });
  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}

export async function assignCodes(codes: string[]) {
  const res = await fetch(`${BASE}/api/attendees/assign-codes`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ codes }),
  });
  if (!res.ok) throw new Error("Assign codes failed");
  return res.json();
}

export const getCheckedIn = async () => {
  const r = await fetch(`${BASE}/api/attendees/checked-in`, { headers: authHeaders() });
  if (!r.ok) throw new Error("Fetch checked-in failed");
  return r.json();
};

export const getAssignmentPreview = async () => {
  const r = await fetch(`${BASE}/api/attendees/assignment-preview`, { headers: authHeaders() });
  if (!r.ok) throw new Error("Fetch assignment preview failed");
  return r.json();
};

export const getStats = async () => {
  const r = await fetch(`${BASE}/api/stats`, { headers: authHeaders() });
  if (!r.ok) throw new Error("Fetch stats failed");
  return r.json();
};

export const getSentEmails = async () => {
  const r = await fetch(`${BASE}/api/sent-emails`, { headers: authHeaders() });
  if (!r.ok) throw new Error("Fetch sent emails failed");
  return r.json();
};

export const sendEmails = async (eventName: string) => {
  const res = await fetch(`${BASE}/api/emails/send`, {
    method: "POST",
    headers: authHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ eventName }),
  });
  if (!res.ok) throw new Error("Send emails failed");
  return res.json();
};

export const deleteAllAttendees = async () => {
  const r = await fetch(`${BASE}/api/attendees/delete-all`, {
    method: "POST",
    headers: authHeaders(),
  });
  if (!r.ok) throw new Error("Delete all failed");
  return r.json();
};

export const deleteAttendee = async (id: number) => {
  const r = await fetch(`${BASE}/api/attendees/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!r.ok) throw new Error("Delete failed");
  return r.json();
};
