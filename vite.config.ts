/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    // simula o navegador (DOM) no terminal
    environment: 'jsdom',
    // deixa o expect() global e roda o setup antes dos testes
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
