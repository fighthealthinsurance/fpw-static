import RedirectStub from "@/components/RedirectStub";
import { ROUTES } from "@/lib/routes";

// Self-serve professional signup is closed (connector agreement); interested
// professionals go through the demo-request flow instead.
export default function ProfessionalSignupRedirect() {
  return <RedirectStub target={ROUTES.scheduleDemo} label="Get Started" />;
}
