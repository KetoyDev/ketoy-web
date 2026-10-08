// Ketoy brand mark - the "Compose" colourway: Android green, Google blue and
// an ink segment that flips with the theme (--logo-ink in site.css), so the
// mark stays legible on both light and dark surfaces.

const GREEN = [-40, -20, 0, 20, 40, 60, 80];
const BLUE = [100, 120, 140, 160, 180, 200];
const INK = [220, 240, 260, 280, 300];

// One shutter blade: a 50x120 bar whose inner edge follows the r=150 ring.
// Drawn as a path (not a mask) so several logos on a page never share ids.
const RAY = 'M-80 -240H-30V-146.97A150 150 0 0 0 -80 -126.89Z';

function Rays({ angles, fill }) {
  return angles.map((a) => <path key={a} d={RAY} fill={fill} transform={`rotate(${a})`} />);
}

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
      <Rays angles={GREEN} fill="#3DDC84" />
      <Rays angles={BLUE} fill="#4285F4" />
      <Rays angles={INK} fill="var(--logo-ink, #0B3A4F)" />
    </svg>
  );
}
