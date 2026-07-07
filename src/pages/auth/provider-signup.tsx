import RedirectStub from "@/components/RedirectStub";
import { ROUTES } from "@/lib/routes";

export default function ProviderSignupRedirect() {
  return <RedirectStub target={ROUTES.scheduleDemo} label="Get Started" />;
}
