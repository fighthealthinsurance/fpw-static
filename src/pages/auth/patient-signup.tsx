import RedirectStub from "@/components/RedirectStub";
import { CONSUMER_SITE_URL } from "@/lib/routes";

// Patient signup lived on the pro app for practice-invited patients; under
// the connector-only model patients use Fight Health Insurance directly.
export default function PatientSignupRedirect() {
  return (
    <RedirectStub target={CONSUMER_SITE_URL} label="Fight Health Insurance" />
  );
}
