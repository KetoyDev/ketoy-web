import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import PhoneMock from './PhoneMock';
import { parseDSL, dslToJSON } from './dslParser';
import { SAMPLE_CARD } from './samples';
import useSEO from '../hooks/useSEO';
import './PlaygroundPage.css';

export default function PlaygroundPage() {
  useSEO({
    title: 'Playground — Ketoy SDUI Editor',
    description: 'Try the Ketoy Server-Driven UI playground. Write K-DSL and preview Jetpack Compose components live in the browser.',
    path: '/playground',
  })
  const [code, setCode] = useState(SAMPLE_CARD);
  const [parsedJSON, setParsedJSON] = useState(null);
  const [parseError, setParseError] = useState(null);
  const [activeTab, setActiveTab] = useState('editor'); // editor | json
  const [showJSON, setShowJSON] = useState(false);
  const debounceRef = useRef(null);

  // Parse and render
  const runCode = useCallback(() => {
    const { json, error } = parseDSL(code);
    if (error) {
      setParseError(error);
      setParsedJSON(null);
    } else {
      setParseError(null);
      setParsedJSON(json);
    }
  }, [code]);

  // Auto-run on code change (debounced 600ms)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      runCode();
    }, 600);
    return () => clearTimeout(debounceRef.current);
  }, [code, runCode]);

  // Run on initial mount
  useEffect(() => { runCode(); }, []); // eslint-disable-line

  // JSON output string
  const jsonOutput = parsedJSON ? JSON.stringify(parsedJSON, null, 2) : '';

  // Component count
  const countNodes = useCallback((node) => {
    if (!node) return 0;
    let c = 1;
    if (node.children) node.children.forEach(ch => { c += countNodes(ch); });
    return c;
  }, []);
  const componentCount = useMemo(() => parsedJSON ? countNodes(parsedJSON) : 0, [parsedJSON, countNodes]);

  return (
    <div className="pg-root">
      {/* ── Header ── */}
      <header className="pg-header">
        <div className="pg-header-left">
          <Link to="/" className="pg-logo">
            <img src="/ketoy-logo.svg" alt="Ketoy" width="24" height="24" />
            <span>Ketoy</span>
          </Link>
          <div className="pg-header-sep" />
          <span className="pg-header-title">Playground</span>
        </div>

        <div className="pg-header-right">
          <Link to="/" className="pg-home-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            Home
          </Link>
        </div>
      </header>

      {/* ── Main Split Pane ── */}
      <main className="pg-main">
        {/* Left Panel: Code Editor */}
        <div className="pg-panel-left">
          {/* Editor tab bar */}
          <div className="pg-editor-tabs">
            <button
              className={`pg-tab ${activeTab === 'editor' ? 'active' : ''}`}
              onClick={() => setActiveTab('editor')}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
              main.kt
            </button>
            <button
              className={`pg-tab ${activeTab === 'json' ? 'active' : ''}`}
              onClick={() => setActiveTab('json')}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
              wire preview
            </button>
            <div className="pg-tab-spacer" />
            <div className="pg-tab-info">
              {parseError ? (
                <span className="pg-tab-error">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#3b82f6' }}>
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                  Error
                </span>
              ) : (
                <span className="pg-tab-ok">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#3b82f6' }}>
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                  {componentCount} components
                </span>
              )}
            </div>
          </div>

          {/* Editor / Wire preview content */}
          <div className="pg-editor-area">
            {activeTab === 'editor' ? (
              <CodeEditor code={code} onChange={setCode} onRun={runCode} />
            ) : (
              <div className="pg-json-viewer">
                {parseError ? (
                  <pre>{`// Error: ${parseError}`}</pre>
                ) : parsedJSON ? (
                  <>
                    <pre style={{ color: 'rgba(16,185,129,0.9)', marginBottom: '1rem' }}>{`// .ktw wire format — compiled from K-DSL
// In production this is a binary blob (MessagePack + Gzip)
// ~10× smaller than the equivalent JSON payload
//
// Estimated sizes for this screen:
//   JSON:  ~${Math.round(JSON.stringify(parsedJSON).length / 1024 * 10) / 10} KB
//   .ktw:  ~${Math.max(1, Math.round(JSON.stringify(parsedJSON).length / 10240 * 10) / 10)} KB  (key-aliased → MessagePack → Gzip)
//
// The SDK auto-detects wire vs JSON by magic bytes — no config needed.
// Raw node tree (for playground inspection):`}</pre>
                    <pre>{jsonOutput}</pre>
                  </>
                ) : (
                  <pre>{'// No output'}</pre>
                )}
              </div>
            )}
          </div>

          {/* Error bar */}
          {parseError && (
            <div className="pg-error-bar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{parseError}</span>
            </div>
          )}
        </div>

        {/* Right Panel: Phone Mock */}
        <div className="pg-panel-right">
          <PhoneMock jsonData={parsedJSON} error={parseError} />
        </div>
      </main>

      {/* ── Status Bar ── */}
      <footer className="pg-status-bar">
        <div className="pg-status-left">
          <span>K-DSL</span>
          <span className="pg-status-sep">|</span>
          <span>{code.split('\n').length} lines</span>
        </div>
        <div className="pg-status-center">
          <span className="pg-status-hint">⌘S / Ctrl+S to run</span>
        </div>
        <div className="pg-status-right">
          <span className={parseError ? 'pg-status-err' : 'pg-status-ok'}>
            {parseError ? 'Parse Error' : 'Ready'}
          </span>
        </div>
      </footer>
    </div>
  );
}
