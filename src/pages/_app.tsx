import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@/styles/globals.css";

import { AppProps } from "next/app";
import { NextPage } from "next";
import { Poppins } from "next/font/google";
import { ReactElement, ReactNode } from "react";
import {
  colorsTuple,
  MantineProvider,
  MantineThemeOverride,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import Layout from "@/components/Layout";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const theme: MantineThemeOverride = {
  fontFamily: poppins.style.fontFamily,
  breakpoints: {
    xs: "36em",
    sm: "48em",
    md: "62em",
    lg: "75em",
    xl: "88em",
    xxl: "95em",
  },
  colors: {
    orange: colorsTuple("#FF9A52"),
  },
  primaryColor: "orange",
};

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <GoogleTagManager gtmId="GTM-5J62XDHT" />
      <MantineProvider theme={theme}>
        <Notifications />
        <main className={poppins.className}>
          {getLayout(<Component {...pageProps} />)}
        </main>
      </MantineProvider>
      <GoogleAnalytics gaId="G-71BKXCJ1SB" />
    </>
  );
}
