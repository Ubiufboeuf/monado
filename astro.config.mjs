/* eslint-disable no-undef */

import { defineConfig } from 'astro/config'

import preact from '@astrojs/preact'
import tailwindcss from '@tailwindcss/vite'
import node from '@astrojs/node'
import cloudflare from '@astrojs/cloudflare'

import { readFileSync } from 'node:fs'
import { HMR_HOST, HMR_PORT } from './src/lib/constants'

const isCloudflare = checkIsCloudflare()
console.log({ isCloudflare })

let cert, key
if (!isCloudflare) {
  cert = readFileSync('.cert/server.crt')
  key = readFileSync('.cert/server.key')
}

function checkIsCloudflare () {
  let CF = false
  try {
    const envCF = import.meta.env.CF
    console.log('import meta', { envCF })
    CF = envCF === 'true'
  } catch {/* empty */}

  try {
    const envCF = process.env.CF
    console.log('process', { envCF })
    CF = envCF === 'true'
  } catch {/* empty */}

  return CF
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
    ? cloudflareConfig
    : devConfig
)
