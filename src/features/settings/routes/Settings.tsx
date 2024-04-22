import Layout from "../components/Layout";
import Container from "@/components/ui/container";
import { DetailsTab } from "../components/tabs/DetailsTab";
import { AccountsTab } from "../components/tabs/AccountsTab";
import { ImagesTab } from "../components/tabs/ImagesTab";
import { PricesTab } from "../components/tabs/PricesTab";

export const Settings = () => {
  const pathname = window.location.pathname;
  return (
    <Container>
      <Layout>
        <div className="space-y-6">
          {/* <div>
            <h3 className="text-lg font-medium">Profile</h3>
            <p className="text-sm text-muted-foreground">
              This is how others will see you on the site.
            </p>
          </div> */}
          {/* <Separator /> */}
          {/* <ProfileForm /> */}
          {pathname == "/settings" || pathname == "/settings/" ? (
            <DetailsTab onSuccess={() => {}} />
          ) : pathname == "/settings/accounts" ? (
            <AccountsTab />
          ) : pathname == "/settings/prices" ? (
            <PricesTab onSuccess={() => {}} />
          ) : (
            <ImagesTab />
          )}
        </div>
      </Layout>
    </Container>
  );
};
