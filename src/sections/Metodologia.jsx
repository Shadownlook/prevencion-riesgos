import Reveal from '../components/Reveal'

export default function Metodologia() {
  return (
    <section id="metodologia" className="section bg-soft">
      
      {/* TÍTULO */}
      <Reveal>
        <h2>Nuestra Metodología de Trabajo</h2>
      </Reveal>

      {/* DESCRIPCIÓN */}
      <Reveal delay={0.15}>
        <p style={{ maxWidth: '720px', margin: '0 auto 60px', textAlign: 'center' }}>
          Como <strong>Prevencionista de Riesgos Laborales certificado</strong>, aplico un enfoque sistemático
          y profesional en todas las actividades de prevención. <strong>Únicamente el prevencionista autorizado</strong>
          realiza la identificación de peligros, evaluación de riesgos y diseño de controles,
          asegurando el cumplimiento normativo conforme al <strong>Decreto Supremo 44</strong> y la <strong>Ley 16.744</strong>.
        </p>
      </Reveal>

      {/* PASOS */}
      <ol className="steps">
        {[
          {
            title: 'Diagnóstico Inicial',
            text: 'El prevencionista de riesgos realiza la evaluación del nivel de cumplimiento legal y condiciones de seguridad existentes.'
          },
          {
            title: 'Identificación de Peligros',
            text: 'Únicamente el prevencionista autorizado procede a la detección sistemática de peligros críticos asociados a procesos y tareas.'
          },
          {
            title: 'Evaluación de Riesgos',
            text: 'El prevencionista certificado ejecuta el análisis de probabilidad y severidad para priorización efectiva.'
          },
          {
            title: 'Control y Seguimiento',
            text: 'Esta actividad es ejecutada por el prevencionista de riesgos: implementación de medidas preventivas y verificación de su eficacia.'
          },
          {
            title: 'Mejora Continua',
            text: 'El prevencionista realiza monitoreo permanente y ajustes para fortalecer el sistema de gestión de seguridad.'
          }
        ].map((step, index) => (
          <Reveal key={index} delay={index * 0.15}>
            <li>
              <strong>{step.title}:</strong> {step.text}
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
