export const URL =
  import.meta.env.ENVIRONMENT === "development"
    ? "http://localhost:5173"
    : "https://hanleo.netlify.app";
