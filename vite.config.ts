import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { rionizkeycloakify } from "rionizkeycloakify/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        rionizkeycloakify({
            accountThemeImplementation: "none"
        })
    ]
});
