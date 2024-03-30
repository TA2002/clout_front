import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { LoginForm } from "../components/LoginForm";
import { AuthContext } from "@/lib/AuthContext";
import { useContext } from "react";

export const Login = () => {
  const { mediakitInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  if (mediakitInfo?.cloutname) {
    navigate(`/${mediakitInfo.cloutname}`);
  }

  return (
    <Layout type="login">
      <LoginForm
        onSuccess={() => {
          // console.log("second login");
        }}
      />
    </Layout>
  );
};
