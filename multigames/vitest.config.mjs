import { defineConfig } from 'vitest/config'
import path from 'path'

const srcDir = path.resolve(import.meta.dirname, 'src')

// El código de la app usa `require('@/...')` (estilo webpack) mezclado con
// `import` dentro del mismo archivo. Vite/vite-node no reescribe ese `require`
// literal (queda como el `require` nativo de Node), así que el alias "@" de
// resolve.alias nunca llega a aplicarse ahí. Este plugin solo reescribe el
// texto antes de transformar, para que los tests puedan importar esos
// módulos sin tocar el código de producción.
function requireAliasShim() {
  return {
    name: 'require-alias-shim',
    transform(code, id) {
      if (!id.startsWith(srcDir) || !code.includes("require('@/")) return null
      return code.replaceAll("require('@/", `require('${srcDir}/`)
    }
  }
}

export default defineConfig({
  plugins: [requireAliasShim()],
  resolve: {
    alias: {
      '@': srcDir
    }
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.spec.js']
  }
})
