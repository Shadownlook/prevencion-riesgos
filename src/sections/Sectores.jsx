import Reveal from '../components/Reveal'

export default function Sectores() {
  return (
    <section id="sectores" className="section section-dark">

      <Reveal>
        <header className="section-header light">
          <span className="section-eyebrow">Sectores</span>
          <h2>Industrias que Atiendo</h2>
          <p>
            Contamos con experiencia en sectores de alto riesgo,
            adaptando la prevención a cada realidad operacional.
          </p>
        </header>
      </Reveal>

      <div className="sectors-grid">

        <Reveal delay={0.1}>
          <article className="sector-card">
            <span className="sector-icon">⛏️</span>
            <h3>Minería</h3>
            <p>
              Control de riesgos críticos, faenas, trabajo en altura
              y cumplimiento normativo exigente.
            </p>
          </article>
        </Reveal>

        <Reveal delay={0.2}>
          <article className="sector-card">
            <span className="sector-icon">📡</span>
            <h3>Telecomunicaciones</h3>
            <p>
              Seguridad en trabajos en postes, torres,
              riesgo eléctrico y altura.
            </p>
          </article>
        </Reveal>

        <Reveal delay={0.3}>
          <article className="sector-card">
            <span className="sector-icon">🏗️</span>
            <h3>Construcción</h3>
            <p>
              Prevención en obras, contratistas,
              excavaciones y trabajos críticos.
            </p>
          </article>
        </Reveal>

        <Reveal delay={0.4}>
          <article className="sector-card">
            <span className="sector-icon">🏭</span>
            <h3>Industria</h3>
            <p>
              Gestión de riesgos operacionales,
              ergonomía y seguridad industrial.
            </p>
          </article>
        </Reveal>

      </div>

    </section>
  )
}
