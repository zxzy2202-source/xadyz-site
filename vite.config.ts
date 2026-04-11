import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  // Build configuration optimized for Russian & CIS market browsers
  build: {
    // Target modern browsers (covers 95%+ of Russian market)
    // Yandex Browser, Chrome, Firefox all support ES2020
    target: 'es2020',

    // Raise warning threshold; most chunks will be well under 500 KB after splitting
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        /**
         * Function form gives us the full module path, so every node_modules
         * package gets routed into the right chunk instead of landing in the
         * default vendor bundle.
         *
         * Chunk strategy:
         *  react-vendor    – React core + router  (loaded on every page, cached longest)
         *  animation       – framer-motion  (~400 KB, lazy-page only)
         *  radix           – all @radix-ui/*  (~200 KB, shared across UI components)
         *  supabase        – @supabase/supabase-js  (~110 KB, only blog/admin pages)
         *  ui-utils        – lucide-react, sonner, clsx, tailwind-merge, react-helmet-async
         *  emotion         – @emotion/* (used by admin charts/MUI components)
         *  admin           – /src/admin/** source  (never loaded by public users)
         */
        manualChunks(id: string) {
          // ── Third-party vendors ──────────────────────────────────────────
          if (id.includes('node_modules')) {
            // React core + router — smallest, most-cached chunk
            if (
              id.includes('/react/') ||
              id.includes('/react-dom/') ||
              id.includes('/react-router/')
            ) {
              return 'react-vendor';
            }

            // Animation libraries (heaviest vendor bundle)
            if (id.includes('/framer-motion/')) {
              return 'animation';
            }

            // All Radix UI primitives in one chunk
            if (id.includes('@radix-ui/')) {
              return 'radix';
            }

            // Supabase JS client
            if (id.includes('@supabase/')) {
              return 'supabase';
            }

            // Lightweight UI utilities
            if (
              id.includes('/lucide-react/') ||
              id.includes('/sonner/') ||
              id.includes('/clsx/') ||
              id.includes('/tailwind-merge/') ||
              id.includes('/react-helmet-async/')
            ) {
              return 'ui-utils';
            }

            // Emotion (used by admin / MUI)
            if (id.includes('@emotion/')) {
              return 'emotion';
            }
          }

          // ── App source — admin panel ──────────────────────────────────────
          // Admin routes are lazy-loaded; grouping them avoids polluting
          // the public bundles with Supabase write logic and admin UI.
          if (id.includes('/src/admin/')) {
            return 'admin';
          }
        },
      },
    },

    // Enable minification
    minify: 'esbuild',

    // Source maps for debugging (optional, disable in production)
    sourcemap: false,
  },

  // Dev server — host: true 让局域网内其他设备也能访问
  server: {
    host: true,         // 监听 0.0.0.0，而不只是 localhost
    port: 5173,
    allowedHosts: true, // 允许所有 Host 头（代理/隧道访问时需要）
  },

  // Preview server configuration (for testing)
  preview: {
    port: 4173,
    host: true,
  },
})