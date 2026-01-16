import React from 'react';
import './FallbackAnimation.css';

export default function FallbackAnimation() {
  return (
    <div className="fallback-animation">
      <div className="wave-layer wave-1"></div>
      <div className="wave-layer wave-2"></div>
      <div className="wave-layer wave-3"></div>
      <div className="gradient-overlay"></div>
    </div>
  );
}
