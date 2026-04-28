# 🧪 Guía de Pruebas - Sistema de Contacto Previseo

## 📋 Requisitos Previos

1. Node.js instalado (v18+)
2. npm o yarn

## 🚀 Instalación de Dependencias

```bash
cd prevencion-riesgos-react
npm install
```

## 🏃 Ejecutar las Pruebas

### Opción 1: Usar el Script Automatizado

```bash
npm run test:api
```

### Opción 2: Manual

**Terminal 1 - Servidor API:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## 🔗 URLs de Prueba

| Servicio | URL | Descripción |
|----------|-----|-------------|
| Frontend | http://localhost:5173 | Aplicación React |
| API Server | http://localhost:3000 | Servidor Express |
| API Health | http://localhost:3000/api/contacto/health | Verificar estado |
| API Status | http://localhost:3000/api/status | Estado general |

## 📝 Prueba del Formulario de Contacto

1. Abre http://localhost:5173
2. Ve a la sección de contacto
3. Completa el formulario:
   - Nombre: Juan Pérez
   - Email: juan@test.com
   - Empresa: Empresa Test
   - Teléfono: +56912345678
   - Mensaje: Este es un mensaje de prueba
4. Envía el formulario
5. ✅ Verás un enlace "Ver correo de prueba" - haz clic para ver el email

## 🐛 Solución de Problemas

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules
npm install
```

### Error: "Port already in use"
```bash
# Cambiar puerto
# En .env: PORT=3001
```

### Error: "CORS error"
```bash
# Verificar que vite.config.js tiene el proxy configurado
```

### Verificar que el servidor está corriendo
```bash
curl http://localhost:3000/api/status
```

Respuesta esperada:
```json
{
  "status": "ok",
  "name": "Previseo API",
  "version": "1.0.0"
}
```

## 📧 Configuración de Email (Producción)

Cuando estés listo para usar email real, configura las variables en `.env`:

```env
EMAIL_TEST_MODE=false
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password
EMAIL_FROM_ADDRESS=tu-email@gmail.com
EMAIL_TO_ADDRESS=tu-email@gmail.com
```

### Para Gmail:
1. Habilita 2FA en tu cuenta de Google
2. Crea una App Password en: https://myaccount.google.com/apppasswords
3. Usa esa password en `EMAIL_PASS`
