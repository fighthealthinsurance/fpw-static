import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";

import { postMailingListSubscribe } from "@/lib/api";

export default function SubscribeSection() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await postMailingListSubscribe({ email, name: fullName });
      setSuccess(true);
    } catch {
      setError("Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box py={isMobile ? 40 : 80}>
      <Container size="sm">
        <Stack align="center" gap={isMobile ? 24 : 40}>
          <Title
            order={2}
            size={isMobile ? 32 : 46}
            lh={isMobile ? "40px" : "53px"}
            fw={500}
            ff="Poppins"
            ta="center"
          >
            Subscribe for Updates!
          </Title>

          <Card
            padding={isMobile ? 24 : 40}
            radius={16}
            shadow="0px 3px 32px -12px rgba(0, 0, 0, 0.25)"
            bg="white"
            maw={700}
            w="100%"
          >
            <Stack w="100%" gap={isMobile ? 20 : 26} align="center">
              {success ? (
                <Stack align="center" gap={16}>
                  <IconCheck size={48} color="#4BB543" />
                  <Title order={4} size={isMobile ? 22 : 28} c="#4BB543">
                    Thank you for subscribing!
                  </Title>
                </Stack>
              ) : (
                <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                  <Stack w="100%" gap={isMobile ? 20 : 26} align="center">
                    <TextInput
                      w="100%"
                      label="Full Name"
                      size="md"
                      radius="md"
                      value={fullName}
                      onChange={(e) => setFullName(e.currentTarget.value)}
                      required
                      styles={{
                        label: {
                          marginBottom: 8,
                          fontSize: isMobile ? "16px" : "19px",
                          fontWeight: 400,
                          color: "#606060",
                          fontFamily: "Poppins",
                        },
                        input: {
                          height: "48px",
                          fontSize: 16,
                        },
                      }}
                    />

                    <TextInput
                      w="100%"
                      label="Email Address"
                      size="md"
                      radius="md"
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                      required
                      type="email"
                      styles={{
                        label: {
                          marginBottom: 8,
                          fontSize: isMobile ? "16px" : "19px",
                          fontWeight: 400,
                          color: "#606060",
                          fontFamily: "Poppins",
                        },
                        input: {
                          height: "48px",
                          fontSize: 16,
                        },
                      }}
                    />

                    {error && (
                      <div style={{ color: "#A61865", fontSize: 16 }}>
                        {error}
                      </div>
                    )}

                    <Button
                      size="md"
                      radius="md"
                      h={48}
                      w={{ base: "100%", sm: "auto" }}
                      px={isMobile ? 16 : 40}
                      bg="#FF9A52"
                      type="submit"
                      loading={loading}
                      styles={{
                        root: {
                          minWidth: 200,
                          maxWidth: 200,
                          fontSize: 18,
                          fontWeight: 500,
                          fontFamily: "Poppins",
                        },
                      }}
                    >
                      Subscribe
                    </Button>
                  </Stack>
                </form>
              )}
            </Stack>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}
