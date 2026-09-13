import {Activity, Layers3, Workflow} from 'lucide-react';

export function MagentoExperience(){
  return <section className="magento-experience" aria-labelledby="magento-work"><span className="eyebrow">TRABAJO SOBRE OPERACIONES REALES</span><h2 id="magento-work">Entender la plataforma.<br/>Hacer que avance.</h2><div className="magento-work-grid">
    <article><Activity size={27}/><h3>Rendimiento y diagnóstico</h3><p>Lectura de transacciones y tiempos de respuesta en New Relic. Revisión de procesos programados e indexación para investigar degradaciones de rendimiento con evidencia.</p></article>
    <article><Workflow size={27}/><h3>Scripts e integraciones</h3><p>Revisión de scripts de terceros y configuraciones de Adobe Commerce. Atención a su alcance por tienda y a la validación de lo que realmente carga en el navegador.</p></article>
    <article><Layers3 size={27}/><h3>Evolución de la operación</h3><p>Priorización de mejoras sobre una plataforma existente, considerando la experiencia del cliente, las dependencias técnicas y la continuidad del negocio.</p></article>
  </div></section>;
}
