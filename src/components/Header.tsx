import { Box, Button, Container, Group, Text } from "@mantine/core";
import Link from "next/link";

import { CONSUMER_SITE_URL, ROUTES } from "@/lib/routes";

export function Header() {
  return (
    <Box w="100%">
      <Container size="lg" py="md">
        <Group
          justify="space-between"
          align="center"
          h="var(--app-shell-header-height)"
        >
          <Link href={ROUTES.home} style={{ textDecoration: "none" }}>
            <Text size="xl" fw={700} style={{ color: "#FF9A52" }}>
              FIGHT PAPERWORK
            </Text>
          </Link>

          <Group gap="sm">
            <Button
              component="a"
              href={CONSUMER_SITE_URL}
              variant="outline"
              color="orange"
              size="sm"
              visibleFrom="xs"
            >
              For Patients
            </Button>
            <Button
              component={Link}
              href={ROUTES.scheduleDemo}
              variant="filled"
              color="orange"
              size="sm"
            >
              Get Started
            </Button>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}

export default Header;
