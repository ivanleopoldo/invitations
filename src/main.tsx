import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { ClerkProvider } from "@clerk/react";
import { Toaster } from "@/components/ui/sonner";
import InviteLink from "./pages/invitation.tsx";
import App from "./App.tsx";
import RSVP from "./pages/rsvp.tsx";
import Congrats from "./pages/congrats.tsx";
import ItsOkay from "./pages/itsokay.tsx";
import Loading from "./components/general/loading.tsx";

const Admin = lazy(() => import("./pages/admin.tsx"));
const LoginComponent = lazy(() => import("./pages/login.tsx"));

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
          <Route path="/invite/:inviteid" element={<InviteLink />} />
          <Route path="/rsvp/:inviteid" element={<RSVP />} />
          <Route path="/congrats" element={<Congrats />} />
          <Route path="/itsokay" element={<ItsOkay />} />
          <Route
            path="/admin"
            element={
              <Suspense fallback={<Loading />}>
                <Admin />
              </Suspense>
            }
          />
          <Route
            path="/login/*"
            element={
              <Suspense fallback={<Loading />}>
                <LoginComponent />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  );
}
