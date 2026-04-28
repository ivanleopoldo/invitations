import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import InviteLink from "@/pages/invitation";
import RSVP from "./pages/rsvp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<App />} />
        <Route path="/invite" element={<InviteLink />} />
        <Route path="/rsvp" element={<RSVP />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
