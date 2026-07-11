import { ImageResponse } from 'next/og';

// Generated social card (1200x630), applied site-wide through the Next file
// convention. Correct dimensions + on-brand SDUI/OTA positioning for every
// share on Google, Slack, X, LinkedIn, etc.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Ketoy - Kotlin-native Server-Driven UI (SDUI) and OTA updates for Android';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0a',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* accent glow */}
        <div
          style={{
            position: 'absolute',
            top: -160,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: 'radial-gradient(closest-side, rgba(61,220,132,0.35), rgba(61,220,132,0))',
            display: 'flex',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: '#3DDC84',
              display: 'flex',
            }}
          />
          <div style={{ color: '#ffffff', fontSize: 40, fontWeight: 700 }}>Ketoy</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              color: '#ffffff',
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Kotlin-native Server-Driven UI
          </div>
          <div
            style={{
              color: '#3DDC84',
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            (SDUI) &amp; OTA for Android
          </div>
          <div style={{ color: '#b6b5b0', fontSize: 30, marginTop: 26, maxWidth: 900 }}>
            Write Jetpack Compose in Kotlin. Push UI changes over-the-air in seconds. No Play Store release.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, color: '#8a8a96', fontSize: 24 }}>
          <span>ketoy.dev</span>
          <span>·</span>
          <span>Kotlin SDUI</span>
          <span>·</span>
          <span>Android OTA</span>
        </div>
      </div>
    ),
    size,
  );
}
