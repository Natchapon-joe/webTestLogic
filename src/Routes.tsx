import React from "react";
import {
  BrowserRouter,
  Routes as ReactRoutes,
  Route,
  Navigate,
} from "react-router-dom";
import { AdvanceSearch, MasterMind, Recursive } from "./Pages";
export default function Routes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="advancesearch" element={<AdvanceSearch />} />
        <Route path="mastermind" element={<MasterMind />} />
        <Route path="recursive" element={<Recursive />} />
        <Route path="*" element={<Navigate to={"advancesearch"} replace />} />
      </ReactRoutes>
    </BrowserRouter>
  );
}
