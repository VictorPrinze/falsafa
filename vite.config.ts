// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker'; // Add this for optional type checking

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Add checker to optionally run TypeScript checks separately
    checker({
      typescript: true, // Enable type checking in a separate thread
    }),
  ],
  esbuild: {
    // Suppress specific TypeScript error logs
    logOverride: {
      'ts(6133)': 'silent', // Suppress 'variable declared but never read' error
    },
  },
  build: {
    target: 'esnext', // Skip strict type checking
  },
  resolve: {
    alias: {
      // Example: '@' resolves to your src directory
      '@': '/src',
    },
  },
});
