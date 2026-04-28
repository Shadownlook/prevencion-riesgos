import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Reveal from '../components/Reveal'

import Inicio from '../sections/Inicio'
import Servicios from '../sections/Servicios'
import Normativa from '../sections/Normativa'
import Sectores from '../sections/Sectores'
import Metodologia from '../sections/Metodologia'
import Certificaciones from '../sections/Certificaciones'
import Portafolio from '../sections/Portafolio'
import Empresas from '../sections/Empresas'
import Nosotros from '../sections/Nosotros'
import ContactoForm from '../components/ContactoForm'

export default function Landing() {
  return (
    <>
      <Navbar />

      {/* HERO / INICIO */}
      <Reveal>
        <Inicio />
      </Reveal>

      {/* SERVICIOS */}
      <Reveal delay={0.1}>
        <Servicios />
      </Reveal>

      {/* NORMATIVA */}
      <Reveal delay={0.15}>
        <Normativa />
      </Reveal>

      {/* SECTORES */}
      <Reveal delay={0.2}>
        <Sectores />
      </Reveal>

      {/* METODOLOGÍA */}
      <Reveal delay={0.25}>
        <Metodologia />
      </Reveal>

      {/* CERTIFICACIONES ISO */}
      <Reveal delay={0.27}>
        <Certificaciones />
      </Reveal>

      {/* PORTAFOLIO */}
      <Reveal delay={0.3}>
        <Portafolio />
      </Reveal>

      {/* EMPRESAS */}
      <Reveal delay={0.32}>
        <Empresas />
      </Reveal>

      {/* NOSOTROS */}
      <Reveal delay={0.34}>
        <Nosotros />
      </Reveal>

      {/* CONTACTO / CTA */}
      <Reveal delay={0.36}>
        <ContactoForm />
      </Reveal>

      <Footer />
    </>
  )
}
