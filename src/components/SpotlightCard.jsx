import { useRef, memo } from 'react';
import './SpotlightCard.css';

/**
 * SpotlightCard — from reactbits.dev
 * A card component where a radial spotlight follows the mouse cursor.
 */
function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(59, 130, 246, 0.18)',
  style = {},
}) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--spotlight-x', `${x}px`);
    card.style.setProperty('--spotlight-y', `${y}px`);
    card.style.setProperty('--spotlight-color', spotlightColor);
  };

  const handleMouseEnter = () => {
    if (cardRef.current) {
      cardRef.current.style.setProperty('--spotlight-opacity', '1');
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.setProperty('--spotlight-opacity', '0');
    }
  };

  return (
    <div
      ref={cardRef}
      className={`spotlight-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      <div className="spotlight-card-glow" />
      <div className="spotlight-card-inner">{children}</div>
    </div>
  );
}

export default memo(SpotlightCard);
