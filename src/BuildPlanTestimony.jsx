import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence } from 'remotion';

const BLUE   = '#003f88';
const GOLD   = '#f7b731';
const RED    = '#c1121f';
const GREEN  = '#2dc653';
const WHITE  = '#ffffff';
const DARK   = '#0d1218';

function useSpringIn(frame, fps, delay = 0, stiffness = 80) {
  return spring({ frame: frame - delay, fps, config: { stiffness, damping: 18, mass: 1 }, clamp: true });
}

function SlideUp({ frame, fps, delay, stiffness = 70, children }) {
  const p = useSpringIn(frame, fps, delay, stiffness);
  return (
    <div style={{
      opacity: p,
      transform: `translateY(${interpolate(p, [0, 1], [40, 0])}px)`,
    }}>
      {children}
    </div>
  );
}

// Section 1 — 90 frames (3s): Title
function TitleSection({ frame, fps }) {
  const capP    = useSpringIn(frame, fps, 8,  90);
  const line1P  = useSpringIn(frame, fps, 20, 80);
  const line2P  = useSpringIn(frame, fps, 34, 75);
  const metaP   = useSpringIn(frame, fps, 50, 65);

  return (
    <AbsoluteFill style={{ background: DARK, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '0 64px', gap: 0 }}>
      {/* Capitol icon */}
      <div style={{ opacity: capP, transform: `scale(${interpolate(capP,[0,1],[0.6,1])})`, fontSize: 100, marginBottom: 24 }}>🏛️</div>

      {/* "I TESTIFIED" */}
      <div style={{ opacity: line1P, transform: `translateY(${interpolate(line1P,[0,1],[30,0])}px)`, fontFamily: "'Arial Black', sans-serif", fontSize: 88, fontWeight: 900, color: GREEN, textAlign: 'center', lineHeight: 1, textTransform: 'uppercase', letterSpacing: -1 }}>
        I TESTIFIED
      </div>

      {/* subtitle */}
      <div style={{ opacity: line2P, transform: `translateY(${interpolate(line2P,[0,1],[20,0])}px)`, fontFamily: 'Arial, sans-serif', fontSize: 34, fontWeight: 700, color: WHITE, textAlign: 'center', lineHeight: 1.4, marginTop: 20 }}>
        for the Illinois BUILD Plan
      </div>

      {/* meta */}
      <div style={{ opacity: metaP, transform: `translateY(${interpolate(metaP,[0,1],[16,0])}px)`, marginTop: 32, background: 'rgba(255,255,255,0.08)', borderRadius: 40, padding: '14px 32px', fontFamily: 'Arial, sans-serif', fontSize: 24, color: 'rgba(255,255,255,0.55)', letterSpacing: 2, textTransform: 'uppercase', textAlign: 'center' }}>
        May 6, 2026 · Springfield, IL
      </div>
    </AbsoluteFill>
  );
}

// Section 2 — 90 frames (3s): Housing shortage stat
function ShortageSection({ frame, fps }) {
  const bg    = useSpringIn(frame, fps, 0, 100);
  const labelP = useSpringIn(frame, fps, 6, 75);
  const numP  = useSpringIn(frame, fps, 18, 90);
  const subP  = useSpringIn(frame, fps, 34, 65);
  const srcP  = useSpringIn(frame, fps, 50, 55);

  return (
    <AbsoluteFill style={{ background: RED, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '0 64px', gap: 0, opacity: bg }}>
      <div style={{ opacity: labelP, fontFamily: 'Arial, sans-serif', fontSize: 30, fontWeight: 700, color: 'rgba(255,255,255,0.75)', letterSpacing: 5, textTransform: 'uppercase', textAlign: 'center', marginBottom: 16 }}>
        Illinois is
      </div>

      <div style={{ opacity: numP, transform: `scale(${interpolate(numP,[0,1],[0.75,1])})`, fontFamily: "'Arial Black', sans-serif", fontSize: 96, fontWeight: 900, color: WHITE, textAlign: 'center', lineHeight: 1 }}>
        142,000
      </div>

      <div style={{ opacity: numP, fontFamily: "'Arial Black', sans-serif", fontSize: 64, fontWeight: 900, color: GOLD, textAlign: 'center', lineHeight: 1.1, marginTop: 8 }}>
        HOMES SHORT
      </div>

      <div style={{ opacity: subP, transform: `translateY(${interpolate(subP,[0,1],[20,0])}px)`, marginTop: 28, fontFamily: 'Arial, sans-serif', fontSize: 28, color: 'rgba(255,255,255,0.8)', textAlign: 'center', lineHeight: 1.5 }}>
        We're building at insufficient rates{'\n'}while demand keeps growing.
      </div>

      <div style={{ opacity: srcP, marginTop: 32, fontFamily: 'Arial, sans-serif', fontSize: 20, color: 'rgba(255,255,255,0.45)', textAlign: 'center' }}>
        Source: Illinois Economic Policy Institute
      </div>
    </AbsoluteFill>
  );
}

// Section 3 — 90 frames (3s): Rental evidence
function EvidenceSection({ frame, fps }) {
  const bg     = useSpringIn(frame, fps, 0, 100);
  const labelP = useSpringIn(frame, fps, 6, 75);
  const rentP  = useSpringIn(frame, fps, 20, 90);
  const noteP  = useSpringIn(frame, fps, 36, 65);
  const explainP = useSpringIn(frame, fps, 52, 60);

  return (
    <AbsoluteFill style={{ background: '#1a1a2e', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '0 64px', gap: 0, opacity: bg }}>
      <div style={{ opacity: labelP, fontFamily: 'Arial, sans-serif', fontSize: 26, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: 4, textTransform: 'uppercase', textAlign: 'center', marginBottom: 20 }}>
        Real example from my testimony
      </div>

      {/* Apartment card */}
      <div style={{ opacity: rentP, transform: `translateY(${interpolate(rentP,[0,1],[30,0])}px)`, background: 'rgba(255,255,255,0.07)', border: `2px solid ${GOLD}`, borderRadius: 24, padding: '36px 48px', width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>🏠</div>
        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 26, color: 'rgba(255,255,255,0.65)', marginBottom: 8 }}>3-bedroom apartment · Evanston</div>
        <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: 80, fontWeight: 900, color: GOLD, lineHeight: 1 }}>$2,900</div>
        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 26, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>per month + excessive fees</div>
      </div>

      <div style={{ opacity: noteP, transform: `translateY(${interpolate(noteP,[0,1],[20,0])}px)`, marginTop: 28, fontFamily: "'Arial Black', sans-serif", fontSize: 34, fontWeight: 900, color: WHITE, textAlign: 'center', lineHeight: 1.3 }}>
        Landlords charge premium fees
      </div>

      <div style={{ opacity: explainP, transform: `translateY(${interpolate(explainP,[0,1],[16,0])}px)`, fontFamily: 'Arial, sans-serif', fontSize: 26, color: 'rgba(255,255,255,0.6)', textAlign: 'center', lineHeight: 1.5, marginTop: 8 }}>
        when renters have no other options.
      </div>
    </AbsoluteFill>
  );
}

// Section 4 — 90 frames (3s): Why state action?
function WhyStateSection({ frame, fps }) {
  const bg   = useSpringIn(frame, fps, 0, 100);
  const h1   = useSpringIn(frame, fps, 6, 80);
  const b1   = useSpringIn(frame, fps, 20, 70);
  const b2   = useSpringIn(frame, fps, 34, 70);
  const b3   = useSpringIn(frame, fps, 48, 70);

  const bullets = [
    { delay: 20, p: b1, icon: '🏘️', text: 'Local zoning is a regional market failure' },
    { delay: 34, p: b2, icon: '📉', text: 'When one town blocks housing, demand spills to neighbors' },
    { delay: 48, p: b3, icon: '🏛️', text: 'Only the state can set minimum housing standards' },
  ];

  return (
    <AbsoluteFill style={{ background: BLUE, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '0 64px', gap: 32, opacity: bg }}>
      <div style={{ opacity: h1, transform: `translateY(${interpolate(h1,[0,1],[30,0])}px)`, fontFamily: "'Arial Black', sans-serif", fontSize: 52, fontWeight: 900, color: WHITE, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1, lineHeight: 1.2 }}>
        Why State Action?
      </div>

      {bullets.map(({ delay, p, icon, text }) => (
        <div key={text} style={{ opacity: p, transform: `translateX(${interpolate(p,[0,1],[-50,0])}px)`, display: 'flex', alignItems: 'center', gap: 24, background: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: '24px 36px', width: '100%', border: '1px solid rgba(255,255,255,0.15)' }}>
          <div style={{ fontSize: 48, lineHeight: 1, flexShrink: 0 }}>{icon}</div>
          <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 28, fontWeight: 700, color: WHITE, lineHeight: 1.4 }}>{text}</div>
        </div>
      ))}
    </AbsoluteFill>
  );
}

// Section 5 — 90 frames (3s): BUILD Plan details
function BuildPlanSection({ frame, fps }) {
  const bg    = useSpringIn(frame, fps, 0, 100);
  const titleP = useSpringIn(frame, fps, 6, 85);
  const billP  = useSpringIn(frame, fps, 18, 70);
  const i1    = useSpringIn(frame, fps, 28, 65);
  const i2    = useSpringIn(frame, fps, 40, 65);
  const i3    = useSpringIn(frame, fps, 52, 65);

  const items = [
    { p: i1, icon: '🏗️', text: '$250 million for infrastructure' },
    { p: i2, icon: '🏡', text: 'Middle housing construction' },
    { p: i3, icon: '🔑', text: 'Down payment assistance' },
  ];

  return (
    <AbsoluteFill style={{ background: '#1a0f00', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '0 64px', gap: 24, opacity: bg }}>
      <div style={{ opacity: titleP, transform: `scale(${interpolate(titleP,[0,1],[0.8,1])})`, fontFamily: "'Arial Black', sans-serif", fontSize: 64, fontWeight: 900, color: GOLD, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 2, lineHeight: 1.1 }}>
        The BUILD Plan
      </div>

      <div style={{ opacity: billP, fontFamily: 'Arial, sans-serif', fontSize: 24, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: 3, textTransform: 'uppercase', textAlign: 'center' }}>
        HB5626 · Gov. Pritzker
      </div>

      {items.map(({ p, icon, text }) => (
        <div key={text} style={{ opacity: p, transform: `translateY(${interpolate(p,[0,1],[28,0])}px)`, display: 'flex', alignItems: 'center', gap: 24, background: 'rgba(247,183,49,0.1)', borderRadius: 20, padding: '22px 36px', width: '100%', border: `1px solid rgba(247,183,49,0.3)` }}>
          <div style={{ fontSize: 48, lineHeight: 1, flexShrink: 0 }}>{icon}</div>
          <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 30, fontWeight: 700, color: WHITE, lineHeight: 1.3 }}>{text}</div>
        </div>
      ))}
    </AbsoluteFill>
  );
}

// Section 6 — 90 frames (3s): End card
function EndCard({ frame, fps }) {
  const p    = useSpringIn(frame, fps, 6, 70);
  const subP = useSpringIn(frame, fps, 22, 60);
  const urlP = useSpringIn(frame, fps, 38, 55);

  return (
    <AbsoluteFill style={{ background: DARK, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '0 64px', gap: 28 }}>
      <div style={{ opacity: p, transform: `scale(${interpolate(p,[0,1],[0.8,1])})`, textAlign: 'center' }}>
        <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: 80, fontWeight: 900, color: GREEN, textTransform: 'uppercase', lineHeight: 1.1 }}>
          Illinois{'\n'}needs homes
        </div>
      </div>

      <div style={{ opacity: subP, transform: `translateY(${interpolate(subP,[0,1],[20,0])}px)`, textAlign: 'center', fontFamily: 'Arial, sans-serif', fontSize: 30, fontWeight: 700, color: WHITE, lineHeight: 1.5 }}>
        Support HB5626{'\n'}the BUILD Plan
      </div>

      <div style={{ opacity: urlP, transform: `translateY(${interpolate(urlP,[0,1],[16,0])}px)`, background: 'rgba(255,255,255,0.07)', borderRadius: 40, padding: '16px 40px', fontFamily: 'Arial, sans-serif', fontSize: 24, color: 'rgba(255,255,255,0.45)', letterSpacing: 1 }}>
        stevencanplan.com
      </div>
    </AbsoluteFill>
  );
}

// Total: 6 × 90 = 540 frames = 18 seconds
const SECTIONS = [
  { from: 0,   duration: 90, Component: TitleSection },
  { from: 90,  duration: 90, Component: ShortageSection },
  { from: 180, duration: 90, Component: EvidenceSection },
  { from: 270, duration: 90, Component: WhyStateSection },
  { from: 360, duration: 90, Component: BuildPlanSection },
  { from: 450, duration: 90, Component: EndCard },
];

export function BuildPlanTestimony() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: DARK }}>
      {SECTIONS.map(({ from, duration, Component }) => (
        <Sequence key={from} from={from} durationInFrames={duration}>
          <Component frame={frame - from} fps={fps} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}
