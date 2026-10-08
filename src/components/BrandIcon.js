// Official brand glyphs from Simple Icons (CC0). Named imports keep the
// bundle to just the icons used on the site.
import {
  siAndroid,
  siKotlin,
  siJetpackcompose,
  siGradle,
  siMaterialdesign,
  siApachemaven,
  siGithub,
  siDiscord,
  siClaude,
  siCursor,
  siWindsurf,
  siGooglegemini,
  siKtor,
  siSqlite,
  siGoogleplay,
} from 'simple-icons';

const ICONS = {
  android: siAndroid,
  kotlin: siKotlin,
  compose: siJetpackcompose,
  gradle: siGradle,
  material: siMaterialdesign,
  maven: siApachemaven,
  github: siGithub,
  discord: siDiscord,
  claude: siClaude,
  cursor: siCursor,
  windsurf: siWindsurf,
  gemini: siGooglegemini,
  ktor: siKtor,
  sqlite: siSqlite,
  googleplay: siGoogleplay,
};

/**
 * @param {object} props
 * @param {keyof typeof ICONS} props.name
 * @param {number} [props.size]
 * @param {boolean} [props.brand] - fill with the brand colour instead of currentColor
 */
export default function BrandIcon({ name, size = 18, brand = false, className, title }) {
  const icon = ICONS[name];
  if (!icon) return null;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={brand ? `#${icon.hex}` : 'currentColor'}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path d={icon.path} />
    </svg>
  );
}
