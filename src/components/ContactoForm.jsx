import { useState, useCallback } from 'react'
import Reveal from './Reveal'

// ============================================
// PATRONES REGEX PARA VALIDACIÓN Y SANITIZACIÓN
// ============================================

const PATTERNS = {
  // Detectar URLs completas
  url: /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9]+\.(com|net|org|edu|gov|mil|info|biz|io|co|cl|es|mx|ar|uy)[^\s]*)/gi,
  
  // Detectar URLs acortadas comunes
  shortUrl: /(bit\.ly|tinyurl\.com|goo\.gl|t\.co|ow\.ly|is\.gd|buff\.ly|adf\.ly|j\.mp|tr\.im|cli\.gs|short\.to|budurl\.com|ping\.fm|post\.ly|just\.as|bkite\.com|snipr\.comfic\.ll|req\.in|myurl\.in|yx\.dz|twitthis\.com|u\.to|j\.mp|v\.gd|rb\.gy|shorturl\.at|cutt\.ly)[^\s]*/gi,
  
  // Detectar código HTML/XML
  htmlTags: /<[^>]+>/g,
  
  // Detectar código JavaScript
  jsCode: /<script[^>]*>[\s\S]*?<\/script>/gi,
  
  // Detectar direcciones de correo electrónico
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  
  // Detectar caracteres sospechosos de spam
  spamChars: /(\${|`|\||\$|#|~|\^|\&|\*|\}|\[|\]|\\|\/|<|>|\{|\}|©|®|™|€|£|¥|¢|¬|¦)/g,
  
  // Detectar secuencias de mayúsculas repetidas (CAPS LOCK)
  capsLock: /[A-Z]{5,}/g,
  
  // Detectar secuencias de números repetidos
  repeatedNumbers: /(\d)\1{4,}/g,
  
  // Detectar repetición excesiva de caracteres especiales
  repeatedSpecial: /([!@#$%^&*()_+=-])\1{3,}/g,
}

// ============================================
// FUNCIÓN DE SANITIZACIÓN
// ============================================

const sanitizeInput = (input) => {
  let sanitized = input
  
  // Eliminar HTML tags
  sanitized = sanitized.replace(PATTERNS.htmlTags, '')
  sanitized = sanitized.replace(PATTERNS.jsCode, '')
  
  // Reemplazar URLs con texto plano (quitar enlaces)
  sanitized = sanitized.replace(PATTERNS.url, '[ENLACE REMOVIDO]')
  sanitized = sanitized.replace(PATTERNS.shortUrl, '[ENLACE REMOVIDO]')
  
  // Enmascarar correos electrónicos
  sanitized = sanitized.replace(PATTERNS.email, '[EMAIL REMOVIDO]')
  
  // Eliminar caracteres sospechosos
  sanitized = sanitized.replace(PATTERNS.spamChars, '')
  
  // Normalizar espacios múltiples
  sanitized = sanitized.replace(/\s+/g, ' ').trim()
  
  return sanitized
}

// ============================================
// FUNCIÓN DE VALIDACIÓN
// ============================================

const validateInput = (field, value) => {
  const errors = []
  
  // Detectar contenido malicioso
  if (PATTERNS.htmlTags.test(value)) {
    errors.push('El contenido contiene etiquetas HTML que no están permitidas.')
  }
  
  if (PATTERNS.jsCode.test(value)) {
    errors.push('El contenido contiene código JavaScript que no está permitido.')
  }
  
  if (PATTERNS.url.test(value) || PATTERNS.shortUrl.test(value)) {
    errors.push('Los enlaces URL no están permitidos en los mensajes.')
  }
  
  if (PATTERNS.email.test(value)) {
    errors.push('Las direcciones de correo electrónico no deben incluirse en el mensaje.')
  }
  
  if (PATTERNS.capsLock.test(value)) {
    errors.push('Evita usar demasiadas mayúsculas.')
  }
  
  if (PATTERNS.repeatedNumbers.test(value)) {
    errors.push('El mensaje contiene secuencias de números sospechosas.')
  }
  
  if (PATTERNS.repeatedSpecial.test(value)) {
    errors.push('El mensaje contiene caracteres especiales repetidos.')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitizedValue: sanitizeInput(value)
  }
}

// ============================================
// VALIDACIÓN ESPECÍFICA POR CAMPO
// ============================================

const validators = {
  nombre: (value) => {
    const errors = []
    if (value.length < 2) {
      errors.push('El nombre debe tener al menos 2 caracteres.')
    }
    if (value.length > 50) {
      errors.push('El nombre no puede exceder 50 caracteres.')
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
      errors.push('El nombre solo puede contener letras y espacios.')
    }
    return { isValid: errors.length === 0, errors }
  },
  
  email: (value) => {
    const errors = []
    if (!value) {
      errors.push('El correo electrónico es obligatorio.')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors.push('Por favor ingresa un correo electrónico válido.')
    }
    if (value.length > 100) {
      errors.push('El correo no puede exceder 100 caracteres.')
    }
    return { isValid: errors.length === 0, errors }
  },
  
  empresa: (value) => {
    const errors = []
    if (value && value.length > 100) {
      errors.push('El nombre de la empresa no puede exceder 100 caracteres.')
    }
    return { isValid: errors.length === 0, errors }
  },
  
  telefono: (value) => {
    const errors = []
    if (value && !/^[\d\s\-+()]+$/.test(value)) {
      errors.push('El teléfono solo puede contener números, espacios, guiones y paréntesis.')
    }
    if (value && value.length < 8) {
      errors.push('El teléfono debe tener al menos 8 dígitos.')
    }
    return { isValid: errors.length === 0, errors }
  },
  
  mensaje: (value) => {
    const errors = []
    if (value.length < 10) {
      errors.push('El mensaje debe tener al menos 10 caracteres.')
    }
    if (value.length > 2000) {
      errors.push('El mensaje no puede exceder 2000 caracteres.')
    }
    
    // Validar contenido malicioso
    const contentCheck = validateInput('mensaje', value)
    if (!contentCheck.isValid) {
      errors.push(...contentCheck.errors)
    }
    
    return { 
      isValid: errors.length === 0, 
      errors,
      sanitizedValue: contentCheck.sanitizedValue
    }
  }
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function ContactoForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    empresa: '',
    telefono: '',
    mensaje: ''
  })
  
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [sanitizedMessage, setSanitizedMessage] = useState('')
  
  // Honeypot field (invisible para usuarios reales)
  const [honeypot, setHoneypot] = useState('')

  // Manejar cambios en los campos
  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    
    // Si es el campo honeypot, ignorar (es para bots)
    if (name === 'honeypot') {
      setHoneypot(value)
      return
    }
    
    // Actualizar el valor
    const newValue = value
    setFormData(prev => ({ ...prev, [name]: newValue }))
    
    // Validar en tiempo real si el campo ya fue tocado
    if (touched[name]) {
      validateField(name, newValue)
    }
    
    // Si es el campo mensaje, sanitizar y actualizar
    if (name === 'mensaje') {
      const result = validators.mensaje(newValue)
      setSanitizedMessage(result.sanitizedValue || '')
    }
  }, [touched])

  // Validar un campo específico
  const validateField = useCallback((name, value) => {
    let result
    
    if (name === 'mensaje') {
      result = validators.mensaje(value)
      setSanitizedMessage(result.sanitizedValue || '')
    } else {
      result = validators[name] ? validators[name](value) : { isValid: true, errors: [] }
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: result.errors
    }))
    
    return result.isValid
  }, [])

  // Manejar pérdida de foco (blur)
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    validateField(name, value)
  }, [validateField])

  // Manejar ganancia de foco (focus) - limpiar errores
  const handleFocus = useCallback((e) => {
    const { name } = e.target
    setErrors(prev => ({ ...prev, [name]: [] }))
  }, [])

  // Validar todo el formulario
  const validateForm = useCallback(() => {
    const allErrors = {}
    let isValid = true
    
    Object.keys(formData).forEach(field => {
      if (field === 'mensaje') {
        const result = validators.mensaje(formData[field])
        if (!result.isValid) {
          allErrors[field] = result.errors
          isValid = false
        }
        setSanitizedMessage(result.sanitizedValue || '')
      } else if (field !== 'telefono' || formData[field]) { // telefono es opcional
        const result = validators[field] ? validators[field](formData[field]) : { isValid: true, errors: [] }
        if (!result.isValid) {
          allErrors[field] = result.errors
          isValid = false
        }
      }
    })
    
    // Marcar todos los campos como tocados
    const allTouched = {}
    Object.keys(formData).forEach(key => {
      allTouched[key] = true
    })
    setTouched(allTouched)
    
    setErrors(allErrors)
    return isValid
  }, [formData])

  // Manejar envío del formulario
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    
    // Verificar honeypot - si tiene valor, es un bot
    if (honeypot) {
      setSubmitStatus({
        type: 'error',
        message: 'Tu mensaje no pudo ser enviado. Se detectó actividad sospechosa.'
      })
      return
    }
    
    // Validar formulario
    if (!validateForm()) {
      setSubmitStatus({
        type: 'error',
        message: 'Por favor corrige los errores antes de enviar.'
      })
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    // Preparar datos para enviar
    const dataToSend = {
      nombre: formData.nombre.trim(),
      email: formData.email.trim().toLowerCase(),
      empresa: formData.empresa.trim(),
      telefono: formData.telefono.trim(),
      mensaje: sanitizedMessage || formData.mensaje.trim()
    }
    
    try {
      // Llamar a la API de envío de correos
      const response = await fetch('/api/contacto/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      })
      
      const result = await response.json()
      
      if (result.success) {
        // Mostrar información de prueba si está en modo test
        let successMessage = '¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.'
        
        if (result.testMode && result.testMode.previewUrl) {
          successMessage = (
            <>
              <strong>¡Mensaje enviado exitosamente!</strong><br />
              <span style={{ fontSize: '0.9em', color: '#666' }}>
                (MODO DE PRUEBA) - <a href={result.testMode.previewUrl} target="_blank" rel="noopener noreferrer">
                  Ver correo de prueba
                </a>
              </span>
            </>
          )
        }
        
        setSubmitStatus({
          type: 'success',
          message: successMessage
        })
        
        // Limpiar formulario
        setFormData({
          nombre: '',
          email: '',
          empresa: '',
          telefono: '',
          mensaje: ''
        })
        setSanitizedMessage('')
        setTouched({})
        setErrors({})
        setHoneypot('')
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Ocurrió un error al enviar el mensaje. Por favor intenta nuevamente.'
        })
      }
      
    } catch (error) {
      console.error('Error al enviar formulario:', error)
      setSubmitStatus({
        type: 'error',
        message: 'Error de conexión. Por favor verifica tu internet e intenta nuevamente.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }, [honeypot, formData, sanitizedMessage, validateForm])

  // Contador de caracteres para el mensaje
  const messageLength = formData.mensaje.length
  const maxMessageLength = 2000

  return (
    <section id="contacto" className="section section-contact">
      <Reveal>
        <header className="section-header">
          <span className="section-eyebrow">Contacto</span>
          <h2>Hablemos sobre la Seguridad de tu Empresa</h2>
          <p>
            Solicita una asesoría personalizada en prevención de riesgos
            y cumplimiento normativo.
          </p>
        </header>
      </Reveal>

      <div className="contact-grid">
        {/* INFORMACIÓN DE CONTACTO */}
        <Reveal delay={0.1}>
          <div className="contact-info">
            <h3>Asesoría Profesional</h3>
            <p>
              Te apoyamos en la implementación del <strong>DS 44</strong> y
              la <strong>Ley 16.744</strong>, adaptándonos a tu rubro
              y necesidades operacionales.
            </p>

            <ul className="contact-list">
              <li>✔ Diagnóstico inicial sin costo</li>
              <li>✔ Respuesta en menos de 24 horas</li>
              <li>✔ Asesoría personalizada</li>
              <li>✔ Confidencialidad garantizada</li>
            </ul>
          </div>
        </Reveal>

        {/* FORMULARIO */}
        <Reveal delay={0.2}>
          <form className="contact-form" onSubmit={handleSubmit}>
            
            {/* CAMPO HONEYPOT (OCULTO) - Para atrapar bots */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <label htmlFor="honeypot">No llenar este campo</label>
              <input
                type="text"
                id="honeypot"
                name="honeypot"
                value={honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* NOMBRE */}
            <div className={`form-group ${errors.nombre?.length > 0 ? 'has-error' : ''}`}>
              <label htmlFor="nombre">
                Nombre completo <span className="required">*</span>
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                placeholder="Juan Pérez"
                maxLength={50}
                autoComplete="name"
              />
              {errors.nombre?.length > 0 && (
                <div className="error-message">
                  {errors.nombre[0]}
                </div>
              )}
            </div>

            {/* EMAIL */}
            <div className={`form-group ${errors.email?.length > 0 ? 'has-error' : ''}`}>
              <label htmlFor="email">
                Correo electrónico <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                placeholder="juan@empresa.cl"
                maxLength={100}
                autoComplete="email"
              />
              {errors.email?.length > 0 && (
                <div className="error-message">
                  {errors.email[0]}
                </div>
              )}
            </div>

            {/* EMPRESA */}
            <div className={`form-group ${errors.empresa?.length > 0 ? 'has-error' : ''}`}>
              <label htmlFor="empresa">Empresa (opcional)</label>
              <input
                type="text"
                id="empresa"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                placeholder="Nombre de la empresa"
                maxLength={100}
              />
              {errors.empresa?.length > 0 && (
                <div className="error-message">
                  {errors.empresa[0]}
                </div>
              )}
            </div>

            {/* TELÉFONO */}
            <div className={`form-group ${errors.telefono?.length > 0 ? 'has-error' : ''}`}>
              <label htmlFor="telefono">Teléfono (opcional)</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                placeholder="+56 9 1234 5678"
                autoComplete="tel"
              />
              {errors.telefono?.length > 0 && (
                <div className="error-message">
                  {errors.telefono[0]}
                </div>
              )}
            </div>

            {/* MENSAJE */}
            <div className={`form-group ${errors.mensaje?.length > 0 ? 'has-error' : ''}`}>
              <label htmlFor="mensaje">
                Mensaje <span className="required">*</span>
                <span className="char-count">
                  {messageLength}/{maxMessageLength}
                </span>
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                placeholder="Cuéntanos brevemente sobre tu necesidad de asesoría en prevención de riesgos..."
                rows={5}
                maxLength={maxMessageLength}
              />
              
              {/* Barra de progreso del mensaje */}
              <div className="char-progress">
                <div 
                  className="char-progress-bar"
                  style={{ 
                    width: `${Math.min((messageLength / maxMessageLength) * 100, 100)}%`,
                    backgroundColor: messageLength > maxMessageLength * 0.9 
                      ? '#ef4444' 
                      : messageLength > maxMessageLength * 0.7 
                        ? '#f59e0b' 
                        : '#10b981'
                  }}
                />
              </div>
              
              {errors.mensaje?.length > 0 && (
                <div className="error-message">
                  {errors.mensaje[0]}
                </div>
              )}
              
              {/* Advertencia sobre contenido no permitido */}
              <div className="content-warning">
                <small>
                  ⚠️ No se permiten enlaces URL, código, etiquetas HTML ni direcciones de correo electrónico.
                </small>
              </div>
            </div>

            {/* ESTADO DEL ENVÍO */}
            {submitStatus && (
              <div className={`submit-status ${submitStatus.type}`}>
                {submitStatus.type === 'success' ? '✓ ' : '✗ '}
                {submitStatus.message}
              </div>
            )}

            {/* BOTÓN DE ENVÍO */}
            <button
              type="submit"
              className="btn-primary full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading">
                  <span className="spinner"></span>
                  Enviando...
                </span>
              ) : (
                'Solicitar Asesoría'
              )}
            </button>

            {/* NOTA DE PRIVACIDAD */}
            <p className="privacy-note">
              <small>
                🔒 Tu información será tratada de forma confidencial y solo será utilizada
                para responder a tu solicitud.
              </small>
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
