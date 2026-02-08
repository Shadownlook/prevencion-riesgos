import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <div className="navbar-logo">
          <span>Previseo</span>
        </div>

        {/* BOTÓN MOBILE */}
        <button
          className="navbar-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          <span />
          <span />
          <span />
        </button>

        {/* LINKS */}
        <ul className={`navbar-links ${open ? 'open' : ''}`}>
          <li><a href="#inicio" onClick={() => setOpen(false)}>Inicio</a></li>
          <li><a href="#servicios" onClick={() => setOpen(false)}>Servicios</a></li>
          <li><a href="#normativa" onClick={() => setOpen(false)}>Normativa</a></li>
          <li><a href="#sectores" onClick={() => setOpen(false)}>Sectores</a></li>
          <li><a href="#metodologia" onClick={() => setOpen(false)}>Metodología</a></li>
          <li><a href="#certificaciones" onClick={() => setOpen(false)}>ISO</a></li>
          <li><a href="#portafolio" onClick={() => setOpen(false)}>Portafolio</a></li>
          <li><a href="#empresas" onClick={() => setOpen(false)}>Empresas</a></li>
          <li><a href="#nosotros" onClick={() => setOpen(false)}>Nosotros</a></li>
          <li>
            <a
              href="#contacto"
              className="btn-primary nav-cta"
              onClick={() => setOpen(false)}
            >
              Contacto
            </a>
          </li>
        </ul>

      </div>
    </nav>
  )
}
