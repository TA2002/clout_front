import { Layout } from "../components/Layout";
import { CloutnameCheckForm } from "../components/CloutnameCheckForm";

export const CloutnameCheck = () => {
  return (
    <Layout type="cloutname_check">
      {/* <p>fsdfhjsdfhsd</p> */}
      <CloutnameCheckForm onSuccess={() => console.log("success")} />
    </Layout>
  );
};
