// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });
///////////////
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// export default defineConfig({
//   plugins: [react()],

//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },

//   build: {
//     chunkSizeWarningLimit: 1000,

//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           if (id.includes("node_modules")) {

//             if (id.includes("react"))
//               return "react";

//             if (id.includes("lodash"))
//               return "lodash";

//             if (id.includes("formik"))
//               return "formik";

//             if (id.includes("@floating-ui"))
//               return "floating-ui";

//             return "vendor";
//           }
//         },
//       },
//     },
//   },
// });
//////////
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

export default defineConfig({
  plugins: [
    react(),

    visualizer({
      filename: "dist/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react";
            if (id.includes("lodash")) return "lodash";
            if (id.includes("formik")) return "formik";
            if (id.includes("@floating-ui")) return "floating-ui";

            return "vendor";
          }
        },
      },
    },
  },
});