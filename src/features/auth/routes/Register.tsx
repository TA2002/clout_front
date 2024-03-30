import { Layout } from "../components/Layout";
import { RegisterForm } from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();

  return (
    <Layout type="register">
      {/* <LoginForm onSuccess={() => navigate("/app")} /> */}
      <RegisterForm
        onSuccess={(email: string) => navigate(`/auth/verify?email=${email}`)}
      />
    </Layout>
  );
};
