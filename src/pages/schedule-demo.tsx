import { ReactElement, useEffect } from "react";

import DemoRequestForm from "@/components/DemoRequestForm";
import Layout from "@/components/Layout";
import Metadata from "@/components/Metadata";
import { trackEvent } from "@/lib/analytics";
import { NextPageWithLayout } from "@/pages/_app";

const metadata = {
  title: "Get Started - Fight Paperwork",
  description:
    "Tell us about your team and we'll be in touch to get you set up with Fight Paperwork's AI appeal and prior authorization platform.",
};

const ScheduleDemoPage: NextPageWithLayout = () => {
  useEffect(() => {
    trackEvent("page_view_schedule_demo");
  }, []);

  return <DemoRequestForm />;
};

ScheduleDemoPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Metadata title={metadata.title} description={metadata.description}>
        {page}
      </Metadata>
    </Layout>
  );
};

export default ScheduleDemoPage;
