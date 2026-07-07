import Head from "next/head";
import { AppShell } from "@mantine/core";
import { ReactNode } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <AppShell
        style={{ flexDirection: "column" }}
        display="flex"
        mih="100vh"
        padding="md"
        header={{ height: 48 }}
      >
        <Header />

        <AppShell.Main
          style={{ position: "relative", flexGrow: 1 }}
          mih="auto"
          p={0}
        >
          {children}
        </AppShell.Main>

        <Footer />
      </AppShell>
    </>
  );
};

export default Layout;
