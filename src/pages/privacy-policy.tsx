import { useEffect } from "react";

import PrivacyPolicy from "@/components/legal/PrivacyPolicy";
import Metadata from "@/components/Metadata";
import { trackEvent } from "@/lib/analytics";
import { NextPageWithLayout } from "@/pages/_app";

const PrivacyPolicyPage: NextPageWithLayout = () => {
  useEffect(() => {
    trackEvent("page_view_privacy-policy");
  }, []);

  return (
    <Metadata title="Privacy Policy">
      <PrivacyPolicy />
    </Metadata>
  );
};

export default PrivacyPolicyPage;
