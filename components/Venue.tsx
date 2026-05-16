export default function Venue() {
  return (
    <section id="venue">
      <div className="venue-grid">
        <div className="venue-left">
          <span className="sec-label rev" style={{ ['--d' as string]: '0ms' }}>Venue</span>
          <div className="sec-title rev" style={{ ['--d' as string]: '40ms' }}>Experience</div>

          <div className="venue-items">

            <div className="venue-item rev" style={{ ['--d' as string]: '80ms' }}>
              <div className="vi-icon">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="4"/>
                  <line x1="12" y1="2" x2="12" y2="5"/>
                  <line x1="12" y1="19" x2="12" y2="22"/>
                  <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
                  <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
                  <line x1="2" y1="12" x2="5" y2="12"/>
                  <line x1="19" y1="12" x2="22" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
                  <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
                </svg>
              </div>
              <div className="vi-text">
                <div className="vi-title">Sun Sets Directly Behind the Stage</div>
                <div className="vi-desc">A breathtaking natural observatory every day.</div>
              </div>
            </div>

            <div className="venue-item rev" style={{ ['--d' as string]: '110ms' }}>
              <div className="vi-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M2 12c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"/>
                  <path d="M2 17c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"/>
                  <path d="M2 7c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"/>
                </svg>
              </div>
              <div className="vi-text">
                <div className="vi-title">Sea on Three Sides</div>
                <div className="vi-desc">500 Black Sea views and fresh sea breeze all day long.</div>
              </div>
            </div>

            <div className="venue-item rev" style={{ ['--d' as string]: '140ms' }}>
              <div className="vi-icon">
                <svg viewBox="0 0 24 24">
                  <rect x="4" y="3" width="3" height="18" rx="1"/>
                  <rect x="10.5" y="3" width="3" height="18" rx="1"/>
                  <rect x="17" y="3" width="3" height="18" rx="1"/>
                  <line x1="2" y1="3" x2="22" y2="3"/>
                  <line x1="2" y1="21" x2="22" y2="21"/>
                </svg>
              </div>
              <div className="vi-text">
                <div className="vi-title">3,000 Year Old Peninsula</div>
                <div className="vi-desc">Stepping onto ancient ground where history meets celebration.</div>
              </div>
            </div>

            <div className="venue-item rev" style={{ ['--d' as string]: '170ms' }}>
              <div className="vi-icon">
                <svg viewBox="0 0 24 24">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <div className="vi-text">
                <div className="vi-title">Boutique by Nature</div>
                <div className="vi-desc">Limited capacity, intimate vibe. 3,000 unforgettable moments.</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
