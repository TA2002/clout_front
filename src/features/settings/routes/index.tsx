import { Route, Routes } from "react-router-dom";

import { Settings } from "./Settings";

export const SettingsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Settings />} />
      <Route path="/accounts" element={<Settings />} />
      <Route path="/images" element={<Settings />} />
      <Route path="/prices" element={<Settings />} />
    </Routes>
  );
};
