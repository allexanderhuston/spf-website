export default function CTA() {
  return (
    <section id="cta">
      <div className="cta-fade-top"></div>
      <div className="cta-inner">

        <p className="cta-tag rev" style={{ ['--d' as string]: '0ms' }}>Pomorie Port · Bulgaria</p>

        <h2 className="cta-headline rev" style={{ ['--d' as string]: '80ms' }}>
          Don&apos;t Miss<br />The <span>Sunset</span>
        </h2>

        <div className="cta-divider rev" style={{ ['--d' as string]: '160ms' }}></div>

        <p className="cta-meta rev" style={{ ['--d' as string]: '200ms' }}>22 &amp; 23 August 2026</p>

        <div className="cta-actions rev" style={{ ['--d' as string]: '260ms' }}>
          <a href="https://sunsetfestival.bg" target="_blank" rel="noopener" className="btn-fill">Get Tickets</a>
          <a href="#lineup" className="btn-outline">View Lineup</a>
        </div>


      </div>
    </section>
  );
}
