# Prevención de Riesgos

Sitio web corporativo para servicios de prevención de riesgos laborales.

## Despliegue en GitHub Pages

### Pasos para desplegar:

1. **Crear repositorio en GitHub**
   - Crear un nuevo repositorio público en GitHub
   - Nombre sugerido: `prevencion-riesgos`

2. **Subir el proyecto**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/prevencion-riesgos.git
   git push -u origin main
   ```

3. **Configurar GitHub Pages**
   - Ir a Settings > Pages
   - Source: "Deploy from a branch"
   - Branch: "gh-pages" (o "main" si usas Actions)
   - Folder: "/ (root)"

4. **Desplegar automáticamente**
   El proyecto ya tiene configurado `gh-pages` en el package.json:
   ```bash
   npm run deploy
   ```

   O puedes usar GitHub Actions para despliegue automático.

### Scripts disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Previsualizar build local
- `npm run deploy` - Desplegar a GitHub Pages

## Configuración

El proyecto usa Vite con base configurada para `/prevencion-riesgos/`. Si tu repositorio tiene un nombre diferente, actualiza `vite.config.js`:

```js
base: '/NOMBRE_DEL_REPOSITORIO/',
```

## Tecnologías

- React 19
- Vite
- Framer Motion
- Express (servidor local)
