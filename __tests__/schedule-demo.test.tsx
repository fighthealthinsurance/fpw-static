import { Notifications } from "@mantine/notifications";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { render, screen, userEvent } from "../test-utils";
import DemoRequestForm from "@/components/DemoRequestForm";
import { ApiError } from "@/lib/api";

const { postDemoRequestMock } = vi.hoisted(() => ({
  postDemoRequestMock: vi.fn(),
}));

vi.mock("@/lib/api", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/api")>();
  return { ...actual, postDemoRequest: postDemoRequestMock };
});

let routerQuery: Record<string, string | string[]> = {};

vi.mock("next/router", () => ({
  useRouter: () => ({ query: routerQuery, isReady: true }),
}));

function renderForm() {
  return render(
    <>
      <Notifications />
      <DemoRequestForm />
    </>,
  );
}

async function fillRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/full name/i), "Test Professional");
  await user.type(screen.getByLabelText(/work email/i), "pro-lead@example.com");
  await user.type(screen.getByLabelText(/company/i), "Acme Health");
  await user.type(screen.getByLabelText(/job title/i), "Billing Manager");
}

beforeEach(() => {
  postDemoRequestMock.mockReset();
  routerQuery = {};
});

describe("DemoRequestForm", () => {
  it("blocks submission and shows validation errors for invalid input", async () => {
    // Truly empty fields are stopped by the native `required` attribute;
    // Mantine's validators catch whitespace-only and malformed values.
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/full name/i), "   ");
    await user.type(screen.getByLabelText(/work email/i), "not-an-email");
    await user.type(screen.getByLabelText(/company/i), "Acme Health");
    await user.type(screen.getByLabelText(/job title/i), "Billing Manager");
    await user.click(screen.getByRole("button", { name: /get started/i }));

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Please enter a valid email")).toBeInTheDocument();
    expect(postDemoRequestMock).not.toHaveBeenCalled();
  });

  it("submits the mapped payload and shows the thank-you panel", async () => {
    postDemoRequestMock.mockResolvedValue({ status: "ok" });
    const user = userEvent.setup();
    renderForm();

    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: /get started/i }));

    expect(postDemoRequestMock).toHaveBeenCalledWith({
      email: "pro-lead@example.com",
      name: "Test Professional",
      company: "Acme Health",
      role: "Billing Manager",
      source: "direct",
      phone: "",
    });
    expect(await screen.findByText(/thank you, test!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/our team will reach out shortly/i),
    ).toBeInTheDocument();
  });

  it("uses the ?source= query param when the select is left empty", async () => {
    routerQuery = { source: "news" };
    postDemoRequestMock.mockResolvedValue({ status: "ok" });
    const user = userEvent.setup();
    renderForm();

    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: /get started/i }));

    expect(postDemoRequestMock).toHaveBeenCalledWith(
      expect.objectContaining({ source: "news" }),
    );
  });

  it("prefers the selected source over the query param", async () => {
    routerQuery = { source: "news" };
    postDemoRequestMock.mockResolvedValue({ status: "ok" });
    const user = userEvent.setup();
    renderForm();

    await fillRequiredFields(user);
    await user.click(screen.getByPlaceholderText("Select an option"));
    await user.click(
      await screen.findByRole("option", { name: "Colleague Referral" }),
    );
    await user.click(screen.getByRole("button", { name: /get started/i }));

    expect(postDemoRequestMock).toHaveBeenCalledWith(
      expect.objectContaining({ source: "colleague" }),
    );
  });

  it("keeps the form (with values) and shows the support fallback on failure", async () => {
    postDemoRequestMock.mockRejectedValue(new ApiError(500, "boom"));
    const user = userEvent.setup();
    renderForm();

    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: /get started/i }));

    expect(
      await screen.findByText(
        /email us directly at support42@fightpaperwork\.com/i,
      ),
    ).toBeInTheDocument();
    // The form stays up for a retry, values intact.
    expect(screen.getByLabelText(/work email/i)).toHaveValue(
      "pro-lead@example.com",
    );
    expect(
      screen.getByRole("button", { name: /get started/i }),
    ).toBeInTheDocument();
  });
});
