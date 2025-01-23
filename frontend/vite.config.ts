import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    host: true,
    server: {
      port: Number(env.FRONTEND_PORT),
    },
    preview: {
      port: Number(env.FRONTEND_PORT),
    },
  };
});
