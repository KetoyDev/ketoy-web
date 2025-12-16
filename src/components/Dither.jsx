import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function DitherPlane({
  waveColor = [0.5, 0.5, 0.5],
  disableAnimation = false,
  enableMouseInteraction = true,
  mouse,
  mouseRadius = 0.3,
  colorNum = 4,
  waveAmplitude = 0.3,
  waveFrequency = 3,
  waveSpeed = 0.05
}) {
  const materialRef = useRef();
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWaveColor: { value: new THREE.Color().fromArray(waveColor) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseRadius: { value: mouseRadius },
      uColorNum: { value: colorNum },
      uWaveAmplitude: { value: waveAmplitude },
      uWaveFrequency: { value: waveFrequency },
      uWaveSpeed: { value: waveSpeed },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uEnableMouse: { value: enableMouseInteraction ? 1 : 0 },
      uDisableAnimation: { value: disableAnimation ? 1 : 0 }
    }),
    [waveColor, mouseRadius, colorNum, waveAmplitude, waveFrequency, waveSpeed, size, enableMouseInteraction, disableAnimation]
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      if (!disableAnimation) {
        materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      }
      if (mouse && enableMouseInteraction) {
        materialRef.current.uniforms.uMouse.value.set(mouse[0], mouse[1]);
      }
    }
  });

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uWaveColor;
    uniform vec2 uMouse;
    uniform float uMouseRadius;
    uniform float uColorNum;
    uniform float uWaveAmplitude;
    uniform float uWaveFrequency;
    uniform float uWaveSpeed;
    uniform vec2 uResolution;
    uniform float uEnableMouse;
    uniform float uDisableAnimation;

    float circle(vec2 uv, vec2 center, float radius) {
      return smoothstep(radius, radius - 0.2, distance(uv, center));
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / uResolution.xy;
      uv.y = 1.0 - uv.y;

      float t = uDisableAnimation > 0.5 ? 0.0 : uTime * uWaveSpeed;
      float wave = sin((uv.x + uv.y) * uWaveFrequency + t) * uWaveAmplitude;

      float d = 1.0;
      if (uEnableMouse > 0.5) {
        float m = circle(uv, uMouse, uMouseRadius);
        wave += m * 0.4;
      }

      float intensity = clamp(0.5 + wave, 0.0, 1.0);
      float levels = max(uColorNum, 2.0);
      float q = floor(intensity * levels) / (levels - 1.0);

      vec3 base = uWaveColor * (0.4 + q * 0.8);
      gl_FragColor = vec4(base, 1.0);
    }
  `;

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function Dither({
  waveColor = [0.5, 0.5, 0.5],
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 0.3,
  colorNum = 4,
  waveAmplitude = 0.3,
  waveFrequency = 3,
  waveSpeed = 0.05
}) {
  const mouseRef = React.useRef([0.5, 0.5]);

  const handlePointerMove = (e) => {
    const x = e.offsetX / e.currentTarget.clientWidth;
    const y = 1 - e.offsetY / e.currentTarget.clientHeight;
    mouseRef.current = [x, y];
  };

  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 1], fov: 45 }}
      onPointerMove={enableMouseInteraction ? handlePointerMove : undefined}
      style={{ position: 'absolute', inset: 0 }}
    >
      <DitherPlane
        waveColor={waveColor}
        disableAnimation={disableAnimation}
        enableMouseInteraction={enableMouseInteraction}
        mouse={mouseRef.current}
        mouseRadius={mouseRadius}
        colorNum={colorNum}
        waveAmplitude={waveAmplitude}
        waveFrequency={waveFrequency}
        waveSpeed={waveSpeed}
      />
    </Canvas>
  );
}
