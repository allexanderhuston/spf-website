export default function Tickets() {
  return (
    <section id="tickets">
      <span className="sec-label rev" style={{ ['--d' as string]: '0ms' }}>Tickets</span>
      <div className="sec-title rev" style={{ ['--d' as string]: '40ms' }}>Passes</div>

      {/* iFrame placeholder — replace src with ticket provider URL when ready */}
      <div
        className="rev"
        style={{
          ['--d' as string]: '80ms',
          marginTop: '48px',
          width: '100%',
          minHeight: '600px',
          border: '1px solid rgba(232,229,222,.07)',
          borderRadius: '4px',
          background: 'rgba(255,255,255,.02)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Swap this div for <iframe src="..." width="100%" height="600" frameBorder="0" /> */}
        <p style={{
          fontFamily: 'var(--fb)',
          fontSize: '.65rem',
          fontWeight: 500,
          letterSpacing: '.2em',
          textTransform: 'uppercase',
          color: 'rgba(232,229,222,.2)',
        }}>
          Ticket checkout — coming soon
        </p>
      </div>

      <p className="passes-note rev" style={{ ['--d' as string]: '120ms' }}>Limited Spaces — Book Your Spot</p>
    </section>
  );
}
