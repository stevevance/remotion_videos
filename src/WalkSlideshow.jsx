import { Sequence, useCurrentFrame, interpolate, staticFile, Img, AbsoluteFill } from 'remotion';

const WALKS = [
  { name: 'River North to home', date: 'May 9, 2026', img: 'walk_1.png' },
  { name: 'Uptown to Lakeview to home', date: 'May 9, 2026', img: 'walk_2.png' },
  { name: 'Pilsen to home', date: 'May 6, 2026', img: 'walk_3.png' },
  { name: 'Walk in The Hague', date: 'Sep 10, 2024', img: 'walk_4.png' },
  { name: 'Openluchtmuseum, Arnhem', date: 'Sep 9, 2024', img: 'walk_5.png' },
];

const SLIDE_FRAMES = 150; // 5 seconds per slide
const FADE_FRAMES = 15;   // 0.5s fade in/out

function Slide({ name, date, img }) {
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
      {/* Dark gradient at bottom for label readability */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%)',
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
        <div style={{ fontSize: 24, opacity: 0.85, marginTop: 6 }}>{date}</div>
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
