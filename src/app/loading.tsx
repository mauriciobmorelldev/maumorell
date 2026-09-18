export default function Loading() {
  return <main className="route-skeleton" aria-busy="true" aria-label="Cargando contenido">
    <div className="skeleton-nav"><i/><i/></div>
    <div className="skeleton-hero"><div><i/><i/><i/></div><span/></div>
    <div className="skeleton-grid"><i/><i/></div>
  </main>;
}
