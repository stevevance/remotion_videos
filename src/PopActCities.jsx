import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence, Img, staticFile, Audio } from 'remotion';

const DARK_NAVY = '#1a1a2e';
const POP_GREEN = '#4caf50';
const WHITE = '#ffffff';
const SUBTEXT = '#b0bec5';

function useSpringIn(frame, fps, delay = 0, stiffness = 80) {
  return spring({ frame: frame - delay, fps, config: { stiffness, damping: 18, mass: 1 }, clamp: true });
}

// Illinois cities gaining parking flexibility on June 1, 2026
const CITIES = [
  {
    name: 'Schaumburg',
    subtitle: 'Woodfield Mall Area',
    image: 'pop-schaumburg.jpg',
    quote: 'Starting June 1, local homebuilders and businesses around Woodfield Mall gain the flexibility to decide how much parking their site actually needs — instead of following a wasteful, one-size-fits-all mandate.',
    stat: null,
  },
  {
    name: 'Glen Ellyn',
    subtitle: 'Metra Station Area',
    image: 'pop-glen-ellyn.jpg',
    quote: 'Glen Ellyn homebuilders and property owners will have the flexibility to build the homes their community needs — without wasting space on overbuilt parking lots.',
    stat: null,
  },
  {
    name: 'Springfield',
    subtitle: 'Illinois State Capital',
    image: 'pop-springfield.jpg',
    quote: 'Most of Springfield\'s neighborhoods can grow more affordably once wasteful, outdated parking mandates no longer block the homes and local businesses people need.',
    stat: null,
  },
  {
    name: 'Aurora',
    subtitle: 'Downtown',
    image: 'pop-aurora.jpg',
    quote: 'Downtown Aurora property owners and local businesses gain the flexibility to decide how much parking actually makes sense for their specific site and use.',
    stat: null,
  },
  {
    name: 'Pekin',
    subtitle: 'Downtown',
    image: 'pop-pekin.jpg',
    quote: 'Forcing every apartment to include 1.5 parking spaces adds cost and crowds out homes people need. Downtown Pekin gains parking flexibility on June 1.',
    stat: 'Wasteful mandate: 1.5 parking spaces required per apartment',
  },
  {
    name: 'Elburn',
    subtitle: 'Metra Station Area',
    image: 'pop-elburn.jpg',
    quote: 'Requiring 2 parking spaces per home — regardless of location or need — adds cost and wastes space that could go to more homes. Most of Elburn gains parking flexibility on June 1.',
    stat: 'Wasteful mandate: 2 spaces required per home',
  },
  {
    name: 'Elgin',
    subtitle: 'City Center',
    image: 'pop-elgin.jpg',
    quote: 'Elgin\'s mandate — 1 space per 500 sq ft of housing, minimum 2 — is among the most costly in Illinois. That wasteful rule ends for most of city center on June 1.',
    stat: 'Wasteful mandate: 1 space per 500 sq ft, minimum 2 per home',
  },
];

const INTRO_FRAMES = 150;
const CITY_FRAMES = 150;
const OUTRO_FRAMES = 90;
// Total: 150 + (7 × 150) + 90 = 1,290 frames = 43s at 30fps
const TOTAL_FRAMES = INTRO_FRAMES + CITIES.length * CITY_FRAMES + OUTRO_FRAMES;

// Intro: "People Over Parking — Illinois cities gaining development flexibility..."
function IntroSection({ frame, fps }) {
  const p1 = useSpringIn(frame, fps, 4, 80);
  const p2 = useSpringIn(frame, fps, 16, 80);
  const p3 = useSpringIn(frame, fps, 30, 60);
  const p4 = useSpringIn(frame, fps, 44, 65);

  return (
    <AbsoluteFill style={{ background: DARK_NAVY, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '0 70px' }}>
      <div style={{ opacity: p1, transform: `translateY(${interpolate(p1, [0, 1], [40, 0])}px)`, fontFamily: "'Arial Black', sans-serif", fontSize: 136, fontWeight: 900, color: POP_GREEN, textTransform: 'uppercase', letterSpacing: -3, textAlign: 'center', lineHeight: 1 }}>
        People
      </div>
      <div style={{ opacity: p1, fontFamily: 'Arial, sans-serif', fontSize: 48, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 10, textTransform: 'uppercase', textAlign: 'center', marginTop: 8, marginBottom: 8 }}>
        Over
      </div>
      <div style={{ opacity: p2, transform: `translateY(${interpolate(p2, [0, 1], [40, 0])}px)`, fontFamily: "'Arial Black', sans-serif", fontSize: 136, fontWeight: 900, color: WHITE, textTransform: 'uppercase', letterSpacing: -3, textAlign: 'center', lineHeight: 1 }}>
        Parking
      </div>
      <div style={{ opacity: p3, transform: `translateY(${interpolate(p3, [0, 1], [20, 0])}px)`, marginTop: 60, fontFamily: 'Arial, sans-serif', fontSize: 40, color: 'rgba(255,255,255,0.6)', textAlign: 'center', lineHeight: 1.5 }}>
        a review of selected Illinois communities gaining parking flexibility to build more homes and support local businesses
      </div>
      <div style={{ opacity: p4, transform: `scale(${interpolate(p4, [0, 1], [0.8, 1])})`, marginTop: 32, background: POP_GREEN, borderRadius: 50, padding: '18px 52px' }}>
        <span style={{ fontFamily: "'Arial Black', sans-serif", fontSize: 40, fontWeight: 900, color: DARK_NAVY, letterSpacing: 1 }}>June 1, 2026</span>
      </div>
      {/* City name chips — staggered entrance */}
      <div style={{ marginTop: 48, display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
        {CITIES.map((city, i) => {
          const p = useSpringIn(frame, fps, 56 + i * 7, 70);
          return (
            <div key={city.name} style={{ opacity: p, transform: `translateY(${interpolate(p, [0, 1], [16, 0])}px)`, background: 'rgba(76,175,80,0.12)', border: '1px solid rgba(76,175,80,0.4)', borderRadius: 40, padding: '12px 32px', fontFamily: 'Arial, sans-serif', fontSize: 34, fontWeight: 700, color: WHITE }}>
              {city.name}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

// One slide per city: map image on top, city name and quote below
function CitySlide({ frame, fps, city }) {
  const imgP   = useSpringIn(frame, fps, 0,  50);
  const nameP  = useSpringIn(frame, fps, 8,  70);
  const divP   = useSpringIn(frame, fps, 16, 65);
  const quoteP = useSpringIn(frame, fps, 24, 60);
  const statP  = useSpringIn(frame, fps, 36, 55);

  return (
    <AbsoluteFill style={{ background: DARK_NAVY, flexDirection: 'column' }}>
      {/* Map image — top 50% of frame */}
      <div style={{ height: '50%', background: '#0d111d', overflow: 'hidden', position: 'relative', opacity: imgP }}>
        <Img
          src={staticFile(city.image)}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
        {/* Fade edge into the text section below */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 90, background: `linear-gradient(to bottom, transparent, ${DARK_NAVY})` }} />
      </div>

      {/* Text — bottom 45% */}
      <div style={{ flex: 1, padding: '32px 60px 52px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
        {/* City name + subtitle */}
        <div style={{ opacity: nameP, transform: `translateY(${interpolate(nameP, [0, 1], [24, 0])}px)` }}>
          <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: 96, fontWeight: 900, color: WHITE, lineHeight: 1, letterSpacing: -2 }}>
            {city.name}
          </div>
          <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 34, color: POP_GREEN, fontWeight: 700, marginTop: 6, letterSpacing: 1, textTransform: 'uppercase' }}>
            {city.subtitle}
          </div>
        </div>

        {/* Divider bar */}
        <div style={{ opacity: divP, height: 3, background: 'rgba(76,175,80,0.3)', borderRadius: 2 }} />

        {/* Post quote */}
        <div style={{ opacity: quoteP, transform: `translateY(${interpolate(quoteP, [0, 1], [16, 0])}px)`, fontFamily: 'Arial, sans-serif', fontSize: 48, color: SUBTEXT, lineHeight: 1.45 }}>
          {city.quote}
        </div>

        {/* Current parking requirement stat (optional) */}
        {city.stat && (
          <div style={{ opacity: statP, transform: `translateY(${interpolate(statP, [0, 1], [12, 0])}px)`, background: 'rgba(76,175,80,0.1)', border: '1px solid rgba(76,175,80,0.28)', borderRadius: 14, padding: '16px 24px', fontFamily: 'Arial, sans-serif', fontSize: 42, color: POP_GREEN, lineHeight: 1.35 }}>
            {city.stat}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
}

// Outro: call to action with peopleoverparking.php URL
function OutroSection({ frame, fps }) {
  const p1 = useSpringIn(frame, fps, 4,  70);
  const p2 = useSpringIn(frame, fps, 18, 65);
  const p3 = useSpringIn(frame, fps, 32, 58);

  return (
    <AbsoluteFill style={{ background: DARK_NAVY, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '0 70px', gap: 36 }}>
      <div style={{ opacity: p1, transform: `scale(${interpolate(p1, [0, 1], [0.85, 1])})`, textAlign: 'center' }}>
        <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: 80, fontWeight: 900, color: POP_GREEN, textTransform: 'uppercase', lineHeight: 1.1 }}>
          Explore all cities
        </div>
      </div>
      <div style={{ opacity: p2, transform: `translateY(${interpolate(p2, [0, 1], [20, 0])}px)`, background: 'rgba(76,175,80,0.1)', border: '1px solid rgba(76,175,80,0.38)', borderRadius: 20, padding: '28px 48px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 38, color: WHITE, letterSpacing: 0.5 }}>
          chicagocityscape.com
        </div>
        <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: 34, color: POP_GREEN, marginTop: 6, letterSpacing: 1 }}>
          /peopleoverparking.php
        </div>
      </div>
      <div style={{ opacity: p3, transform: `translateY(${interpolate(p3, [0, 1], [16, 0])}px)`, fontFamily: 'Arial, sans-serif', fontSize: 32, color: 'rgba(255,255,255,0.42)', textAlign: 'center', lineHeight: 1.55 }}>
        See where parking flexibility is coming{'\n'}to Illinois communities on June 1, 2026
      </div>
    </AbsoluteFill>
  );
}

export function PopActCities() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: DARK_NAVY }}>
      <Audio
        src={staticFile('airtone_-_tokyoStreet.mp3')}
        startFrom={17 * 30}
        volume={(f) => interpolate(f, [TOTAL_FRAMES - 60, TOTAL_FRAMES], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
      />

      <Sequence from={0} durationInFrames={INTRO_FRAMES}>
        <IntroSection frame={frame} fps={fps} />
      </Sequence>

      {CITIES.map((city, i) => {
        const from = INTRO_FRAMES + i * CITY_FRAMES;
        return (
          <Sequence key={city.name} from={from} durationInFrames={CITY_FRAMES}>
            <CitySlide frame={frame - from} fps={fps} city={city} />
          </Sequence>
        );
      })}

      <Sequence from={INTRO_FRAMES + CITIES.length * CITY_FRAMES} durationInFrames={OUTRO_FRAMES}>
        <OutroSection frame={frame - (INTRO_FRAMES + CITIES.length * CITY_FRAMES)} fps={fps} />
      </Sequence>
    </AbsoluteFill>
  );
}
