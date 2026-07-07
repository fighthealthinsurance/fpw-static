import {
  Anchor,
  Box,
  Container,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandReddit,
  IconBrandTiktok,
  IconBrandYoutube,
} from "@tabler/icons-react";
import Link from "next/link";

import { ROUTES, SUPPORT_EMAIL } from "@/lib/routes";

interface FooterLink {
  title: string;
  links: { label: string; href: string; target?: string }[];
}

const footerLinks: FooterLink[] = [
  {
    title: "Company",
    links: [
      { label: "Terms of Service", href: ROUTES.termsOfService },
      { label: "Privacy Policy", href: ROUTES.privacyPolicy },
      {
        label: "Business Associate Agreement",
        href: ROUTES.businessAssociateAgreement,
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/fight-health-insurance",
        target: "_blank",
      },
      { label: "Contact Us", href: `mailto:${SUPPORT_EMAIL}` },
    ],
  },
];

const socialLinks = [
  {
    icon: <IconBrandLinkedin size={35} color="white" />,
    url: "https://www.linkedin.com/company/fight-health-insurance",
  },
  {
    icon: <IconBrandTiktok size={35} color="white" />,
    url: "https://www.tiktok.com/@fighthealthinsurancett/",
  },
  {
    icon: <IconBrandYoutube size={35} color="white" />,
    url: "https://www.youtube.com/@fightpaperwork",
  },
  {
    icon: <IconBrandInstagram size={35} color="white" />,
    url: "https://www.instagram.com/fightpaperwork",
  },
  {
    icon: <IconBrandReddit size={35} color="white" />,
    url: "https://www.reddit.com/r/fightpaperwork/",
  },
  {
    icon: (
      <Image
        src="/assets/images/substack.png"
        alt="Substack"
        width={35}
        height={35}
        style={{ display: "block" }}
      />
    ),
    url: "https://fightpaperwork.substack.com/",
  },
];

export default function Footer() {
  return (
    <Box w="100%" bg="#191919" py={80}>
      <Container size="lg">
        <Group justify="space-between" align="flex-start">
          {/* Logo Section */}
          <Box>
            <Image src="/assets/images/logo.png" alt="Fight Paperwork" />
            <Text size="24px" fw={700} c="#FF9A52" mt={10}>
              FIGHT PAPERWORK
            </Text>
          </Box>

          {/* Links Sections */}
          {footerLinks.map((section, idx) => (
            <Stack key={idx} gap={24}>
              <Text size="16px" fw={500} c="white" ff="Poppins">
                {section.title}
              </Text>
              <Stack gap={16}>
                {section.links.map((link, linkIdx) => {
                  // Internal links use next/link for client-side navigation.
                  const LinkComponent = link.href.startsWith("/")
                    ? Link
                    : undefined;

                  return (
                    <Anchor
                      key={linkIdx}
                      component={LinkComponent}
                      href={link.href}
                      target={link.target}
                      size="16px"
                      c="#ADADAD"
                    >
                      {link.label}
                    </Anchor>
                  );
                })}
              </Stack>
            </Stack>
          ))}

          {/* Social Links */}
          <SimpleGrid cols={2} spacing="lg" pr="lg">
            {socialLinks.map((social, idx) => (
              <Box
                key={idx}
                component="a"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {social.icon}
              </Box>
            ))}
          </SimpleGrid>
        </Group>
      </Container>
    </Box>
  );
}
