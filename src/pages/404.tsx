import {
  Anchor,
  Button,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";
import { CONSUMER_SITE_URL, ROUTES, SUPPORT_EMAIL } from "@/lib/routes";

// Catch-all for every URL from the retired pro app (dashboards, pricing,
// blog, appeal flows, ...). Route patients to Fight Health Insurance and
// professionals to the interest form.
export default function NotFoundPage() {
  useEffect(() => {
    trackEvent("page_view_404", {
      path: window.location.pathname,
    });
  }, []);

  return (
    <Container size="sm" py={80}>
      <Stack align="center" gap="lg">
        <Title order={1} size="h2" fw={700} c="#5E5E5E" ta="center">
          This page has moved
        </Title>
        <Text c="#626262" ta="center">
          Fight Paperwork now works with partner platforms, and most of the old
          site has been retired. Here&apos;s where to go instead:
        </Text>

        <Group gap="md" justify="center" wrap="wrap">
          <Button
            component="a"
            href={CONSUMER_SITE_URL}
            size="md"
            variant="filled"
            color="orange"
            radius={8}
          >
            I&apos;m a Patient — Fight Health Insurance
          </Button>
          <Button
            component={Link}
            href={ROUTES.scheduleDemo}
            size="md"
            variant="outline"
            color="orange"
            radius={8}
          >
            I&apos;m a Professional — Get Started
          </Button>
        </Group>

        <Text size="sm" c="dimmed" ta="center">
          Looking for something else? Email us at{" "}
          <Anchor
            href={`mailto:${SUPPORT_EMAIL}`}
            c="inherit"
            underline="always"
          >
            {SUPPORT_EMAIL}
          </Anchor>
          .
        </Text>
      </Stack>
    </Container>
  );
}
