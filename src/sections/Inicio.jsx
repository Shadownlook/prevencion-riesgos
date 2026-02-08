import Reveal from '../components/Reveal'

export default function Inicio() {
  return (
    <section id="inicio" className="hero">
      
      <Reveal>
        <h1>
          Expertos en <span>Prevención de Riesgos</span> Laborales
        </h1>
      </Reveal>

      <Reveal delay={0.15}>
        <p>
          Asesoría integral en seguridad y salud ocupacional,
          alineada al <strong>DS 44</strong> y a la <strong>Ley 16.744</strong>,
          orientada a reducir accidentes y proteger a las personas.
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="hero-actions">
          <a href="#contacto" className="btn-primary">
            Solicitar Asesoría
          </a>

          <a href="#servicios" className="btn-secondary">
            Ver Servicios
          </a>
        </div>
      </Reveal>
    </section>
  )
}
