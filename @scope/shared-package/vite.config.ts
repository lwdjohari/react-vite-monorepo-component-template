import { defineConfig } from 'vite'
import { extname, relative, resolve } from 'path'
import { fileURLToPath } from 'node:url'
import { glob } from 'glob'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({ include: ['lib'] })
  ],

  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es']
    },
    rollupOptions: {
      treeshake: true,
      plugins: [
        peerDepsExternal(), // new line
      ],
      external: [
        "react",
        "react/jsx-runtime",
        "react-dom",
        "@emotion/react",
        '@emotion/styled',
        "@mui/icons-material",
        "@mui/joy"],
      input: Object.fromEntries(
        // https://rollupjs.org/configuration-options/#input
        glob.sync('lib/**/*.{ts,tsx}').map(file => [
          // 1. The name of the entry point
          // lib/nested/foo.js becomes nested/foo
          relative(
            'lib',
            file.slice(0, file.length - extname(file).length)
          ),
          // 2. The absolute path to the entry file
          // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
          fileURLToPath(new URL(file, import.meta.url))
        ])
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      }
    }
  },
  optimizeDeps: {
    exclude: [
      'react',
      "react/jsx-runtime",
      'react-dom',
      '@emotion/react',
      '@emotion/styled',
      '@mui/icons-material',
      '@mui/joy',
    ], // Exclude peer dependencies
  },
})