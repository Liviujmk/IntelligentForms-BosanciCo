import { AuthenticatedLayout } from "../layouts/authenticated-layout/Authenticated.layout";
import { Pricing } from "../layouts/authenticated-layout/components/pricing/pricing";

export const PricingPage = () => {
  return (
    <AuthenticatedLayout>
      <Pricing />
    </AuthenticatedLayout>
  );
};
