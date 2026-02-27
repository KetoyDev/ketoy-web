import React, { useEffect, useRef, useState, useMemo } from 'react';

// GradualBlur — adapted from reactbits.dev/animations/gradual-blur
// Native Math used instead of mathjs dependency

const CURVE_FUNCTIONS = {
  linear: p => p,
  bezier: p => p * p * (3 - 2 * p),
  'ease-in': p => p * p,
  'ease-out': p => 1 - Math.pow(1 - p, 2),
  'ease-in-out': p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)
};

const getGradientDirection = position =>
  ({ top: 'to top', bottom: 'to bottom', left: 'to left', right: 'to right' })[position] || 'to bottom';

export default function GradualBlur({
  position = 'bottom',
  strength = 2,
  height = '6rem',
  width,
  divCount = 5,
  exponential = false,
  zIndex = 100,
  opacity = 1,
  curve = 'linear',
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);

  const blurDivs = useMemo(() => {
    const divs = [];
    const increment = 100 / divCount;
    const curveFunc = CURVE_FUNCTIONS[curve] || CURVE_FUNCTIONS.linear;

    for (let i = 1; i <= divCount; i++) {
      let progress = curveFunc(i / divCount);

      const blurValue = exponential
        ? Math.pow(2, progress * 4) * 0.0625 * strength
        : 0.0625 * (progress * divCount + 1) * strength;

      const r = v => Math.round(v * 10) / 10;
      const p1 = r((increment * i - increment));
      const p2 = r(increment * i);
      const p3 = r(increment * i + increment);
      const p4 = r(increment * i + increment * 2);

      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) gradient += `, black ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;

      const direction = getGradientDirection(position);
      divs.push(
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            maskImage: `linear-gradient(${direction}, ${gradient})`,
            WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
            backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            opacity
          }}
        />
      );
    }
    return divs;
  }, [position, strength, divCount, exponential, opacity, curve]);

  const isVertical = ['top', 'bottom'].includes(position);

  const containerStyle = {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex,
    [position]: 0,
    left: 0,
    right: 0,
    ...(isVertical
      ? { height, width: width || '100%' }
      : { width: width || height, height: '100%', top: 0, bottom: 0 }),
    ...style
  };

  return (
    <div ref={containerRef} className={`gradual-blur-root ${className}`} style={containerStyle}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {blurDivs}
      </div>
    </div>
  );
}
