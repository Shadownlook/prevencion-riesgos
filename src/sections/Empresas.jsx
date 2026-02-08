import Reveal from '../components/Reveal'
import azaLogo from '../assets/aza-logo.png'
import Crionlogo from '../assets/Cirion-logo.png'
import volcanlogo from '../assets/volcan-logo.png'
import mendez from '../assets/Mendes-Holler.png'
import astrad from '../assets/astad-logo.png'
import ufinet from '../assets/ufinet-logo.png'
import demarka from '../assets/demarka-logo.png'
import '../styles/empresas.css'

const clientes = [
  { nombre: 'Aza acero sostenible', sector: 'Industria', logo: azaLogo },
  { nombre: 'Cirion', sector: 'Datacenter', logo: Crionlogo },
  { nombre: 'Volcan', sector: 'Industria', logo: volcanlogo },
  { nombre: 'Méndez Holler', sector: 'Construccion', logo: mendez },
  { nombre: 'Ufinet', sector: 'Datacenter', logo: ufinet },
  { nombre: 'Demarka', sector: 'Industria', logo: demarka },
  { nombre: 'Astrad', sector: 'Industria', logo: astrad },

]

export default function Clientes() {
  return (
    <section id="empresas" className="section bg-soft">
      <div className="section-header">
        <h2>Empresas con las que he trabajado</h2>
        <p>
          Como <strong>Prevencionista de Riesgos Laborales independiente certificado</strong>, he tenido el privilegio 
          de asesorar a empresas destacadas, contribuyendo a ambientes laborales más seguros 
          y el cumplimiento normativo. <strong>Todas las evaluaciones, inspecciones y auditorías</strong> 
           son realizadas exclusivamente por el prevencionista certificado conforme al <strong>DS 44</strong> y <strong>Ley 16.744</strong>.
        </p>
      </div>

      <Reveal>
        <div className="clientes-showcase">
          <div className="clientes-logos-row">
            {clientes.map((cliente, index) => (
              <div key={index} className="cliente-logo-wrapper">
                <div className="cliente-logo">
                  {cliente.logo ? (
                    <img 
                      className="cliente-logo-img" 
                      src={cliente.logo} 
                      alt={`${cliente.nombre} logo`} 
                    />
                  ) : (
                    <span className="cliente-logo-fallback">{cliente.nombre.charAt(0)}</span>
                  )}
                </div>
                <span className="cliente-tooltip">{cliente.nombre}</span>
              </div>
            ))}
          </div>
          <div className="clientes-info">
            <p className="clientes-description">
              Mi experiencia abarca el sector industrial, 
              proporcionando asesoría personalizada en prevención de riesgos laborales.
            </p>
            <div className="clientes-stats">
              <div className="stat-item">
                <span className="stat-number">{clientes.length}</span>
                <span className="stat-label">Empresa</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4</span>
                <span className="stat-label">Sectores</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

