import { Sequence, useCurrentFrame, interpolate, staticFile, Img, AbsoluteFill } from 'remotion';

const WALKS = [
  {
    name: 'River North to home',
    date: 'May 9, 2026',
    img: 'walk_1.png',
    distance: '2.2 mi',
    duration: '36 min',
  },
  {
    name: 'Uptown to Lakeview to home',
    date: 'May 9, 2026',
    img: 'walk_2.png',
    distance: '5.9 mi',
    duration: '1 hr 37 min',
  },
  {
    name: 'Pilsen to home',
    date: 'May 6, 2026',
    img: 'walk_3.png',
    distance: '2.6 mi',
    duration: '44 min',
  },
];

const SLIDE_FRAMES = 150; // 5 seconds per slide
const FADE_FRAMES = 15;   // 0.5s fade in/out

function Slide({ name, date, img, distance, duration }) {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, FADE_FRAMES, SLIDE_FRAMES - FADE_FRAMES, SLIDE_FRAMES],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ opacity }}>
      <Img
        src={staticFile(img)}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <AbsoluteFill
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 48,
          left: 48,
          right: 48,
          color: '#fff',
          fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2 }}>{name}</div>
        <div style={{ fontSize: 22, opacity: 0.8, marginTop: 6 }}>{date}</div>
        <div style={{ display: 'flex', gap: 32, marginTop: 14 }}>
          <div>
            <div style={{ fontSize: 32, fontWeight: 700 }}>{distance}</div>
            <div style={{ fontSize: 16, opacity: 0.7, marginTop: 2, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Distance</div>
          </div>
          <div>
            <div style={{ fontSize: 32, fontWeight: 700 }}>{duration}</div>
            <div style={{ fontSize: 16, opacity: 0.7, marginTop: 2, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Moving time</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export function WalkSlideshow() {
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      {WALKS.map((walk, i) => (
        <Sequence key={walk.img} from={i * SLIDE_FRAMES} durationInFrames={SLIDE_FRAMES}>
          <Slide {...walk} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}
