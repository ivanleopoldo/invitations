export const URL =
  import.meta.env.VITE_ENVIRONMENT === "development"
    ? "http://localhost:5173"
    : "https://hanleo.vercel.app";
