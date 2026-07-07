import { useEffect } from "react";

import TermsOfService from "@/components/legal/TermsOfService";
import Metadata from "@/components/Metadata";
import { trackEvent } from "@/lib/analytics";
import { NextPageWithLayout } from "@/pages/_app";

const TermsOfServicePage: NextPageWithLayout = () => {
  useEffect(() => {
    trackEvent("page_view_terms-of-service");
  }, []);

  return (
    <Metadata title="Terms of Service">
      <TermsOfService />
    </Metadata>
  );
};

export default TermsOfServicePage;
