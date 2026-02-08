export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <span>Previseo</span>
        </div>
        <p className="footer-tagline">Prevención de Riesgos Laborales</p>
        <div className="footer-divider"></div>
        <p className="footer-subtext">
          Protegiendo a los trabajadores con soluciones integrales
        </p>
        <p className="footer-copy">
          © {new Date().getFullYear()} Knight Technologies Chile. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
