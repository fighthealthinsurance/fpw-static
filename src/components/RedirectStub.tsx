import { Anchor, Container, Stack, Text, Title } from "@mantine/core";
import Head from "next/head";
import { useEffect } from "react";

/**
 * Build the redirect URL: carry the current query string over, and when
 * `defaultSource` is given and the query has no source param, inject
 * `source=<defaultSource>` so untagged traffic stays attributable.
 */
export function buildRedirectUrl(
  target: string,
  search: string,
  defaultSource?: string,
): string {
  const params = new URLSearchParams(search);
  if (defaultSource && !params.get("source")) {
    params.set("source", defaultSource);
  }
  const queryString = params.toString();
  return queryString ? `${target}?${queryString}` : target;
}

interface RedirectStubProps {
  /** Absolute URL or site-relative path; the query string is carried over. */
  target: string;
  /** Human-readable destination for the fallback link. */
  label: string;
  /** Inject source=<value> when the query has no source param. */
  defaultSource?: string;
  /** Overridable for tests; defaults to window.location.replace. */
  onRedirect?: (url: string) => void;
}

/**
 * Client-side redirect page for legacy URLs. A static export cannot issue
 * real HTTP redirects on GitHub Pages, so these stub pages replace the
 * location on load (preserving the query string, e.g. ?source= attribution).
 * The nginx image additionally serves real redirects for the same paths.
 */
export default function RedirectStub({
  target,
  label,
  defaultSource,
  onRedirect,
}: RedirectStubProps) {
  useEffect(() => {
    const url = buildRedirectUrl(target, window.location.search, defaultSource);
    if (onRedirect) {
      onRedirect(url);
    } else {
      window.location.replace(url);
    }
  }, [target, defaultSource, onRedirect]);

  return (
    <>
      <Head>
        <noscript>
          <meta httpEquiv="refresh" content={`0;url=${target}`} />
        </noscript>
      </Head>
      <Container size="xs" py={80}>
        <Stack align="center" gap="sm">
          <Title order={2} size="h3" c="#5E5E5E">
            Redirecting…
          </Title>
          <Text c="#626262" ta="center">
            This page has moved. If you are not redirected automatically,
            continue to <Anchor href={target}>{label}</Anchor>.
          </Text>
        </Stack>
      </Container>
    </>
  );
}
