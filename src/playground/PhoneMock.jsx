import React, { useMemo } from 'react';
import UIRenderer from '../components/UIRenderer';

/**
 * Convert Android ARGB hex (#AARRGGBB) to CSS-compatible hex (#RRGGBB or #RRGGBBAA).
 */
function convertAndroidColor(color) {
  if (typeof color !== 'string') return color;
  const m = color.match(/^#([0-9a-fA-F]{2})([0-9a-fA-F]{6})$/);
  if (!m) return color;
  const alpha = m[1];
  const rgb = m[2];
  return alpha.toUpperCase() === 'FF' ? `#${rgb}` : `#${rgb}${alpha}`;
}

/**
 * Deep-walk a JSON UI tree and convert all Android-format colors to CSS hex.
 */
function convertColors(node) {
  if (!node || typeof node !== 'object') return node;
  const out = { ...node };
  if (out.props) {
    out.props = { ...out.props };
    for (const key of ['color', 'containerColor', 'iconColor']) {
      if (typeof out.props[key] === 'string') out.props[key] = convertAndroidColor(out.props[key]);
    }
    if (out.props.border) {
      out.props.border = { ...out.props.border };
      if (typeof out.props.border.color === 'string') out.props.border.color = convertAndroidColor(out.props.border.color);
    }
    if (out.props.modifier) {
      out.props.modifier = { ...out.props.modifier };
      if (typeof out.props.modifier.background === 'string') {
        out.props.modifier.background = convertAndroidColor(out.props.modifier.background);
      }
      if (out.props.modifier.gradient && out.props.modifier.gradient.colors) {
        out.props.modifier.gradient = {
          ...out.props.modifier.gradient,
          colors: out.props.modifier.gradient.colors.map(convertAndroidColor),
        };
      }
    }
  }
  if (Array.isArray(out.children)) {
    out.children = out.children.map(convertColors);
  }
  return out;
}

/**
 * Realistic Android phone mockup that renders Ketoy JSON inside the screen area.
 */
export default function PhoneMock({ jsonData, error }) {
  // Pre-process colors from Android ARGB → CSS hex
  const processedJSON = useMemo(() => jsonData ? convertColors(jsonData) : null, [jsonData]);

  return (
    <div className="phone-mock-wrapper">
      <div className="phone-mock">
        {/* Outer frame */}
        <div className="phone-frame">
          {/* Top bezel with camera */}
          <div className="phone-bezel-top">
            <div className="phone-camera" />
          </div>

          {/* Status bar */}
          <div className="phone-status-bar">
            <span className="phone-status-time">9:41</span>
            <div className="phone-status-icons">
              {/* Signal */}
              <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
                <rect x="0" y="6" width="2" height="4" rx="0.5" opacity="0.3"/>
                <rect x="3" y="4" width="2" height="6" rx="0.5" opacity="0.5"/>
                <rect x="6" y="2" width="2" height="8" rx="0.5" opacity="0.7"/>
                <rect x="9" y="0" width="2" height="10" rx="0.5"/>
              </svg>
              {/* WiFi */}
              <svg width="14" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
              </svg>
              {/* Battery */}
              <svg width="20" height="10" viewBox="0 0 25 12" fill="currentColor">
                <rect x="0" y="1" width="21" height="10" rx="2" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4"/>
                <rect x="1.5" y="2.5" width="14" height="7" rx="1" fill="currentColor" opacity="0.8"/>
                <rect x="22" y="3.5" width="2" height="5" rx="0.5" opacity="0.3"/>
              </svg>
            </div>
          </div>

          {/* Screen content area */}
          <div className="phone-screen">
            {error ? (
              <div className="phone-screen-error">
                <div className="phone-screen-error-icon">⚠️</div>
                <div className="phone-screen-error-title">Parse Error</div>
                <div className="phone-screen-error-msg">{error}</div>
              </div>
            ) : jsonData ? (
              <div className="phone-screen-content">
                <UIRenderer jsonData={processedJSON} />
              </div>
            ) : (
              <div className="phone-screen-empty">
                <div className="phone-screen-empty-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <path d="M3 9h18M9 21V9"/>
                  </svg>
                </div>
                <p>Write K-DSL code and press<br/><strong>Run</strong> to see your UI</p>
              </div>
            )}
          </div>

          {/* Android navigation bar */}
          <div className="phone-nav-bar">
            {/* Back */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            {/* Home */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="4"/>
            </svg>
            {/* Recent */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="4" y="4" width="16" height="16" rx="2"/>
            </svg>
          </div>

          {/* Bottom bezel */}
          <div className="phone-bezel-bottom" />
        </div>
      </div>
    </div>
  );
}
