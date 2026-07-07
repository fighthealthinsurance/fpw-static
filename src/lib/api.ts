// The only network code in this repo: two unauthenticated JSON POSTs to the
// Fight Health Insurance backend (the same Django app that serves
// fighthealthinsurance.com; the pro-era host api.fightpaperwork.com).

export interface DemoRequestPayload {
  email: string;
  name?: string;
  company?: string;
  role?: string;
  source?: string;
  phone?: string;
}

export interface MailingListSubscribePayload {
  email: string;
  name?: string;
}

export interface StatusResponse {
  status?: string;
  message?: string;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: string,
  ) {
    super(`API request failed with status ${status}`);
    this.name = "ApiError";
  }
}

// Read at call time (not module load) so tests can stub the env per-case.
// In the browser bundle Next.js inlines process.env.API_HOST at build time.
export function apiHost(): string {
  return process.env.API_HOST || "https://api.fightpaperwork.com";
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  // The URL must always be absolute. The pro site called the generated SDK
  // without its configured client, so requests went to the page origin
  // instead of the API host. No `credentials` and no CSRF header: these are
  // public endpoints, and omitting cookies keeps the CORS story simple.
  const response = await fetch(`${apiHost()}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new ApiError(response.status, await response.text().catch(() => ""));
  }
  return (await response.json().catch(() => ({}))) as T;
}

/** Register an interested professional; the backend notifies the team and the connector partner. */
export const postDemoRequest = (payload: DemoRequestPayload) =>
  postJson<StatusResponse>("/ziggy/rest/demo_request/", payload);

/** Subscribe to the mailing list. */
export const postMailingListSubscribe = (
  payload: MailingListSubscribePayload,
) => postJson<StatusResponse>("/ziggy/rest/mailinglist_subscribe/", payload);
