// @ts-check
import { defineConfig } from 'astro/config'

import preact from '@astrojs/preact'
import tailwindcss from '@tailwindcss/vite'
import cloudflare from '@astrojs/cloudflare'

import { readFileSync } from 'node:fs'

const cert = readFileSync('.cert/server.crt')
const key = readFileSync('.cert/server.key')

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],

  vite: {
    plugins: [tailwindcss()],
    server: {
      https: {
        cert,
        key
      },
      hmr: {
        host: 'monado.dev.local', // Usar el dominio proxyado
        clientPort: 443, // Usar el puerto de entrada de Apache
        protocol: 'wss' // Usar protocolo seguro
      }
    }
  },

  server: {
    allowedHosts: [
      'monado.dev.local'
    ]
  },

  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough'
  })
})
