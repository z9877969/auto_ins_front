import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

import dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    base: "/",
    // define: {
    //   __APP_ENV__: JSON.stringify(env.APP_ENV),
    // },
  };
});
