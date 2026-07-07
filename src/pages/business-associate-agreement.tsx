import { useEffect } from "react";

import BusinessAssociateAgreement from "@/components/legal/BusinessAssociateAgreement";
import Metadata from "@/components/Metadata";
import { trackEvent } from "@/lib/analytics";
import { NextPageWithLayout } from "@/pages/_app";

const BusinessAssociateAgreementPage: NextPageWithLayout = () => {
  useEffect(() => {
    trackEvent("page_view_business-associate-agreement");
  }, []);

  return (
    <Metadata title="Business Associate Agreement">
      <BusinessAssociateAgreement />
    </Metadata>
  );
};

export default BusinessAssociateAgreementPage;
