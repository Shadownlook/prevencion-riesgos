/**
 * =============================================================================
 * CONFIGURACIÓN DE CORREO ELECTRÓNICO - PREVISEO
 * =============================================================================
 * 
 * Este archivo configura el sistema de envío de correos electrónicos para el
 * formulario de contacto de Previseo. Diseñado para ser compatible con
 * Nodemailer y otras librerías populares de Node.js.
 * 
 * =============================================================================
 * GUÍA DE CONFIGURACIÓN
 * =============================================================================
 * 
 * 1. INSTALACIÓN DE DEPENDENCIAS:
 *    npm install nodemailer
 * 
 * 2. CREAR ARCHIVO .env:
 *    Copia este archivo como .env y completa los valores correspondientes.
 *    NO commitear este archivo al repositorio.
 * 
 * 3. VARIABLES DE ENTORNO:
 *    Asegúrate de que las variables estén disponibles en process.env
 * 
 * 4. PROVEEDORES SOPORTADOS:
 *    - Gmail: Requires App Password
 *    - Outlook/Hotmail: Requires App Password
 *    - SendGrid: Requires API Key
 *    - Mailgun: Requires API Key
 *    - SMTP genérico: Cualquier servidor SMTP
 * 
 * =============================================================================
 */

export default {

  // ==========================================================================
  // MODO DE PRUEBAS
  // ==========================================================================
  
  /**
   * Habilitar modo de pruebas
   * @type {boolean}
   * @description En modo pruebas, los correos NO se envían realmente
   *              Se genera un enlace de previsualización de Ethereal
   */
  testMode: process.env.EMAIL_TEST_MODE === 'true' || false,

  // ==========================================================================
  // CONFIGURACIÓN DEL SERVIDOR SMTP
  // ==========================================================================
  smtp: {
    
    /**
     * Host del servidor SMTP
     * @type {string}
     * @example 'smtp.gmail.com'     // Gmail
     * @example 'smtp.outlook.com'    // Outlook
     * @example 'smtp.sendgrid.net'  // SendGrid
     * @example 'smtp.mailgun.org'    // Mailgun
     */
    host: process.env.SMTP_HOST || 'smtp.gmail.com',

    /**
     * Puerto del servidor SMTP
     * @type {number}
     * @example 587  // Puerto estándar (TLS/STARTTLS)
     * @example 465  // Puerto para SSL
     * @example 25   // Puerto SMTP estándar (sin cifrado)
     */
    port: parseInt(process.env.SMTP_PORT, 10) || 587,

    /**
     * Protocolo de seguridad
     * @type {'tls' | 'ssl' | 'none'}
     * @description 'tls' usa STARTTLS (recomendado para puerto 587)
     *              'ssl' usa SSL directo (recomendado para puerto 465)
     *              'none' sin cifrado (no recomendado)
     */
    secure: process.env.SMTP_SECURE === 'true' || false,

    /**
     * Tiempo de espera de conexión en milisegundos
     * @type {number}
     * @default 10000 (10 segundos)
     * @example 30000  // 30 segundos para conexiones lentas
     */
    connectionTimeout: parseInt(process.env.SMTP_CONNECTION_TIMEOUT, 10) || 10000,

    /**
     * Tiempo de espera de saludo (greeting) en ms
     * @type {number}
     * @default 7000 (7 segundos)
     */
    greetingTimeout: parseInt(process.env.SMTP_GREETING_TIMEOUT, 10) || 7000,

    /**
     * Tiempo de espera de socket en ms
     * @type {number}
     * @default 0 (sin límite)
     */
    socketTimeout: parseInt(process.env.SMTP_SOCKET_TIMEOUT, 10) || 0,

    /**
     * Número máximo de conexiones simultáneas
     * @type {number}
     * @default 5
     */
    maxConnections: parseInt(process.env.SMTP_MAX_CONNECTIONS, 10) || 5,

    /**
     * Número máximo de mensajes por conexión
     * @type {number}
     * @default 100
     */
    maxMessages: parseInt(process.env.SMTP_MAX_MESSAGES, 10) || 100,

    /**
     * Deshabilitar verificación de certificado SSL/TLS
     * ⚠️ PELIGROSO: Solo usar en desarrollo
     * @type {boolean}
     */
    disableAutoTLS: process.env.SMTP_DISABLE_AUTO_TLS === 'true' || false,

    /**
     * Requiere autenticación STARTTLS
     * @type {boolean}
     */
    requireTLS: process.env.SMTP_REQUIRE_TLS === 'true' || false,

    /**
     * Nombre del servidor que aparece en el saludo SMTP
     * @type {string}
     * @example 'Previseo Mail Server'
     */
    name: process.env.SMTP_NAME || 'localhost',

  },

  // ==========================================================================
  // CREDENCIALES DE AUTENTICACIÓN
  // ==========================================================================
  auth: {

    /**
     * Usuario para autenticación SMTP
     * @type {string}
     * @example 'tu@email.com'           // Correo completo
     * @example 'tu.usuario'              // Solo usuario (algunos servidores)
     */
    user: process.env.SMTP_USER || '',

    /**
     * Contraseña o App Password
     * ⚠️ IMPORTANTE: Para Gmail/Outlook usar App Password, no contraseña normal
     * @type {string}
     * @see https://support.google.com/accounts/answer/185833?hl=es
     * @see https://support.microsoft.com/es-es/account-billing/crear-y-usar-contrase%C3%B1as-de-aplicaci%C3%B3n-a-partir-de-01-09-2022
     */
    pass: process.env.SMTP_PASS || '',

    /**
     * Método de autenticación
     * @type {'PLAIN' | 'LOGIN' | 'XOAUTH2' | 'CRAM-MD5'}
     * @default 'PLAIN' (más común)
     * @example 'XOAUTH2' // Para Gmail con OAuth2
     */
    method: process.env.SMTP_AUTH_METHOD || 'PLAIN',

    /**
     * Token OAuth2 (solo si usa OAuth2)
     * @type {string}
     */
    oauth2: {
      accessToken: process.env.SMTP_OAUTH2_ACCESS_TOKEN || '',
      refreshToken: process.env.SMTP_OAUTH2_REFRESH_TOKEN || '',
      expires: parseInt(process.env.SMTP_OAUTH2_EXPIRES, 10) || 0,
    },

  },

  // ==========================================================================
  // CONFIGURACIÓN DE CORREOS
  // ==========================================================================
  emails: {

    /**
     * Correo electrónico del remitente
     * @type {string}
     * @description Appecerá como "From" en los correos enviados
     * @example 'contacto@previseo.com'
     */
    from: {
      name: process.env.EMAIL_FROM_NAME || 'Previseo - Contacto',
      address: process.env.EMAIL_FROM_ADDRESS || 'contacto@previseo.com',
    },

    /**
     * Correo electrónico de respuesta (Reply-To)
     * @type {string}
     * @description Cuando el usuario haga clic en "Responder"
     * @example 'no-responder@previseo.com'
     */
    replyTo: process.env.EMAIL_REPLY_TO || 'no-responder@previseo.com',

    /**
     * Lista de correos destino (donde se reciben los mensajes)
     * @type {string[]}
     * @description Correos que recibirán los mensajes del formulario
     * @example ['contacto@previseo.com', 'ventas@previseo.com']
     */
    to: (process.env.EMAIL_TO_ADDRESS || 'contacto@previseo.com')
      .split(',')
      .map(email => email.trim())
      .filter(Boolean),

    /**
     * Lista de correos en BCC (copia oculta)
     * @type {string[]}
     */
    bcc: (process.env.EMAIL_BCC_ADDRESSES || '')
      .split(',')
      .map(email => email.trim())
      .filter(Boolean),

    /**
     * Correo para copias (CC)
     * @type {string[]}
     */
    cc: (process.env.EMAIL_CC_ADDRESSES || '')
      .split(',')
      .map(email => email.trim())
      .filter(Boolean),

  },

  // ==========================================================================
  // CONFIGURACIÓN DEL CONTENIDO DEL CORREO
  // ==========================================================================
  content: {

    /**
     * Asunto del correo
     * @type {string}
     * @description Se puede usar variables como {{nombre}}, {{empresa}}
     * @example 'Nuevo contacto desde el sitio web: {{nombre}}'
     */
    subject: process.env.EMAIL_SUBJECT || 'Nuevo mensaje de contacto - Previseo',

    /**
     * Formato del correo
     * @type {'html' | 'text' | 'both'}
     * @description 'both' envía ambas versiones (mejor compatibilidad)
     */
    format: process.env.EMAIL_FORMAT || 'both',

    /**
     * Codificación de caracteres
     * @type {'utf-8' | 'windows-1252' | 'iso-8859-1'}
     * @default 'utf-8'
     */
    encoding: process.env.EMAIL_ENCODING || 'utf-8',

    /**
     * Prioridad del correo
     * @type {1 | 3 | 5}
     * @description 1 = alta, 3 = normal, 5 = baja
     */
    priority: parseInt(process.env.EMAIL_PRIORITY, 10) || 3,

    /**
     * Headers personalizados
     * @type {object}
     */
    headers: {
      'X-Mailer': 'Previseo Contact Form/1.0',
      'X-Priority': '3',
      'X-MSMail-Priority': 'Normal',
      'Message-ID': `<${Date.now()}.${Math.random().toString(36).substr(2, 9)}@previseo.com>`,
    },

    /**
     * Plantilla HTML del correo (versión mejorada)
     * @type {string}
     */
    htmlTemplate: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo Mensaje de Contacto</title>
</head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #0a2540 0%, #102a43 100%); padding: 30px; border-radius: 12px 12px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">📬 Nuevo Mensaje de Contacto</h1>
  </div>
  
  <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #0a2540;">Nombre:</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">{{nombre}}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #0a2540;">Correo:</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">{{email}}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #0a2540;">Empresa:</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">{{empresa}}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #0a2540;">Teléfono:</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">{{telefono}}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; font-weight: 600; color: #0a2540; vertical-align: top;">Mensaje:</td>
        <td style="padding: 12px 0;">{{mensaje}}</td>
      </tr>
    </table>
    
    <div style="margin-top: 30px; padding: 20px; background: #eef2ff; border-radius: 8px; border-left: 4px solid #2563eb;">
      <p style="margin: 0; font-size: 14px; color: #0a2540;">
        📅 <strong>Fecha:</strong> {{fecha}}<br>
        🌐 <strong>Origen:</strong> Sitio Web Previseo<br>
        🔒 <strong>Mensaje sanitizado</strong> para seguridad
      </p>
    </div>
    
    <div style="margin-top: 30px; text-align: center;">
      <a href="{{replyLink}}" style="display: inline-block; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 600;">
        Responder al cliente
      </a>
    </div>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #64748b; font-size: 12px;">
    <p>Este mensaje fue enviado desde el formulario de contacto de Previseo</p>
    <p>© ${new Date().getFullYear()} Previseo - Prevención de Riesgos Laborales</p>
  </div>
</body>
</html>
    `,

    /**
     * Plantilla de texto plano (para clientes sin HTML)
     * @type {string}
     */
    textTemplate: `
NUEVO MENSAJE DE CONTACTO - PREVISEO
====================================

INFORMACIÓN DEL CONTACTO
-------------------------
Nombre: {{nombre}}
Correo: {{email}}
Empresa: {{empresa}}
Teléfono: {{telefono}}

MENSAJE
-------
{{mensaje}}

------------------------------------
Fecha: {{fecha}}
Origen: Sitio Web Previseo
Este mensaje fue sanitizado para tu seguridad.

© ${new Date().getFullYear()} Previseo - Prevención de Riesgos Laborales
    `,

  },

  // ==========================================================================
  // ARCHIVOS ADJUNTOS
  // ==========================================================================
  attachments: {

    /**
     * Habilitar archivos adjuntos
     * @type {boolean}
     */
    enabled: process.env.EMAIL_ATTACHMENTS_ENABLED === 'true' || false,

    /**
     * Tamaño máximo total de adjuntos en bytes
     * @type {number}
     * @default 10485760 (10 MB)
     * @example 5242880   // 5 MB
     * @example 26214400  // 25 MB
     */
    maxSize: parseInt(process.env.EMAIL_ATTACHMENTS_MAX_SIZE, 10) || 10485760,

    /**
     * Tipos de archivos permitidos
     * @type {string[]}
     */
    allowedTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],

    /**
     * Extensiones de archivos permitidas
     * @type {string[]}
     */
    allowedExtensions: [
      '.jpg', '.jpeg', '.png', '.gif', '.pdf', '.doc', '.docx',
    ],

    /**
     * Directorio para almacenar adjuntos temporalmente
     * @type {string}
     */
    tempDir: process.env.EMAIL_ATTACHMENTS_TEMP_DIR || './uploads/temp',

  },

  // ==========================================================================
  // CONFIGURACIÓN DE REINTENTOS
  // ==========================================================================
  retries: {

    /**
     * Número de reintentos en caso de fallo
     * @type {number}
     * @default 3
     */
    attempts: parseInt(process.env.EMAIL_RETRIES, 10) || 3,

    /**
     * Tiempo entre reintentos en ms
     * @type {number}
     * @default 5000 (5 segundos)
     */
    delay: parseInt(process.env.EMAIL_RETRY_DELAY, 10) || 5000,

    /**
     * Factor de backoff exponencial
     * @type {number}
     * @example 2 = 5s, 10s, 20s...
     */
    factor: parseFloat(process.env.EMAIL_RETRY_FACTOR) || 2,

    /**
     * Tiempo máximo de reintentos en ms
     * @type {number}
     * @default 60000 (1 minuto)
     */
    maxTime: parseInt(process.env.EMAIL_RETRY_MAX_TIME, 10) || 60000,

  },

  // ==========================================================================
  // CONFIGURACIÓN DE LOGGING
  // ==========================================================================
  logging: {

    /**
     * Habilitar logging
     * @type {boolean}
     */
    enabled: process.env.EMAIL_LOGGING_ENABLED === 'true' || true,

    /**
     * Nivel de logging
     * @type {'debug' | 'info' | 'warn' | 'error'}
     */
    level: process.env.EMAIL_LOG_LEVEL || 'info',

    /**
     * Incluir contenido del correo en logs
     * ⚠️ PELIGROSO: Puede exponer información sensible
     * @type {boolean}
     */
    includeContent: process.env.EMAIL_LOG_INCLUDE_CONTENT === 'true' || false,

    /**
     * Enmascarar información sensible en logs
     * @type {boolean}
     */
    maskSensitive: process.env.EMAIL_LOG_MASK_SENSITIVE !== 'false',

  },

  // ==========================================================================
  // LÍMITES DE USO
  // ==========================================================================
  limits: {

    /**
     * Máximo de correos por hora
     * @type {number}
     * @example 100  // Límite estándar
     * @example 500  // Para mayor volumen
     */
    perHour: parseInt(process.env.EMAIL_LIMIT_PER_HOUR, 10) || 100,

    /**
     * Máximo de correos por día
     * @type {number}
     */
    perDay: parseInt(process.env.EMAIL_LIMIT_PER_DAY, 10) || 1000,

    /**
     * Intervalo mínimo entre correos en ms
     * @type {number}
     * @default 1000 (1 segundo)
     */
    minInterval: parseInt(process.env.EMAIL_LIMIT_MIN_INTERVAL, 10) || 1000,

    /**
     * Rate limit window en ms (1 hora)
     * @type {number}
     */
    windowMs: parseInt(process.env.EMAIL_LIMIT_WINDOW_MS, 10) || 3600000,

  },

  // ==========================================================================
  // VALIDACIÓN DE CONFIGURACIÓN
  // ==========================================================================
  validate: function() {
    const errors = []
    const config = this

    // Validar SMTP
    if (!config.smtp.host) {
      errors.push('SMTP_HOST es requerido')
    }
    if (!config.smtp.port || config.smtp.port < 1 || config.smtp.port > 65535) {
      errors.push('SMTP_PORT debe ser un número entre 1 y 65535')
    }

    // Validar autenticación
    if (!config.auth.user) {
      errors.push('SMTP_USER es requerido')
    }
    if (!config.auth.pass) {
      errors.push('SMTP_PASS es requerido')
    }

    // Validar correos
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (config.emails.to.length === 0) {
      errors.push('EMAIL_TO_ADDRESS es requerido')
    } else {
      config.emails.to.forEach(email => {
        if (!emailRegex.test(email)) {
          errors.push(`EMAIL_TO_ADDRESS inválido: ${email}`)
        }
      })
    }

    // Validar tamaño de adjuntos
    if (config.attachments.maxSize < 0) {
      errors.push('EMAIL_ATTACHMENTS_MAX_SIZE debe ser mayor a 0')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  },

}

// =============================================================================
// FIN DEL ARCHIVO DE CONFIGURACIÓN
// =============================================================================
