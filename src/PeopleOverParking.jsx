import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence } from 'remotion';

const BLUE = '#003f88';
const RED = '#e63946';
const GREEN = '#2dc653';
const WHITE = '#ffffff';
const DARK = '#0d1218';

function useSpringIn(frame, fps, delay = 0, stiffness = 80) {
  return spring({ frame: frame - delay, fps, config: { stiffness, damping: 18, mass: 1 }, clamp: true });
}

function SlideIn({ frame, fps, delay, children }) {
  const progress = useSpringIn(frame, fps, delay);
  return (
    <div style={{
      opacity: progress,
      transform: `translateY(${interpolate(progress, [0, 1], [40, 0])}px)`,
    }}>
      {children}
    </div>
  );
}

// Section 1 — 90 frames (3s)
function TitleSection({ frame, fps }) {
  const titleProgress = useSpringIn(frame, fps, 10, 80);
  const subtitleProgress = useSpringIn(frame, fps, 22, 70);

  // Car drops off screen between frames 0–34
  const carOpacity = interpolate(frame, [0, 10, 22, 34], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const carY = interpolate(frame, [18, 36], [0, 180], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Replacement icons rise up after car drops
  const bikeP  = useSpringIn(frame, fps, 34, 90);
  const walkP  = useSpringIn(frame, fps, 43, 90);
  const houseP = useSpringIn(frame, fps, 53, 90);

  return (
    <AbsoluteFill style={{ background: DARK, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '0 60px' }}>
      {/* Animated icon area — car drops, replaced by bike/walk/house */}
      <div style={{ height: 160, marginBottom: 24, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        {/* Car drops away */}
        <div style={{ position: 'absolute', fontSize: 110, opacity: carOpacity, transform: `translateY(${carY}px)` }}>🚗</div>
        {/* Replacements rise up */}
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <div style={{ fontSize: 96, opacity: bikeP,  transform: `translateY(${interpolate(bikeP,  [0,1],[60,0])}px)` }}>🚴</div>
          <div style={{ fontSize: 96, opacity: walkP,  transform: `translateY(${interpolate(walkP,  [0,1],[60,0])}px)` }}>🚶</div>
          <div style={{ fontSize: 96, opacity: houseP, transform: `translateY(${interpolate(houseP, [0,1],[60,0])}px)` }}>🏘️</div>
        </div>
      </div>

      <div style={{ opacity: titleProgress, transform: `translateY(${interpolate(titleProgress, [0,1],[40,0])}px)`, fontFamily: "'Arial Black', sans-serif", fontSize: 90, fontWeight: 900, color: GREEN, textAlign: 'center', lineHeight: 1, textTransform: 'uppercase', letterSpacing: -1 }}>PEOPLE</div>
      <div style={{ opacity: titleProgress, fontFamily: 'Arial, sans-serif', fontSize: 36, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: 8, textTransform: 'uppercase', marginTop: 4, marginBottom: 4 }}>OVER</div>
      <div style={{ opacity: titleProgress, transform: `translateY(${interpolate(titleProgress, [0,1],[-40,0])}px)`, fontFamily: "'Arial Black', sans-serif", fontSize: 90, fontWeight: 900, color: RED, textAlign: 'center', lineHeight: 1, textTransform: 'uppercase', letterSpacing: -1 }}>PARKING</div>
      <div style={{ opacity: subtitleProgress, transform: `translateY(${interpolate(subtitleProgress, [0,1],[20,0])}px)`, marginTop: 40, fontFamily: 'Arial, sans-serif', fontSize: 28, fontWeight: 600, color: 'rgba(255,255,255,0.55)', letterSpacing: 3, textTransform: 'uppercase', textAlign: 'center' }}>Illinois Law</div>
    </AbsoluteFill>
  );
}

// Section 2 — 72 frames (2.4s)
function DateSection({ frame, fps }) {
  const bg = useSpringIn(frame, fps, 0, 100);
  const dateProgress = useSpringIn(frame, fps, 6, 80);
  const noteProgress = useSpringIn(frame, fps, 18, 60);

  return (
    <AbsoluteFill style={{ background: BLUE, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '0 60px', opacity: bg }}>
      <SlideIn frame={frame} fps={fps} delay={4}>
        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 28, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: 6, textTransform: 'uppercase', textAlign: 'center', marginBottom: 24 }}>Takes Effect</div>
      </SlideIn>
      <div style={{ opacity: dateProgress, transform: `scale(${interpolate(dateProgress, [0,1],[0.7,1])})`, fontFamily: "'Arial Black', sans-serif", fontSize: 96, fontWeight: 900, color: WHITE, textAlign: 'center', lineHeight: 1.1 }}>June 1,{'\n'}2026</div>
      <div style={{ opacity: noteProgress, transform: `translateY(${interpolate(noteProgress, [0,1],[20,0])}px)`, marginTop: 40, background: 'rgba(255,255,255,0.12)', borderRadius: 20, padding: '20px 36px', fontFamily: 'Arial, sans-serif', fontSize: 26, color: 'rgba(255,255,255,0.8)', textAlign: 'center', lineHeight: 1.5 }}>
        Statewide — Chicago metro,{'\n'}Metro East, Champaign-Urbana &amp; more
      </div>
    </AbsoluteFill>
  );
}

// Section 3 — 90 frames (3s)
function WhatIsItSection({ frame, fps }) {
  const bg = useSpringIn(frame, fps, 0, 100);
  const line1 = useSpringIn(frame, fps, 6, 70);
  const line2 = useSpringIn(frame, fps, 22, 70);
  const line3 = useSpringIn(frame, fps, 36, 70);

  return (
    <AbsoluteFill style={{ background: '#1a0a00', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '0 70px', gap: 28, opacity: bg }}>
      <div style={{ opacity: line1, transform: `translateY(${interpolate(line1,[0,1],[30,0])}px)`, fontFamily: 'Arial, sans-serif', fontSize: 30, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: 4, textTransform: 'uppercase', textAlign: 'center' }}>
        What it means
      </div>
      <div style={{ opacity: line2, transform: `translateY(${interpolate(line2,[0,1],[30,0])}px)`, fontFamily: "'Arial Black', sans-serif", fontSize: 62, fontWeight: 900, color: WHITE, textAlign: 'center', lineHeight: 1.2 }}>
        Illinois municipalities can no longer require parking
      </div>
      <div style={{ opacity: line3, transform: `translateY(${interpolate(line3,[0,1],[30,0])}px)`, fontFamily: "'Arial Black', sans-serif", fontSize: 62, fontWeight: 900, color: GREEN, textAlign: 'center', lineHeight: 1.2 }}>
        in areas near transit.
      </div>
    </AbsoluteFill>
  );
}

// Section 4 — 90 frames (3s)
function EligibilitySection({ frame, fps }) {
  const bg = useSpringIn(frame, fps, 0, 100);
  const items = [
    { delay: 10, icon: '🚊', label: 'within ½ mile', sub: 'of rail stations or\nhigh-frequency bus intersections' },
    { delay: 26, icon: '🚌', label: 'within ⅛ mile', sub: 'of frequent bus corridors' },
  ];

  return (
    <AbsoluteFill style={{ background: '#1a1a2e', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '0 60px', gap: 48, opacity: bg }}>
      <SlideIn frame={frame} fps={fps} delay={0}>
        <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: 46, fontWeight: 900, color: WHITE, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1 }}>
          Properties That Are Eligible
        </div>
      </SlideIn>
      {items.map(({ delay, icon, label, sub }) => {
        const p = useSpringIn(frame, fps, delay, 70);
        return (
          <div key={label} style={{ opacity: p, transform: `translateX(${interpolate(p, [0,1],[-50,0])}px)`, display: 'flex', alignItems: 'center', gap: 28, background: 'rgba(255,255,255,0.07)', borderRadius: 24, padding: '28px 40px', width: '100%', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: 64, lineHeight: 1 }}>{icon}</div>
            <div>
              <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: 44, fontWeight: 900, color: GREEN, lineHeight: 1 }}>{label}</div>
              <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 26, color: 'rgba(255,255,255,0.7)', lineHeight: 1.4, marginTop: 6, whiteSpace: 'pre-line' }}>{sub}</div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

// Section 5 — 108 frames (3.6s)
function BenefitsSection({ frame, fps }) {
  const bg = useSpringIn(frame, fps, 0, 100);
  const benefits = [
    { delay: 7,  icon: '🏘️', text: 'More housing near transit' },
    { delay: 22, icon: '💰', text: 'Lower construction costs' },
    { delay: 36, icon: '🚶', text: 'Walkable, people-first streets' },
    { delay: 50, icon: '🌿', text: 'Less land wasted on asphalt' },
  ];

  return (
    <AbsoluteFill style={{ background: '#0f2910', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '0 60px', gap: 36, opacity: bg }}>
      <SlideIn frame={frame} fps={fps} delay={0}>
        <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: 52, fontWeight: 900, color: GREEN, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Why It Matters</div>
      </SlideIn>
      {benefits.map(({ delay, icon, text }) => {
        const p = useSpringIn(frame, fps, delay, 65);
        return (
          <div key={text} style={{ opacity: p, transform: `translateY(${interpolate(p, [0,1],[30,0])}px)`, display: 'flex', alignItems: 'center', gap: 24, width: '100%' }}>
            <div style={{ fontSize: 56, lineHeight: 1, width: 72, textAlign: 'center', flexShrink: 0 }}>{icon}</div>
            <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 34, fontWeight: 700, color: WHITE, lineHeight: 1.3 }}>{text}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

// Section 6 — 90 frames (3s)
function EndCard({ frame, fps }) {
  const p = useSpringIn(frame, fps, 6, 70);
  return (
    <AbsoluteFill style={{ background: DARK, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '0 60px', gap: 32 }}>
      <div style={{ opacity: p, transform: `scale(${interpolate(p,[0,1],[0.8,1])})`, textAlign: 'center' }}>
        <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: 72, fontWeight: 900, color: GREEN, textTransform: 'uppercase', lineHeight: 1.1 }}>No more{'\n'}parking minimums</div>
        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 30, color: 'rgba(255,255,255,0.5)', marginTop: 24, lineHeight: 1.5 }}>near transit in Illinois{'\n'}starting June 1, 2026</div>
      </div>
    </AbsoluteFill>
  );
}

// Total: 90 + 72 + 90 + 90 + 108 + 90 = 540 frames = 18 seconds
const SECTIONS = [
  { from: 0,   duration: 90,  Component: TitleSection },
  { from: 90,  duration: 72,  Component: DateSection },
  { from: 162, duration: 90,  Component: WhatIsItSection },
  { from: 252, duration: 90,  Component: EligibilitySection },
  { from: 342, duration: 108, Component: BenefitsSection },
  { from: 450, duration: 90,  Component: EndCard },
];

export function PeopleOverParking() {
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
