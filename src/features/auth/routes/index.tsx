import { Route, Routes } from "react-router-dom";

import { Login } from "./Login";
import { Register } from "./Register";
import { CloutnameCheck } from "./CloutnameCheck";
import { EmailVerify } from "./EmailVerify";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="creator" element={<CloutnameCheck />} />
      <Route path="verify" element={<EmailVerify />} />
    </Routes>
  );
};
