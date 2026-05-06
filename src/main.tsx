import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { ClerkProvider } from "@clerk/react";
import { Toaster } from "@/components/ui/sonner";
import Loading from "@/components/general/loading.tsx";

// Lazy load components for code splitting
const App = lazy(() => import("./App.tsx"));
const InviteLink = lazy(() => import("@/pages/invitation"));
const RSVP = lazy(() => import("./pages/rsvp.tsx"));
const AdminPanel = lazy(() => import("./pages/admin.tsx"));
const Login = lazy(() => import("./pages/login.tsx"));
const ProtectedLayout = lazy(() => import("./layouts/protected-layout.tsx"));
const Congrats = lazy(() => import("./pages/congrats.tsx"));
const ItsOkay = lazy(() => import("./pages/itsokay.tsx"));

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
          <Route
            index
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <App />
              </Suspense>
            }
          />
          <Route
            path="/invite/:inviteid"
            element={
              <Suspense fallback={<Loading />}>
                <InviteLink />
              </Suspense>
            }
          />
          <Route
            path="/rsvp/:inviteid"
            element={
              <Suspense fallback={<Loading />}>
                <RSVP />
              </Suspense>
            }
          />
          <Route
            path="/congrats"
            element={
              <Suspense fallback={<Loading />}>
                <Congrats />
              </Suspense>
            }
          />
          <Route
            path="/itsokay"
            element={
              <Suspense fallback={<Loading />}>
                <ItsOkay />
              </Suspense>
            }
          />
          <Route
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedLayout />
              </Suspense>
            }
          >
            <Route
              path="/admin"
              element={
                <Suspense fallback={<Loading />}>
                  <AdminPanel />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/login/*"
            element={
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  );
}
