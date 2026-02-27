import React, { useEffect, useRef } from 'react';

export default function HeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    // Floating orbs with gentle movement
    const orbs = [
      { x: 0.25, y: 0.3, r: 280, color: 'rgba(37, 99, 235, 0.08)', speed: 0.0003, phase: 0 },
      { x: 0.7, y: 0.5, r: 220, color: 'rgba(59, 130, 246, 0.06)', speed: 0.0005, phase: 1.5 },
      { x: 0.5, y: 0.2, r: 340, color: 'rgba(37, 99, 235, 0.05)', speed: 0.0002, phase: 3 },
      { x: 0.8, y: 0.7, r: 180, color: 'rgba(99, 102, 241, 0.06)', speed: 0.0004, phase: 4 },
      { x: 0.15, y: 0.75, r: 200, color: 'rgba(59, 130, 246, 0.04)', speed: 0.0006, phase: 2 },
    ];

    // Grid dots
    const dotSpacing = 48;
    const dotRadius = 0.6;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Draw subtle grid dots
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      for (let x = dotSpacing; x < w; x += dotSpacing) {
        for (let y = dotSpacing; y < h; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw orbs
      orbs.forEach(orb => {
        const cx = w * orb.x + Math.sin(time * orb.speed * 2000 + orb.phase) * 40;
        const cy = h * orb.y + Math.cos(time * orb.speed * 1500 + orb.phase) * 30;
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, orb.r);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Subtle flowing lines (like circuit traces)
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.04)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        const startX = w * (0.1 + i * 0.2);
        const startY = 0;
        ctx.moveTo(startX, startY);
        for (let y = 0; y < h; y += 20) {
          const offset = Math.sin((y + time * 0.3 + i * 200) * 0.005) * 25;
          ctx.lineTo(startX + offset, y);
        }
        ctx.stroke();
      }

      time++;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
