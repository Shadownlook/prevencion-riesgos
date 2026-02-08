import { useState } from 'react'
import previseoLogo from '../assets/previseo-logo.png'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const toggleMenu = () => setOpen(!open)
  const closeMenu = () => setOpen(false)

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">

          {/* LOGO */}
          <a href="#inicio" className="navbar-logo">
            <img 
              src={previseoLogo} 
              alt="Previseo Logo" 
              className="navbar-logo-img"
            />
          </a>

          {/* BOTÓN MOBILE */}
          <button
            className={`navbar-toggle ${open ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>

          {/* LINKS */}
          <ul className={`navbar-links ${open ? 'open' : ''}`}>
            <li><a href="#inicio" onClick={closeMenu}>Inicio</a></li>
            <li><a href="#servicios" onClick={closeMenu}>Servicios</a></li>
            <li><a href="#normativa" onClick={closeMenu}>Normativa</a></li>
            <li><a href="#sectores" onClick={closeMenu}>Sectores</a></li>
            <li><a href="#metodologia" onClick={closeMenu}>Metodología</a></li>
            <li><a href="#certificaciones" onClick={closeMenu}>ISO</a></li>
            <li><a href="#portafolio" onClick={closeMenu}>Portafolio</a></li>
            <li><a href="#empresas" onClick={closeMenu}>Empresas</a></li>
            <li><a href="#nosotros" onClick={closeMenu}>Nosotros</a></li>
            <li>
              <a
                href="#contacto"
                className="btn-primary nav-cta"
                onClick={closeMenu}
              >
                Contacto
              </a>
            </li>
          </ul>

          {/* OVERLAY */}
          <div className={`navbar-overlay ${open ? 'open' : ''}`} onClick={closeMenu} />

        </div>
      </nav>
    </>
  )
}
