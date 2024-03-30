import { Route, Routes } from "react-router-dom";

import { Main } from "./Main";
import { MediakitPage } from "@/features/mediakit/routes/Mediakit";
import { Privacy } from "./Privacy";
import { Terms } from "./Terms";
import { DataDeletion } from "./DataDeletion";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      {/* <Route path="/landing" element={<Landing />} /> */}
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/datadeletion" element={<DataDeletion />} />
      <Route path="/:cloutname" element={<MediakitPage />} />
    </Routes>
  );
};
