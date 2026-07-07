import { afterEach, describe, expect, it, vi } from "vitest";

import {
  ApiError,
  apiHost,
  postDemoRequest,
  postMailingListSubscribe,
} from "@/lib/api";

function mockFetch(response: Partial<Response> & { ok: boolean }) {
  const fetchMock = vi.fn().mockResolvedValue({
    status: 201,
    text: () => Promise.resolve(""),
    json: () => Promise.resolve({ status: "ok" }),
    ...response,
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("apiHost", () => {
  it("defaults to the production backend", () => {
    expect(apiHost()).toBe("https://api.fightpaperwork.com");
  });

  it("respects the API_HOST env override", () => {
    vi.stubEnv("API_HOST", "https://example.test");
    expect(apiHost()).toBe("https://example.test");
  });
});

describe("postDemoRequest", () => {
  it("POSTs the payload as JSON to the absolute demo_request URL", async () => {
    // Guards against the pro-site bug where the request went to the page
    // origin instead of the API host.
    const fetchMock = mockFetch({ ok: true });
    const payload = {
      email: "pro@example.com",
      name: "Test Professional",
      company: "Acme Health",
      role: "Billing Manager",
      source: "news",
      phone: "555-0100",
    };

    await postDemoRequest(payload);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.fightpaperwork.com/ziggy/rest/demo_request/");
    expect(init.method).toBe("POST");
    expect(init.headers).toEqual({ "Content-Type": "application/json" });
    expect(JSON.parse(init.body)).toEqual(payload);
  });

  it("uses the API_HOST override when set", async () => {
    vi.stubEnv("API_HOST", "https://api-stub.fightpaperwork.invalid");
    const fetchMock = mockFetch({ ok: true });

    await postDemoRequest({ email: "pro@example.com" });

    expect(fetchMock.mock.calls[0][0]).toBe(
      "https://api-stub.fightpaperwork.invalid/ziggy/rest/demo_request/",
    );
  });

  it("does not send credentials (cookies) with the request", async () => {
    const fetchMock = mockFetch({ ok: true });

    await postDemoRequest({ email: "pro@example.com" });

    expect(fetchMock.mock.calls[0][1]).not.toHaveProperty("credentials");
  });

  it("throws ApiError with status and body on a non-2xx response", async () => {
    mockFetch({
      ok: false,
      status: 500,
      text: () => Promise.resolve("boom"),
    });

    const error = await postDemoRequest({ email: "pro@example.com" }).catch(
      (e) => e,
    );

    expect(error).toBeInstanceOf(ApiError);
    expect(error.status).toBe(500);
    expect(error.body).toBe("boom");
  });
});

describe("postMailingListSubscribe", () => {
  it("POSTs the payload to the mailinglist_subscribe endpoint", async () => {
    const fetchMock = mockFetch({
      ok: true,
      json: () => Promise.resolve({ status: "subscribed" }),
    });

    const result = await postMailingListSubscribe({
      email: "user@example.com",
      name: "Test User",
    });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(
      "https://api.fightpaperwork.com/ziggy/rest/mailinglist_subscribe/",
    );
    expect(JSON.parse(init.body)).toEqual({
      email: "user@example.com",
      name: "Test User",
    });
    expect(result).toEqual({ status: "subscribed" });
  });

  it("tolerates an empty response body on success", async () => {
    mockFetch({
      ok: true,
      json: () => Promise.reject(new Error("no body")),
    });

    await expect(
      postMailingListSubscribe({ email: "user@example.com" }),
    ).resolves.toEqual({});
  });
});
