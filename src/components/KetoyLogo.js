// Ketoy brand mark - a single-colour ring of shutter blades. The colour comes
// from --logo-ink (site.css / landing.css): white over dark surfaces, ink over
// light ones, so the mark stays legible in both themes.

const ANGLES = Array.from({ length: 18 }, (_, i) => -40 + i * 20);

// One shutter blade: a 50x120 bar whose inner edge follows the r=150 ring.
// Drawn as a path (not a mask) so several logos on a page never share ids.
const RAY = 'M-80 -240H-30V-146.97A150 150 0 0 0 -80 -126.89Z';

export default function KetoyLogo({ size = 28, className = '', title }) {
  return (
    <svg
      className={`ketoy-logo ${className}`}
      width={size}
      height={size}
      viewBox="-256 -256 512 512"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {ANGLES.map((a) => (
        <path key={a} d={RAY} fill="var(--logo-ink, #15121d)" transform={`rotate(${a})`} />
      ))}
    </svg>
  );
}
