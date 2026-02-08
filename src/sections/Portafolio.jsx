import Reveal from '../components/Reveal'

const proyectos = [
  {
    titulo: 'Sistema de Gestión DS 44',
    cliente: 'Cirion',
    descripcion: 'Implementación completa del sistema de gestión en prevención de riesgos para Datacenters.',
    categoria: 'Data Center',
    resultado: 'Reducción 45% accidentes'
  },
  {
    titulo: 'Plan de Emergencia Industrial',
    cliente: 'Cirion',
    descripcion: 'Diseño e implementación de plan de emergencia y evacuación para planta Datacenter.',
    categoria: 'Data Center',
    resultado: '100% cumplimiento normativo'
  },
  {
    titulo: 'Matriz IPER Completa',
    cliente: 'Mendez Holler',
    descripcion: 'Identificación y evaluación de riesgos críticos para proyectos de construcción.',
    categoria: 'Construcción',
    resultado: '0 accidentes fatales'
  },
  {
    titulo: 'Capacitación Comité Paritario',
    cliente: 'De marca',
    descripcion: 'Programa de formación continua para comités paritarios de faena Indutrial.',
    categoria: 'Industria',
    resultado: '150 trabajadores capacitados'
  },
  {
    titulo: 'Auditoría de Cumplimiento',
    cliente: 'Aza Acero Sostenible',
    descripcion: 'Auditoría preventiva y acompañamiento en fiscalización de organismos competentes.',
    categoria: 'Telecomunicaciones',
    resultado: 'Aprobación sin observaciones'
  },
  {
    titulo: 'Plan de Seguridad obra',
    cliente: 'Mendez Holler',
    descripcion: 'Gestión integral de seguridad para proyecto de edificios de altura.',
    categoria: 'Construcción',
    resultado: 'Obra certificada ISO 45001'
  }
]

export default function Portafolio() {
  return (
    <section id="portafolio" className="section section-portfolio">
      
      <Reveal>
        <header className="section-header">
          <span className="section-eyebrow">Portafolio</span>
          <h2>Proyectos Destacados</h2>
          <p>
            Conoce algunos de los proyectos en los que hemos ayudado a empresas
            a mejorar su seguridad y cumplimiento normativo.
          </p>
        </header>
      </Reveal>

      <div className="portfolio-grid">
        {proyectos.map((proyecto, index) => (
          <Reveal key={index} delay={index * 0.1}>
            <article className="portfolio-card">
              <div className="portfolio-category">{proyecto.categoria}</div>
              <h3>{proyecto.titulo}</h3>
              <p className="portfolio-cliente"><strong>Cliente:</strong> {proyecto.cliente}</p>
              <p className="portfolio-descripcion">{proyecto.descripcion}</p>
              <div className="portfolio-resultado">
                <span className="resultado-label">Resultado</span>
                <span className="resultado-value">{proyecto.resultado}</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

    </section>
  )
}
