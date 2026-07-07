import { Container, Stack, Text, Title } from "@mantine/core";
import { ReactElement } from "react";

import HeroSection from "@/components/HeroSection";
import Layout from "@/components/Layout";
import Metadata from "@/components/Metadata";
import SubscribeSection from "@/components/SubscribeSection";
import { NextPageWithLayout } from "@/pages/_app";

const metadata = {
  title: "Fight Paperwork - AI to Generate Your Health Insurance Appeal",
  description:
    "Fight Paperwork helps healthcare teams bite back at denials and prior auth paperwork. Patients can appeal for free on Fight Health Insurance.",
};

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <HeroSection />

      <Container size="sm" py={40}>
        <Stack align="center" gap="md">
          <Title order={2} size="h3" fw={600} c="#5E5E5E" ta="center">
            AI-powered appeals and prior auth responses for healthcare teams
          </Title>
          <Text c="#626262" ta="center">
            Fight Paperwork works with partner platforms to help professionals
            generate health insurance appeals and prior authorization responses
            in minutes. Tell us a little about your team and we&apos;ll get you
            connected. Patients and consumers can keep fighting denials for free
            on Fight Health Insurance.
          </Text>
        </Stack>
      </Container>

      <SubscribeSection />
    </>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Metadata title={metadata.title} description={metadata.description}>
        {page}
      </Metadata>
    </Layout>
  );
};

export default HomePage;
