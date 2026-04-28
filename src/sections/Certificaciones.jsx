import Reveal from '../components/Reveal'

const normas = [
  {
    codigo: 'ISO 9001',
    titulo: 'Gestión de Calidad',
    descripcion: 'Estándar internacional para sistemas de gestión de calidad, enfocándose en cumplir los requisitos del cliente y mejorar continuamente los procesos.',
    beneficios: [
      'Mejora la satisfacción del cliente',
      'Optimización de procesos internos',
      'Mayor competitividad empresarial',
      'Reducción de errores y desperdicios'
    ],
    icon: '✓'
  },
  {
    codigo: 'ISO 45001',
    titulo: 'Seguridad y Salud Ocupacional',
    descripcion: 'Estándar internacional para sistemas de gestión de seguridad y salud en el trabajo, reemplazando a OHSAS 18001.',
    beneficios: [
      'Reducción de accidentes laborales',
      'Cumplimiento legal en seguridad',
      'Mejora del clima laboral',
      'Disminución de costos por incidentes'
    ],
    icon: '✓'
  },
  {
    codigo: 'ISO 14001',
    titulo: 'Gestión Ambiental',
    descripcion: 'Estándar internacional para sistemas de gestión ambiental, ayudando a las organizaciones a cumplir la normativa y mejorar su desempeño ambiental.',
    beneficios: [
      'Reducción de impacto ambiental',
      'Cumplimiento normativo ambiental',
      'Mejora de eficiencia energética',
      'Imagen corporativa responsable'
    ],
    icon: '✓'
  }
]

export default function Certificaciones() {
  return (
    <section id="certificaciones" className="section section-certificaciones">
      
      <Reveal>
        <header className="section-header">
          <span className="section-eyebrow">Certificaciones</span>
          <h2>Normas ISO de Gestión</h2>
          <p>
            Implementamos y auditamos los principales estándares internacionales
            para garantizar calidad, seguridad y responsabilidad ambiental.
          </p>
        </header>
      </Reveal>

      <div className="normas-grid">
        {normas.map((norma, index) => (
          <Reveal key={index} delay={index * 0.15}>
            <article className="norma-card">
              <div className="norma-header">
                <span className="norma-codigo">{norma.codigo}</span>
                <div className="norma-icon">{norma.icon}</div>
              </div>
              <h3>{norma.titulo}</h3>
              <p className="norma-descripcion">{norma.descripcion}</p>
              <ul className="norma-beneficios">
                {norma.beneficios.map((beneficio, i) => (
                  <li key={i}>{beneficio}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.4}>
        <div className="certificaciones-cta">
          <p>¿Tu empresa necesita certificarse o auditarse en alguna de estas normas?</p>
          <a href="#contacto" className="btn-primary">
            Solicitar Asesoría en Certificaciones
          </a>
        </div>
      </Reveal>

    </section>
  )
}
