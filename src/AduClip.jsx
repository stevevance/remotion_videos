import { AbsoluteFill, Audio, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

const SPEED = 1.1;
const t = (s) => s / SPEED;

// Timestamps relative to clip start (30:50 in original), scaled 1.1x faster
// End times extended to next caption's start to eliminate gaps that cause flashing
const CAPTIONS = [
  { start: t(0.64),  end: t(7.04),  text: "But it was important for me to talk about ADU as an easy way to give options," },
  { start: t(7.04),  end: t(9.38),  text: "to bring gentle density\nto our neighbors," },
  { start: t(9.38),  end: t(12.70), text: "and say that our experience\nin Lakeview has shown that it works." },
  { start: t(12.70), end: t(15.68), text: "You know, we're dense.\nWe've got real alleys\nthat are full of garbage" },
  { start: t(15.68), end: t(19.64), text: "and all the other things\nthat big, dense neighborhoods have." },
  { start: t(19.64), end: t(21.06), text: "But the coach houses\naren't a problem here." },
  { start: t(21.06), end: t(23.48), text: "We've got basements\nand attics forever." },
  { start: t(23.48), end: t(24.66), text: "Some are not so legal." },
  { start: t(24.66), end: t(26.04), text: "Lakeview's not unique\nto that, actually." },
  { start: t(26.04), end: t(29.20), text: "Some of my colleagues think they may have the most illegal conversions in this city." },
  { start: t(29.20), end: t(30.38), text: "And how do we address those?" },
  { start: t(30.38), end: t(33.46), text: "And how do we provide a pathway where you can't provide a parking space?" },
  { start: t(34.04), end: t(38.80), text: "To get over the parking on some of this\nwas one of the biggest hurdles." },
  { start: t(38.80), end: t(42.52), text: "You couldn't even legalize some of these things because you couldn't provide a parking space." },
  { start: t(42.52), end: t(48.98), text: "We've made that far easier now." },
];

function PulsingDot({ frame, fps }) {
  const scale = interpolate(
    Math.sin((frame / fps) * Math.PI * 2),
    [-1, 1], [0.8, 1.2]
  );
  return (
    <div style={{
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: '#e63946',
      transform: `scale(${scale})`,
      marginRight: 10,
    }} />
  );
}

export function AduClip() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentSec = frame / fps;

  const activeCaption = CAPTIONS.find(c => currentSec >= c.start && currentSec < c.end);

  return (
    <AbsoluteFill style={{ background: '#0d1b2a', flexDirection: 'column' }}>
      <Audio src={staticFile('adu-clip3-fast.mp3')} />

      {/* Photo — top ~45% of frame */}
      <Img
        src={staticFile('lawson.png')}
        style={{
          width: '100%',
          height: 860,
          objectFit: 'cover',
          objectPosition: 'center top',
          flexShrink: 0,
        }}
      />

      {/* Bottom section — dark, below the photo */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '40px 40px 60px',
        background: '#0d1b2a',
      }}>
        {/* Podcast label */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(230, 57, 70, 0.15)',
          border: '1px solid rgba(230, 57, 70, 0.4)',
          borderRadius: 40,
          padding: '10px 24px',
        }}>
          <PulsingDot frame={frame} fps={fps} />
          <span style={{
            color: '#e63946',
            fontFamily: 'Arial, sans-serif',
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}>
            Straight Up Chicago Investor
          </span>
        </div>

        {/* Caption — fixed height area so layout doesn't jump */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          minHeight: 300,
        }}>
          {activeCaption && (
            <div style={{
              fontFamily: "'Arial Black', 'Arial Bold', sans-serif",
              fontSize: 54,
              fontWeight: 900,
              color: '#ffffff',
              textAlign: 'center',
              lineHeight: 1.3,
              whiteSpace: 'pre-line',
            }}>
              {activeCaption.text}
            </div>
          )}
        </div>

        {/* Attribution */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            color: 'rgba(255,255,255,0.6)',
            fontFamily: 'Arial, sans-serif',
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 1,
          }}>
            Alderman Bennett Lawson
          </div>
          <div style={{
            color: 'rgba(255,255,255,0.35)',
            fontFamily: 'Arial, sans-serif',
            fontSize: 18,
            marginTop: 6,
          }}>
            44th Ward · Chicago
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}
