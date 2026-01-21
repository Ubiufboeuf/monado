// @ts-check
import { defineConfig } from 'astro/config'

import preact from '@astrojs/preact'
import tailwindcss from '@tailwindcss/vite'
import node from '@astrojs/node'

import { readFileSync } from 'node:fs'
import { HMR_HOST, HMR_PORT } from '@/lib/constants'

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
        host: HMR_HOST,
        clientPort: HMR_PORT,
        protocol: 'wss'
      }
    }
  },

  server: {
    allowedHosts: [
      'monado.dev.local'
    ]
  },

  output: 'server',
  adapter: node({
    mode: 'standalone'
  })
})
