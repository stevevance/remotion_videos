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

// Section 1 — 90 frames (3s): Housing shortage stat
function ShortageSection({ frame, fps }) {
  const bg     = useSpringIn(frame, fps, 0, 100);
  const labelP = useSpringIn(frame, fps, 6, 75);
  const numP   = useSpringIn(frame, fps, 16, 90);
  const shortP = useSpringIn(frame, fps, 26, 85);
  const subP   = useSpringIn(frame, fps, 40, 65);
  const srcP   = useSpringIn(frame, fps, 56, 55);

  return (
    <AbsoluteFill style={{ background: RED, alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'column', padding: '80px 48px', opacity: bg }}>
      <div style={{ opacity: labelP, fontFamily: 'Arial, sans-serif', fontSize: 72, fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: 6, textTransform: 'uppercase', textAlign: 'center' }}>
        Illinois is
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{ opacity: numP, transform: `scale(${interpolate(numP,[0,1],[0.75,1])})`, fontFamily: "'Arial Black', sans-serif", fontSize: 180, fontWeight: 900, color: WHITE, lineHeight: 0.95 }}>
          142,000
        </div>
        <div style={{ opacity: shortP, fontFamily: "'Arial Black', sans-serif", fontSize: 108, fontWeight: 900, color: GOLD, lineHeight: 1.1, marginTop: 16 }}>
          HOMES SHORT
        </div>
      </div>

      <div style={{ opacity: subP, transform: `translateY(${interpolate(subP,[0,1],[24,0])}px)`, fontFamily: 'Arial, sans-serif', fontSize: 52, color: 'rgba(255,255,255,0.9)', textAlign: 'center', lineHeight: 1.4 }}>
        We're building at insufficient rates while demand keeps growing.
      </div>

      <div style={{ opacity: srcP, fontFamily: 'Arial, sans-serif', fontSize: 34, color: 'rgba(255,255,255,0.45)', textAlign: 'center' }}>
        Source: Illinois Economic Policy Institute
      </div>
    </AbsoluteFill>
  );
}

// Section 2 — 150 frames (5s): Verbatim quote from testimony with heading + extra line
function QuoteSection({ frame, fps }) {
  const bg      = useSpringIn(frame, fps, 0, 100);
  const headP   = useSpringIn(frame, fps, 6, 80);
  const markP   = useSpringIn(frame, fps, 16, 90);
  const quoteP  = useSpringIn(frame, fps, 24, 60);
  const extraP  = useSpringIn(frame, fps, 70, 60);
  const attrP   = useSpringIn(frame, fps, 100, 55);

  return (
    <AbsoluteFill style={{ background: '#1a1a2e', alignItems: 'flex-start', justifyContent: 'space-evenly', flexDirection: 'column', padding: '60px 60px', opacity: bg }}>
      {/* Heading */}
      <div style={{ opacity: headP, transform: `translateY(${interpolate(headP,[0,1],[20,0])}px)`, fontFamily: "'Arial Black', sans-serif", fontSize: 56, fontWeight: 900, color: GOLD, textTransform: 'uppercase', letterSpacing: 2 }}>
        This is one of the symptoms
      </div>

      {/* Quote block */}
      <div style={{ width: '100%' }}>
        {/* Opening quote mark */}
        <div style={{ opacity: markP, fontFamily: 'Georgia, serif', fontSize: 160, color: 'rgba(247,183,49,0.5)', lineHeight: 0.5, marginBottom: 20 }}>
          "
        </div>

        {/* Main quote */}
        <div style={{ opacity: quoteP, transform: `translateY(${interpolate(quoteP,[0,1],[30,0])}px)`, fontFamily: 'Georgia, serif', fontSize: 54, color: WHITE, lineHeight: 1.45, textAlign: 'left' }}>
          A 3-bedroom apartment in Evanston was listed at $2,900 a month and advertised a move-in fee of 40% of the rent — $1,160 on top of the first month.
        </div>
      </div>

      {/* Extra line */}
      <div style={{ opacity: extraP, transform: `translateY(${interpolate(extraP,[0,1],[20,0])}px)`, fontFamily: "'Arial Black', sans-serif", fontSize: 52, fontWeight: 900, color: GOLD, lineHeight: 1.3, textAlign: 'left' }}>
        When the rent goes up, so will the move-in fee.
      </div>

      {/* Attribution */}
      <div style={{ opacity: attrP, transform: `translateY(${interpolate(attrP,[0,1],[16,0])}px)`, fontFamily: 'Arial, sans-serif', fontSize: 32, color: 'rgba(255,255,255,0.4)', alignSelf: 'flex-end', textAlign: 'right' }}>
        — Steven Vance, testimony to IL House · May 6, 2026
      </div>
    </AbsoluteFill>
  );
}

// Section 3 — 90 frames (3s): Why state action (two verbatim quotes)
function WhyStateSection({ frame, fps }) {
  const bg     = useSpringIn(frame, fps, 0, 100);
  const labelP = useSpringIn(frame, fps, 6, 80);
  const q1P    = useSpringIn(frame, fps, 18, 62);
  const q2P    = useSpringIn(frame, fps, 48, 62);

  return (
    <AbsoluteFill style={{ background: BLUE, alignItems: 'flex-start', justifyContent: 'space-evenly', flexDirection: 'column', padding: '60px 56px', opacity: bg }}>
      <div style={{ opacity: labelP, transform: `translateY(${interpolate(labelP,[0,1],[24,0])}px)`, fontFamily: "'Arial Black', sans-serif", fontSize: 72, fontWeight: 900, color: WHITE, textTransform: 'uppercase', letterSpacing: 1, lineHeight: 1.1 }}>
        Why state action?
      </div>

      {/* First verbatim quote */}
      <div style={{ opacity: q1P, transform: `translateY(${interpolate(q1P,[0,1],[28,0])}px)`, background: 'rgba(255,255,255,0.1)', borderRadius: 24, padding: '44px 48px', width: '100%', border: '1px solid rgba(255,255,255,0.2)', boxSizing: 'border-box' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 46, color: WHITE, lineHeight: 1.45 }}>
          "Housing markets are regional, but zoning is local. When a single municipality blocks new homes, it pushes demand elsewhere, raising prices across a region."
        </div>
      </div>

      {/* Second verbatim quote */}
      <div style={{ opacity: q2P, transform: `translateY(${interpolate(q2P,[0,1],[28,0])}px)`, background: 'rgba(255,255,255,0.1)', borderRadius: 24, padding: '44px 48px', width: '100%', border: '1px solid rgba(255,255,255,0.2)', boxSizing: 'border-box' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 46, color: WHITE, lineHeight: 1.45 }}>
          "The legislature has the right and responsibility to set a floor for allowing more housing when that local and disparate limitations produce statewide harm."
        </div>
      </div>
    </AbsoluteFill>
  );
}

// Section 4 — 90 frames (3s): BUILD Plan details
function BuildPlanSection({ frame, fps }) {
  const bg     = useSpringIn(frame, fps, 0, 100);
  const titleP = useSpringIn(frame, fps, 6, 85);
  const billP  = useSpringIn(frame, fps, 18, 70);
  const i1     = useSpringIn(frame, fps, 26, 65);
  const i2     = useSpringIn(frame, fps, 37, 65);
  const i3     = useSpringIn(frame, fps, 48, 65);
  const i4     = useSpringIn(frame, fps, 59, 65);

  const items = [
    { p: i1, icon: '💰', text: '$250 million capital investment' },
    { p: i2, icon: '🏡', text: 'Middle housing construction' },
    { p: i3, icon: '🏠', text: 'Accessory dwelling units (ADUs)' },
    { p: i4, icon: '🪜', text: 'Single-stair building reform' },
  ];

  return (
    <AbsoluteFill style={{ background: '#1a0f00', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'column', padding: '48px 56px', opacity: bg }}>
      <div style={{ opacity: titleP, transform: `scale(${interpolate(titleP,[0,1],[0.8,1])})`, fontFamily: "'Arial Black', sans-serif", fontSize: 96, fontWeight: 900, color: GOLD, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 2, lineHeight: 1 }}>
        The BUILD Plan
      </div>

      <div style={{ opacity: billP, fontFamily: 'Arial, sans-serif', fontSize: 40, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: 3, textTransform: 'uppercase', textAlign: 'center' }}>
        HB5626 · Rep. Buckner
      </div>

      {items.map(({ p, icon, text }) => (
        <div key={text} style={{ opacity: p, transform: `translateY(${interpolate(p,[0,1],[24,0])}px)`, display: 'flex', alignItems: 'center', gap: 32, background: 'rgba(247,183,49,0.1)', borderRadius: 24, padding: '28px 40px', width: '100%', border: `1px solid rgba(247,183,49,0.3)`, boxSizing: 'border-box' }}>
          <div style={{ fontSize: 64, lineHeight: 1, flexShrink: 0 }}>{icon}</div>
          <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 44, fontWeight: 700, color: WHITE, lineHeight: 1.2 }}>{text}</div>
        </div>
      ))}
    </AbsoluteFill>
  );
}

// Section 5 — 90 frames (3s): End card
function EndCard({ frame, fps }) {
  const headP = useSpringIn(frame, fps, 6, 70);
  const bodyP = useSpringIn(frame, fps, 22, 60);
  const urlP  = useSpringIn(frame, fps, 44, 55);

  return (
    <AbsoluteFill style={{ background: DARK, alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'column', padding: '80px 56px' }}>
      <div style={{ opacity: headP, transform: `scale(${interpolate(headP,[0,1],[0.8,1])})`, textAlign: 'center' }}>
        <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: 112, fontWeight: 900, color: GREEN, textTransform: 'uppercase', lineHeight: 1.05 }}>
          Illinois{'\n'}needs homes
        </div>
      </div>

      <div style={{ opacity: bodyP, transform: `translateY(${interpolate(bodyP,[0,1],[20,0])}px)`, textAlign: 'center', fontFamily: 'Arial, sans-serif', fontSize: 48, fontWeight: 600, color: WHITE, lineHeight: 1.45 }}>
        Go to buildforil.org to learn more about the plan and how to talk to your legislators about it.
      </div>

      <div style={{ opacity: urlP, transform: `translateY(${interpolate(urlP,[0,1],[16,0])}px)`, background: 'rgba(255,255,255,0.07)', borderRadius: 40, padding: '24px 64px', fontFamily: "'Arial Black', sans-serif", fontSize: 44, color: GREEN, letterSpacing: 1 }}>
        buildforil.org
      </div>
    </AbsoluteFill>
  );
}

// Total: 90 + 150 + 90 + 90 + 90 = 510 frames = 17 seconds
const SECTIONS = [
  { from: 0,   duration: 90,  Component: ShortageSection },
  { from: 90,  duration: 150, Component: QuoteSection },
  { from: 240, duration: 90,  Component: WhyStateSection },
  { from: 330, duration: 90,  Component: BuildPlanSection },
  { from: 420, duration: 90,  Component: EndCard },
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
