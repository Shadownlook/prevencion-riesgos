/**
 * =============================================================================
 * API DE CONTACTO - ENVÍO DE CORREOS ELECTRÓNICOS
 * =============================================================================
 * 
 * Este archivo contiene la API para procesar y enviar los mensajes del
 * formulario de contacto. Requiere un backend Node.js con Express y Nodemailer.
 * 
 * =============================================================================
 * REQUISITOS
 * =============================================================================
 * 
 * 1. Instalar dependencias:
 *    npm install express nodemailer cors helmet express-rate-limit
 * 
 * 2. Crear archivo .env con las variables de configuración
 * 
 * 3. Ejecutar el servidor: node server.js
 * 
 * =============================================================================
 */

import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import emailConfig from '../../src/config/email.config.js'

const router = express.Router()

// Middleware de seguridad
router.use(helmet())
router.use(cors())
router.use(express.json({ limit: '10kb' })) // Limitar tamaño del body

// Rate limiting: máximo 5 solicitudes por hora por IP
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 5,
  message: {
    success: false,
    error: 'Demasiadas solicitudes. Por favor intenta más tarde.'
  },
  standardHeaders: true,
  legacyHeaders: false
})

// Validar estructura del body
const validateContactBody = (req, res, next) => {
  const { nombre, email, mensaje } = req.body
  const errors = []

  if (!nombre || nombre.trim().length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres')
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('El correo electrónico no es válido')
  }

  if (!mensaje || mensaje.trim().length < 10) {
    errors.push('El mensaje debe tener al menos 10 caracteres')
  }

  if (mensaje && mensaje.length > 2000) {
    errors.push('El mensaje no puede exceder 2000 caracteres')
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    })
  }

  next()
}

// Sanitizar datos
const sanitizeData = (data) => {
  const sanitized = { ...data }

  // Campos que deben ser sanitizados
  const sanitizeFields = ['nombre', 'empresa', 'telefono', 'mensaje']
  
  sanitizeFields.forEach(field => {
    if (sanitized[field]) {
      // Eliminar HTML tags
      sanitized[field] = sanitized[field]
        .replace(/<[^>]*>/g, '')
      // Eliminar URLs
        .replace(/(https?:\/\/[^\s]+)|(www\.[^\s]+)/gi, '[ENLACE REMOVIDO]')
      // Normalizar espacios
        .replace(/\s+/g, ' ')
        .trim()
    }
  })

  return sanitized
}

// Endpoint para enviar correo
router.post('/send', limiter, validateContactBody, async (req, res) => {
  const startTime = Date.now()

  try {
    // En modo de pruebas, omitir validación de configuración
    if (!emailConfig.testMode) {
      const configValidation = emailConfig.validate()
      if (!configValidation.isValid) {
        console.error('Error de configuración:', configValidation.errors)
        return res.status(500).json({
          success: false,
          error: 'Error de configuración del servidor'
        })
      }
    }

    // Sanitizar datos
    const sanitizedData = sanitizeData(req.body)

    // Crear transporter
    let transporter
    let testModeInfo = null

    if (emailConfig.testMode) {
      // En modo de pruebas, usar Ethereal Email
      console.log('[EMAIL] Modo de pruebas activado - usando Ethereal Email')
      const testAccount = await nodemailer.createTestAccount()
      
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      })
      
      testModeInfo = {
        url: 'https://ethereal.email',
        user: testAccount.user,
        note: 'Este es un correo de PRUEBA. No se enviarán correos reales.'
      }
      
      console.log('[EMAIL] Cuenta de prueba Ethereal creada:', testAccount.user)
    } else {
      // Usar configuración normal
      transporter = nodemailer.createTransport({
        host: emailConfig.smtp.host,
        port: emailConfig.smtp.port,
        secure: emailConfig.smtp.secure,
        connectionTimeout: emailConfig.smtp.connectionTimeout,
        greetingTimeout: emailConfig.smtp.greetingTimeout,
        socketTimeout: emailConfig.smtp.socketTimeout,
        auth: {
          user: emailConfig.auth.user,
          pass: emailConfig.auth.pass,
          method: emailConfig.auth.method
        }
      })
    }

    // Configurar contenido del correo
    const replacements = {
      nombre: sanitizedData.nombre,
      email: sanitizedData.email,
      empresa: sanitizedData.empresa || 'No especificada',
      telefono: sanitizedData.telefono || 'No especificado',
      mensaje: sanitizedData.mensaje,
      fecha: new Date().toLocaleString('es-CL'),
      replyLink: `mailto:${sanitizedData.email}`
    }

    // Reemplazar variables en plantilla
    let htmlContent = emailConfig.content.htmlTemplate
    let textContent = emailConfig.content.textTemplate

    Object.keys(replacements).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g')
      htmlContent = htmlContent.replace(regex, replacements[key])
      textContent = textContent.replace(regex, replacements[key])
    })

    // Configurar correo
    const mailOptions = {
      from: `"${emailConfig.emails.from.name}" <${emailConfig.emails.from.address}>`,
      to: emailConfig.emails.to.join(', '),
      replyTo: sanitizedData.email,
      subject: emailConfig.content.subject.replace('{{nombre}}', sanitizedData.nombre),
      html: htmlContent,
      text: textContent,
      headers: emailConfig.content.headers,
      priority: emailConfig.content.priority
    }

    // Enviar correo
    const result = await transporter.sendMail(mailOptions)
    const duration = Date.now() - startTime

    // Loguear resultado
    if (emailConfig.logging.enabled) {
      console.log(`[EMAIL] Enviado a ${emailConfig.emails.to.join(', ')} en ${duration}ms`)
    }

    // Respuesta exitosa
    const response = {
      success: true,
      message: 'Mensaje enviado correctamente',
      duration: `${duration}ms`
    }

    // En modo de pruebas, incluir enlace de previsualización
    if (emailConfig.testMode && result) {
      const previewUrl = nodemailer.getTestMessageUrl(result)
      response.testMode = {
        ...testModeInfo,
        previewUrl: previewUrl,
        note: 'Este es un correo de PRUEBA. No se enviarán correos reales.'
      }
      console.log('[EMAIL] URL de previsualización:', previewUrl)
    }

    if (result && result.messageId) {
      response.messageId = result.messageId
    }

    res.json(response)

  } catch (error) {
    const duration = Date.now() - startTime
    console.error(`[EMAIL ERROR] Fallo en ${duration}ms:`, error)

    // Verificar si es error de autenticación
    if (error.code === 'EAUTH') {
      return res.status(401).json({
        success: false,
        error: 'Error de autenticación. Verifica las credenciales del servidor.'
      })
    }

    // Verificar si es error de conexión
    if (error.code === 'ECONNECTION') {
      return res.status(503).json({
        success: false,
        error: 'No se puede conectar al servidor de correo. Intenta más tarde.'
      })
    }

    res.status(500).json({
      success: false,
      error: 'Error al enviar el mensaje. Por favor intenta nuevamente.'
    })
  }
})

// Endpoint de salud (para verificar que la API está activa)
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// Endpoint de prueba de conexión SMTP
router.get('/test-connection', async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: emailConfig.smtp.host,
      port: emailConfig.smtp.port,
      secure: emailConfig.smtp.secure,
      auth: {
        user: emailConfig.auth.user,
        pass: emailConfig.auth.pass
      }
    })

    await transporter.verify()
    
    res.json({
      success: true,
      message: 'Conexión SMTP exitosa'
    })

  } catch (error) {
    console.error('[SMTP TEST] Error:', error)
    res.status(503).json({
      success: false,
      error: 'No se puede conectar al servidor SMTP',
      details: error.message
    })
  }
})

export default router
