import {
  Anchor,
  Box,
  Button,
  Container,
  Group,
  Image,
  Paper as MantinePaper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";

import TextBlurb from "@/components/TextBlurb";
import { CloudDecor1 } from "@/icons/CloudDecor1";
import { CloudDecor2 } from "@/icons/CloudDecor2";
import { CloudDecor3 } from "@/icons/CloudDecor3";
import { LineDecor1 } from "@/icons/LineDecor1";
import { LineDecor2 } from "@/icons/LineDecor2";
import { LineDecor3 } from "@/icons/LineDecor3";
import { Paper } from "@/icons/Paper";
import { Wolf } from "@/icons/Wolf";
import { CONSUMER_SITE_URL, ROUTES } from "@/lib/routes";

// Featured publication logos and links
const featuredPublications = [
  {
    name: "Fast Company",
    logoPath: "/assets/images/extlogos/fastcompanylogo.png",
    link: "https://www.fastcompany.com/91209422/if-your-health-insurance-denies-a-claim-this-tool-uses-ai-to-help-you-fight-back",
  },
  {
    name: "CBS News",
    logoPath: "/assets/images/extlogos/cbslogo.png",
    link: "https://www.cbsnews.com/news/health-insurance-costs-inflation-denials-luigi-mangione-united-healthcare",
  },
  {
    name: "Forbes",
    logoPath: "/assets/images/extlogos/forbeslogo.png",
    link: "https://www.forbes.com/sites/amyfeldman/2024/12/11/these-entrepreneurs-are-using-ai-to-fight-health-insurance-claims-denials",
  },
  {
    name: "WBUR",
    logoPath: "/assets/images/extlogos/wbrlogo.png",
    link: "https://www.wbur.org/hereandnow/2024/11/11/ai-insurance-appeals",
  },
  {
    name: "Arm & Leg Show",
    logoPath: "/assets/images/extlogos/armleglogo.png",
    link: "https://armandalegshow.com/episode/fight-health-insurance-with-ai",
  },
  {
    name: "NewsNation",
    logoPath: "/assets/images/extlogos/newsnationlogo.png",
    link: "https://www.newsnationnow.com/video/fighting-health-insurance-companies-with-ai-newsnation-prime/10025608",
  },
  {
    name: "News Week",
    logoPath: "/assets/images/extlogos/newsweek.png",
    link: "https://www.newsweek.com/health-insurance-claims-ai-website-2012389",
  },
  {
    name: "SF Standard",
    logoPath: "/assets/images/extlogos/sflogo.png",
    link: "https://sfstandard.com/2024/08/23/holden-karau-fight-health-insurance-appeal-claims-denials",
  },
  {
    name: "Business Insider",
    logoPath: "/assets/images/extlogos/businessinsiderlogo.png",
    link: "https://www.businessinsider.com/free-health-insurance-claim-denial-appeal-project-startup-2024-12",
  },
  {
    name: "STAT News",
    logoPath: "/assets/images/extlogos/statlogo.png",
    link: "https://www.statnews.com/2024/12/12/artificial-intelligence-appealing-health-insurance-denials",
  },
  {
    name: "Fox 4 KC",
    logoPath: "/assets/images/extlogos/fox4kc.png",
    link: "https://fox4kc.com/business/press-releases/ein-presswire/790543760/totally-legit-co-rebrands-as-fight-health-insurance-inc-and-prepares-to-launch-ai-powered-fight-paperwork/",
  },
  {
    name: "KJZZ",
    logoPath: "/assets/images/extlogos/kjzzlogo.png",
    link: "https://www.kjzz.org/the-show/2024-10-03/how-one-software-developer-is-using-ai-to-help-people-fight-health-insurance-denials",
  },
  {
    name: "BGR",
    logoPath: "/assets/images/extlogos/bgr_logo.png",
    link: "https://bgr.com/tech/this-free-site-uses-ai-to-help-you-fight-health-insurance-claim-denials/",
  },
  {
    name: "Consumer Affairs",
    logoPath: "/assets/images/extlogos/consumer_afairs.jpg",
    link: "https://www.consumeraffairs.com/news/behind-the-anger-a-look-at-todays-healthcare-system-120924.html",
  },
];

export default function HeroSection() {
  return (
    <Container size="100vw" p={0} h="auto">
      <Box pos="relative" py={{ base: 40, md: 40 }}>
        {/* Decorative elements */}
        <Box
          pos="absolute"
          top="20%"
          left="10%"
          display={{ base: "none", md: "block" }}
        >
          <LineDecor1 />
        </Box>
        <Box
          pos="absolute"
          top="8%"
          left="20%"
          display={{ base: "none", md: "block" }}
        >
          <CloudDecor2 />
        </Box>
        <Box
          pos="absolute"
          top="2%"
          left="50%"
          style={{ transform: "translateX(-50%)" }}
          display={{ base: "none", md: "block" }}
        >
          <CloudDecor1 />
        </Box>
        <Box
          pos="absolute"
          top="20%"
          right="10%"
          display={{ base: "none", md: "block" }}
        >
          <CloudDecor3 />
        </Box>
        <Box
          pos="absolute"
          top="8%"
          right="20%"
          display={{ base: "none", md: "block" }}
        >
          <LineDecor2 />
        </Box>
        <Box
          pos="absolute"
          bottom="2%"
          right="50%"
          style={{ transform: "translateX(50%)" }}
          display={{ base: "none", md: "block" }}
        >
          <LineDecor3 />
        </Box>
        <Box
          pos="absolute"
          left={0}
          bottom={0}
          display={{ base: "none", md: "block" }}
        >
          <Wolf />
        </Box>
        <Box
          pos="absolute"
          right={68}
          bottom={0}
          display={{ base: "none", md: "block" }}
        >
          <Paper />
        </Box>

        {/* Main content */}
        <Stack
          align="center"
          gap="xl"
          pos="relative"
          style={{ zIndex: 10 }}
          px={{ base: 16, md: 0 }}
        >
          <br />
          <TextBlurb
            title="Bite back at denials and prior auth paper chase — get care covered."
            text="Ensure the insured actually get insured."
          />

          {/* Action buttons */}
          <Stack align="center" gap={0}>
            <Group gap={22} mt={20} wrap="wrap" justify="center">
              <Button
                component={Link}
                href={ROUTES.scheduleDemo}
                size="md"
                variant="filled"
                color="orange"
                radius={8}
                styles={{
                  root: {
                    padding: "12px 24px",
                    height: "auto",
                  },
                }}
              >
                I&apos;m a Professional
              </Button>

              <Button
                component="a"
                href={CONSUMER_SITE_URL}
                size="md"
                variant="filled"
                color="orange"
                radius={8}
                styles={{
                  root: {
                    padding: "12px 24px",
                    height: "auto",
                  },
                }}
              >
                I&apos;m a Patient
              </Button>
            </Group>
            <Text
              size="sm"
              fw={400}
              c="#6C6C6C"
              mt={12}
              ta="center"
              style={{ lineHeight: "23px" }}
            >
              Patients: appeal for free on Fight Health Insurance
            </Text>
          </Stack>

          {/* Featured In Section */}
          <MantinePaper
            mt={60}
            mb={20}
            p={30}
            radius="md"
            shadow="sm"
            withBorder
            style={{
              width: "100%",
              maxWidth: 1200,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Title order={3} ta="center" fw={600} mb={30} c="#5E5E5E">
              As Featured In
            </Title>

            <Box
              style={{
                width: "100%",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Box
                className="scrolling-logos"
                style={{
                  display: "flex",
                  gap: "50px",
                  width: "max-content",
                }}
              >
                {[...featuredPublications, ...featuredPublications].map(
                  (publication, index) => (
                    <Anchor
                      key={index}
                      href={publication.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-block",
                        filter: "grayscale(100%)",
                        transition: "filter 0.3s ease",
                        minWidth: "180px",
                        textAlign: "center",
                        textDecoration: "none",
                        flex: "0 0 auto",
                      }}
                      className="logo-item"
                    >
                      <Box>
                        <Image
                          src={publication.logoPath}
                          alt={publication.name}
                          height={80}
                          width={160}
                          fit="contain"
                          mx="auto"
                        />
                        <Text
                          size="xs"
                          c="dimmed"
                          mt={5}
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "160px",
                            margin: "0 auto",
                          }}
                        >
                          {publication.name}
                        </Text>
                      </Box>
                    </Anchor>
                  ),
                )}
              </Box>
            </Box>
          </MantinePaper>
        </Stack>
      </Box>
    </Container>
  );
}
