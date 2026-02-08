import Reveal from '../components/Reveal'

export default function Contacto() {
  return (
    <section id="contacto" className="section section-contact">

      <Reveal>
        <header className="section-header">
          <span className="section-eyebrow">Contacto</span>
          <h2>Hablemos sobre la Seguridad de tu Empresa</h2>
          <p>
            Solicita una asesoría personalizada en prevención de riesgos
            y cumplimiento normativo.
          </p>
        </header>
      </Reveal>

      <div className="contact-grid">

        {/* INFO */}
        <Reveal delay={0.1}>
          <div className="contact-info">
            <h3>Asesoría Profesional</h3>
            <p>
              Te apoyamos en la implementación del <strong>DS 44</strong> y
              la <strong>Ley 16.744</strong>, adaptándonos a tu rubro
              y necesidades operacionales.
            </p>

            <ul className="contact-list">
              <li>✔ Diagnóstico inicial</li>
              <li>✔ Respuesta rápida</li>
              <li>✔ Atención personalizada</li>
            </ul>
          </div>
        </Reveal>

        {/* FORMULARIO */}
        <Reveal delay={0.2}>
          <form className="contact-form">
            <div className="form-group">
              <label>Nombre</label>
              <input type="text" placeholder="Tu nombre" required />
            </div>

            <div className="form-group">
              <label>Correo</label>
              <input type="email" placeholder="correo@empresa.cl" required />
            </div>

            <div className="form-group">
              <label>Empresa</label>
              <input type="text" placeholder="Nombre de la empresa" />
            </div>

            <div className="form-group">
              <label>Mensaje</label>
              <textarea
                rows="4"
                placeholder="Cuéntanos brevemente tu necesidad"
              ></textarea>
            </div>

            <button type="submit" className="btn-primary full">
              Solicitar asesoría
            </button>
          </form>
        </Reveal>

      </div>

    </section>
  )
}
