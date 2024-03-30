import { Layout } from "../components/Layout";
import { EmailVerifyOTP } from "../components/EmailVerifyOTP";
import { useNavigate } from "react-router-dom";

export const EmailVerify = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const emailParam = params.get("email");

  //   console.log(emailParam);

  return (
    <Layout type="email_otp">
      {/* <p>fsdfhjsdfhsd</p> */}
      <EmailVerifyOTP
        email={emailParam}
        onSuccess={() => {
          navigate("/auth/login");
        }}
      />
    </Layout>
  );
};
