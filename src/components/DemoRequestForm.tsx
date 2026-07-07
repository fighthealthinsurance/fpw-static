import {
  Box,
  Button,
  Container,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCircleCheck } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { ApiError, postDemoRequest } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";
import { ROUTES, SUPPORT_EMAIL } from "@/lib/routes";

export default function DemoRequestForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      source: "",
      phone: "",
    },
    validate: {
      name: (value) => (value.trim().length === 0 ? "Name is required" : null),
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Please enter a valid email",
      company: (value) =>
        value.trim().length === 0 ? "Company name is required" : null,
      role: (value) => (value.trim().length === 0 ? "Role is required" : null),
    },
  });

  // Source can come from the form or a ?source= query param (marketing
  // attribution on inbound links), defaulting to "direct".
  const resolvedSource = () =>
    form.values.source ||
    (Array.isArray(router.query.source)
      ? router.query.source[0]
      : (router.query.source as string)) ||
    "direct";

  const showFallback = () => {
    notifications.show({
      title: "Something went wrong",
      message: `We couldn't submit your request just now. Please try again, or email us directly at ${SUPPORT_EMAIL}.`,
      color: "yellow",
    });
  };

  const handleSubmit = async (values: typeof form.values) => {
    setIsSubmitting(true);

    try {
      trackEvent("initial_demo_form_submitted", {
        source: resolvedSource(),
      });

      // The backend notifies our team and the connector partner over email.
      await postDemoRequest({
        email: values.email,
        name: values.name,
        company: values.company,
        role: values.role,
        source: resolvedSource(),
        phone: values.phone,
      });

      trackEvent("demo_request_submitted_success", {
        source: resolvedSource(),
      });
      setSubmitted(true);
      notifications.show({
        title: "Thank you!",
        message: "We've received your details and will be in touch shortly.",
        color: "green",
      });
    } catch (error) {
      // The backend notification (the whole point of this form) did not go
      // through, so surface a real error and let them retry or email us.
      if (error instanceof ApiError) {
        console.warn("Request submission issue:", error);
        trackEvent("demo_request_submitted_warning", {
          error: String(error.status),
        });
      } else {
        console.error("Error submitting form:", error);
        trackEvent("demo_request_submitted_error", {
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
      showFallback();
    } finally {
      setIsSubmitting(false);
    }
  };

  const firstName = form.values.name.trim().split(" ")[0];

  return (
    <Box py={60}>
      <Container size="xs">
        {submitted ? (
          <Paper p="xl" radius="md" withBorder shadow="sm">
            <Stack gap="md" align="center">
              <ThemeIcon size={64} radius="xl" color="green" variant="light">
                <IconCircleCheck size={40} />
              </ThemeIcon>
              <Title order={2} size="h3" fw={700} c="#5E5E5E" ta="center">
                Thank you{firstName ? `, ${firstName}` : ""}!
              </Title>
              <Text c="#626262" ta="center">
                We&apos;ve received your information and our team will reach out
                shortly to get you connected and answer any questions —
                including setting up a demo if you&apos;d like one.
              </Text>
              <Link href={ROUTES.home} style={{ textDecoration: "none" }}>
                <Button variant="light" color="orange" mt="sm">
                  Back to Home
                </Button>
              </Link>
            </Stack>
          </Paper>
        ) : (
          <>
            <Stack gap={32} align="center" mb={40}>
              <Title order={2} size="h2" fw={700} c="#5E5E5E" ta="center">
                Get Started
              </Title>
              <Text size="lg" c="#626262" ta="center">
                Share a few details and our team will reach out to get you set
                up with Fight Paperwork — including scheduling a demo if
                you&apos;d like one.
              </Text>
            </Stack>

            <Paper p="xl" radius="md" withBorder shadow="sm">
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="md">
                  <TextInput
                    label="Full Name"
                    placeholder="Enter your full name"
                    required
                    {...form.getInputProps("name")}
                  />

                  <TextInput
                    label="Work Email"
                    placeholder="your.name@company.com"
                    required
                    {...form.getInputProps("email")}
                  />

                  <TextInput
                    label="Company"
                    placeholder="Enter your company name"
                    required
                    {...form.getInputProps("company")}
                  />

                  <TextInput
                    label="Phone Number"
                    placeholder="Enter your phone number (optional)"
                    {...form.getInputProps("phone")}
                  />

                  <TextInput
                    label="Job Title"
                    placeholder="Enter your job title"
                    required
                    {...form.getInputProps("role")}
                  />

                  <Select
                    label="How did you hear about us?"
                    placeholder="Select an option"
                    data={[
                      { value: "google", label: "Google Search" },
                      { value: "social", label: "Social Media" },
                      { value: "colleague", label: "Colleague Referral" },
                      { value: "news", label: "News Article" },
                      { value: "other", label: "Other" },
                    ]}
                    {...form.getInputProps("source")}
                  />

                  <Button
                    type="submit"
                    size="md"
                    fullWidth
                    color="orange"
                    loading={isSubmitting}
                    mt="md"
                  >
                    Get Started
                  </Button>
                </Stack>
              </form>
            </Paper>

            <Text size="xs" c="dimmed" ta="center" mt="lg">
              By submitting this form, you agree to our{" "}
              <Link
                href={ROUTES.privacyPolicy}
                style={{ color: "inherit", textDecoration: "underline" }}
              >
                Privacy Policy
              </Link>
              .
            </Text>
          </>
        )}
      </Container>
    </Box>
  );
}
