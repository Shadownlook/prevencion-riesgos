import Reveal from '../components/Reveal'

export default function Servicios() {
  return (
    <section id="servicios" className="section section-light">

      {/* ENCABEZADO */}
      <Reveal>
        <header className="section-header">
          <span className="section-eyebrow">Nuestros Servicios</span>
          <h2>Soluciones Profesionales en Prevención de Riesgos</h2>
          <p>
            Como <strong>Prevencionista de Riesgos Laborales certificado</strong>, brindo asesoría integral
            en implementación y mantención de sistemas de seguridad y salud ocupacional.
            <strong>Todas las actividades técnicas son realizadas exclusivamente por el prevencionista</strong>,
            conforme al <strong>DS 44</strong> y la <strong>Ley 16.744</strong>.
          </p>
        </header>
      </Reveal>

      {/* SERVICIOS DESTACADOS */}
      <div className="featured-services">

        <Reveal delay={0.1}>
          <article className="featured-card">
            <h3>Asesoría Integral en Prevención</h3>
            <p>
              Gestión completa del sistema de prevención, asegurando
              cumplimiento legal, control de riesgos y mejora continua.
            </p>

            <ul className="checklist">
              <li>Implementación DS 44</li>
              <li>Asesoría mensual permanente</li>
              <li>Informes técnicos y ejecutivos</li>
            </ul>

            <a href="#contacto" className="btn-secondary">
              Cotizar servicio
            </a>
          </article>
        </Reveal>

        <Reveal delay={0.2}>
          <article className="featured-card accent">
            <span className="badge">Servicio Clave</span>

            <h3>Evaluación y Control de Riesgos (IPER)</h3>
            <p>
              Identificación, evaluación y control de riesgos críticos,
              priorizando la seguridad de las personas y la continuidad
              operacional.
            </p>

            <ul className="checklist">
              <li>Matriz IPER por proceso</li>
              <li>Identificación de riesgos críticos</li>
              <li>Planes de acción y control</li>
            </ul>

            <a href="#contacto" className="btn-primary">
              Solicitar evaluación
            </a>
          </article>
        </Reveal>

      </div>

      {/* SERVICIOS COMPLEMENTARIOS */}
      <div className="services-grid extended">

        <Reveal delay={0.1}>
          <article className="service-card">
            <h3>Capacitación y Charlas</h3>
            <p>
              Programas de formación práctica para trabajadores,
              supervisores y comités paritarios.
            </p>
            <span className="service-tag">Capacitación</span>
          </article>
        </Reveal>

        <Reveal delay={0.2}>
          <article className="service-card">
            <h3>Investigación de Accidentes</h3>
            <p>
              Investigación técnica de incidentes y accidentes
              laborales según normativa vigente.
            </p>
            <span className="service-tag">Investigación</span>
          </article>
        </Reveal>

        <Reveal delay={0.3}>
          <article className="service-card">
            <h3>Auditorías de Cumplimiento</h3>
            <p>
              Diagnóstico preventivo ante fiscalizaciones
              de organismos competentes.
            </p>
            <span className="service-tag">Auditoría</span>
          </article>
        </Reveal>

        <Reveal delay={0.4}>
          <article className="service-card">
            <h3>Planes de Emergencia</h3>
            <p>
              Diseño, implementación y simulacros de
              planes de emergencia y evacuación.
            </p>
            <span className="service-tag">Emergencias</span>
          </article>
        </Reveal>

        <Reveal delay={0.5}>
          <article className="service-card">
            <h3>Asesoría en Fiscalizaciones</h3>
            <p>
              Acompañamiento técnico durante inspecciones
              de la Dirección del Trabajo y SEREMI.
            </p>
            <span className="service-tag">Fiscalización</span>
          </article>
        </Reveal>

        <Reveal delay={0.6}>
          <article className="service-card">
            <h3>Gestión de Contratistas</h3>
            <p>
              Control documental y preventivo de empresas
              contratistas y subcontratistas.
            </p>
            <span className="service-tag">Contratistas</span>
          </article>
        </Reveal>

      </div>

    </section>
  )
}
