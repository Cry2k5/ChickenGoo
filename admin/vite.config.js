import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react-map-gl"],
  },
  resolve: {
    alias: {
      // Nếu gặp lỗi module "fs" / "path" khi build, thêm alias trống
      fs: false,
      path: false,
    },
  },
});
