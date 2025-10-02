import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
// Configured for Replit environment:
// - host 0.0.0.0 allows connections from Replit's proxy
// - port 5000 is the only non-firewalled port
// - allowedHosts with leading dot (e.g., '.replit.dev') allows all subdomains
export default defineConfig(() => ({
  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: false,
    allowedHosts: ['.replit.dev', '.repl.co', '.replit.app'],
    hmr: {
      overlay: false,
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: false,
    allowedHosts: ['.replit.dev', '.repl.co', '.replit.app'],
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
