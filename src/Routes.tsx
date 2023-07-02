import React from "react";
import {
  BrowserRouter,
  Routes as ReactRoutes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  Home,
  AdvanceSearch,
  MasterMind,
  Recursive,
  DecimalPrecision,
} from "./Pages";

export default function Routes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<Home />} />
        <Route path="advancesearch" element={<AdvanceSearch />} />
        <Route path="mastermind" element={<MasterMind />} />
        <Route path="recursive" element={<Recursive />} />
        <Route path="decimalprecision" element={<DecimalPrecision />} />
        <Route path="*" element={<Navigate to={"/"} replace />} />
      </ReactRoutes>
    </BrowserRouter>
  );
}
