import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import InviteLink from "@/pages/invitation";
import RSVP from "./pages/rsvp.tsx";
import { ClerkProvider } from "@clerk/react";
import AdminPanel from "./pages/admin.tsx";
import Login from "./pages/login.tsx";
import { Toaster } from "@/components/ui/sonner";
import ProtectedLayout from "./layouts/protected-layout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Nav />
    <Toaster />
  </StrictMode>,
);

function Nav() {
  return (
    <ClerkProvider
      afterSignOutUrl="/"
      signInUrl="/login"
      signInFallbackRedirectUrl="/"
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY!}
    >
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<App />} />
          <Route path="/invite" element={<InviteLink />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  );
}
