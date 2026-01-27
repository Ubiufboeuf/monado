/* eslint-disable no-undef */

import { defineConfig } from 'astro/config'

import preact from '@astrojs/preact'
import tailwindcss from '@tailwindcss/vite'
import node from '@astrojs/node'
import cloudflare from '@astrojs/cloudflare'

import { readFileSync } from 'node:fs'
import { HMR_HOST, HMR_PORT } from './src/lib/constants'

const cert = readFileSync('.cert/server.crt')
const key = readFileSync('.cert/server.key')

const isCloudflare = checkIsCloudflare()

function checkIsCloudflare () {
  try { return import.meta.env.CF === 'true'}
  catch {/* empty */}

  try { return process.env.CF === 'true'}
  catch {/* empty */}

  return false
}

const devConfig = {
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
  adapter: node({ mode: 'standalone' })
}

const cloudflareConfig = {
  integrations: [preact()],

  vite: {
    plugins: [tailwindcss()]
  },

  output: 'server',
  adapter: cloudflare({ imageService: 'passthrough' })
}

export default defineConfig(
  isCloudflare
    ? devConfig
    : cloudflareConfig
)
