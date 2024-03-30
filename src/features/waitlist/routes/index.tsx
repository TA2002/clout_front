import { Route, Routes } from "react-router-dom";

import { Waitlist } from "./Waitlist";

export const WaitlistRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Waitlist />} />
    </Routes>
  );
};
