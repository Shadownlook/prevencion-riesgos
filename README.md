# Previceo - Prevención de Riesgos Laborales

Sitio web corporativo para Previceo, empresa líder en consultoría de prevención de riesgos laborales y ambientales.

## Estructura del Proyecto

```
.
├── assets/                 # Recursos estáticos
│   └── images/            # Imágenes del sitio
│       ├── logo.png       # Logo de Previceo
│       └── clients/       # Logos de clientes
│           ├── empresa1.png
│           ├── empresa2.png
│           ├── empresa3.png
│           └── empresa4.png
├── src/                   # Código fuente
│   ├── style.css         # Estilos CSS
│   └── script.js         # JavaScript
├── index.html            # Página principal
├── package.json          # Dependencias y scripts
├── vite.config.js        # Configuración de Vite
└── README.md             # Este archivo
```

## Características

- **Diseño Responsivo**: Adaptado para móviles, tablets y desktop
- **Accesible**: Uso de etiquetas semánticas HTML y atributos ARIA
- **Moderno**: Construido con Vite para desarrollo rápido
- **Optimizado**: Carga eficiente de recursos

## Secciones del Sitio

1. **Hero/Banner Principal**: Presentación de la empresa
2. **Acerca de Nosotros**: Información sobre la empresa
3. **Servicios**: Grid de servicios ofrecidos
4. **Clientes**: Logos de empresas asociadas
5. **Contacto**: Formulario de contacto

## Requisitos

- Node.js (v16 o superior)
- npm o yarn

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## Desarrollo

El proyecto utiliza Vite como empaquetador. Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

## Personalización

### Colores
Los colores principales se definen en `src/style.css`:
- Primary Blue: `#007bff`
- Secondary Gray: `#6c757d`
- Light Gray: `#f8f9fa`
- Dark Gray: `#343a40`

### Imágenes
Reemplazar los placeholders en `assets/images/` con imágenes reales:
- Formato recomendado: PNG o SVG
- Resolución mínima: 300x300px para logos
- Optimizar con TinyPNG antes de subir

## Navegación

- Menú fijo en la parte superior
- Smooth scroll entre secciones
- Menú hamburguesa en dispositivos móviles

## Formulario de Contacto

Incluye validación básica de campos requeridos.

## Browser Support

- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Edge (últimas 2 versiones)

## Licencia

MIT © Previceo 2023