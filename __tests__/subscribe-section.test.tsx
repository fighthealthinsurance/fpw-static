import { beforeEach, describe, expect, it, vi } from "vitest";

import { render, screen, userEvent } from "../test-utils";
import SubscribeSection from "@/components/SubscribeSection";

const { postMailingListSubscribeMock } = vi.hoisted(() => ({
  postMailingListSubscribeMock: vi.fn(),
}));

vi.mock("@/lib/api", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/api")>();
  return {
    ...actual,
    postMailingListSubscribe: postMailingListSubscribeMock,
  };
});

beforeEach(() => {
  postMailingListSubscribeMock.mockReset();
});

describe("SubscribeSection", () => {
  it("submits name and email and shows the success state", async () => {
    postMailingListSubscribeMock.mockResolvedValue({ status: "subscribed" });
    const user = userEvent.setup();
    render(<SubscribeSection />);

    await user.type(screen.getByLabelText(/full name/i), "Test User");
    await user.type(
      screen.getByLabelText(/email address/i),
      "testuser@example.com",
    );
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(postMailingListSubscribeMock).toHaveBeenCalledWith({
      email: "testuser@example.com",
      name: "Test User",
    });
    expect(
      await screen.findByText(/thank you for subscribing!/i),
    ).toBeInTheDocument();
  });

  it("shows an error and keeps the form on failure", async () => {
    postMailingListSubscribeMock.mockRejectedValue(new Error("network down"));
    const user = userEvent.setup();
    render(<SubscribeSection />);

    await user.type(screen.getByLabelText(/full name/i), "Test User");
    await user.type(
      screen.getByLabelText(/email address/i),
      "testuser@example.com",
    );
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(await screen.findByText(/subscription failed/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toHaveValue(
      "testuser@example.com",
    );
  });
});
