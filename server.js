/**
 * =============================================================================
 * SERVIDOR PRINCIPAL - PREVIREO
 * =============================================================================
 * 
 * Servidor Express que sirve tanto la API de contacto como la aplicación
 * frontend en producción.
 * 
 * =============================================================================
 * USO
 * =============================================================================
 * 
 * Desarrollo: node server.js
 * Produccion: node server.js --production
 * 
 * =============================================================================
 */

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import contactoRoutes from './server/routes/contacto.js'

// Crear aplicación Express
const app = express()
const PORT = process.env.PORT || 3000

// Middleware básico
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// Logs de solicitudes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})

// =============================================================================
// RUTAS DE API
// =============================================================================

app.use('/api/contacto', contactoRoutes)

// Endpoint de estado del servidor
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    name: 'Previseo API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  })
})

// =============================================================================
// SERVIR ARCHIVOS ESTÁTICOS (PRODUCCIÓN)
// =============================================================================

// Determinar si estamos en producción
const isProduction = process.argv.includes('--production') || process.env.NODE_ENV === 'production'

if (isProduction) {
  // En producción, servir archivos estáticos del build
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const staticPath = path.join(__dirname, 'dist')
  
  app.use(express.static(staticPath))
  
  // SPA fallback: servir index.html para rutas no encontradas
  app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'))
  })
  
  console.log('📦 Modo PRODUCCIÓN: Sirviendo archivos estáticos desde /dist')
} else {
  // En desarrollo, redirigir al frontend de Vite
  console.log('🔧 Modo DESARROLLO: Solo sirve API en puerto', PORT)
  console.log('   Ejecuta "npm run dev" en otra terminal para el frontend')
  
  // Endpoint de información con enlace al frontend
  app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Previseo API Server</title>
        <style>
          body { font-family: system-ui, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; line-height: 1.6; }
          h1 { color: #1a73e8; }
          .info { background: #f5f5f5; padding: 20px; border-radius: 8px; }
          a { color: #1a73e8; }
        </style>
      </head>
      <body>
        <h1>🚀 Previseo API Server</h1>
        <div class="info">
          <p><strong>Estado:</strong> 🟢 Ejecutándose</p>
          <p><strong>Modo:</strong> Desarrollo (API Only)</p>
          <p><strong>Puerto:</strong> ${PORT}</p>
        </div>
        <h2>Endpoints disponibles:</h2>
        <ul>
          <li><a href="/api/contacto/health">GET /api/contacto/health</a> - Estado de la API</li>
          <li><a href="/api/status">GET /api/status</a> - Estado general</li>
          <li>POST /api/contacto/send - Enviar formulario de contacto</li>
        </ul>
        <h2>Para usar con el frontend:</h2>
        <p>Ejecuta <code>npm run dev</code> en otra terminal para iniciar el frontend de Vite.</p>
        <p>El frontend se ejecutará en http://localhost:5173 y enviará las solicitudes al API en este servidor.</p>
      </body>
      </html>
    `)
  })
}

// =============================================================================
// INICIAR SERVIDOR
// =============================================================================

app.listen(PORT, () => {
  console.log('='.repeat(50))
  console.log('🚀 SERVIDOR PREVIREO INICIADO')
  console.log('='.repeat(50))
  console.log(`📡 Puerto: ${PORT}`)
  console.log(`🌐 URL: http://localhost:${PORT}`)
  console.log(`📋 Modo: ${isProduction ? 'PRODUCCIÓN' : 'DESARROLLO (API only)'}`)
  console.log('='.repeat(50))
  console.log('')
  console.log('📌 Endpoints disponibles:')
  console.log(`   POST /api/contacto/send - Enviar formulario de contacto`)
  console.log(`   GET  /api/contacto/health - Verificar estado de la API`)
  console.log(`   GET  /api/contacto/test-connection - Probar conexión SMTP`)
  console.log(`   GET  /api/status - Estado general del servidor`)
  console.log('')
})

// Manejo de errores no capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Error no manejado:', reason)
})

process.on('uncaughtException', (error) => {
  console.error('❌ Excepción no capturada:', error)
  process.exit(1)
})
