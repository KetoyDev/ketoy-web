import Link from 'next/link';
import Subnav from '@/components/Subnav';
import { subnavItems, stackRows, opcodeCards, perfRows } from '@/modules/architecture/data';

export const metadata = {
  title: 'Architecture · Ketoy',
  description:
    "How Ketoy turns a Kotlin file into bytecode on a CDN and a rendered Compose frame on a user's screen.",
};

export default function ArchitecturePage() {
  return (
    <>
      <Subnav items={subnavItems} />

      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Deep dive</span>
          <h1>Architecture</h1>
          <p className="lede">
            How Ketoy turns a Kotlin file into bytecode on a CDN and a rendered Compose frame on a user&rsquo;s screen — every stage of the pipeline, every guarantee at every layer.
          </p>
        </div>
      </section>

      <div className="page-body">
        <div className="container">

          <div id="overview" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 32 }}>
              <span className="eyebrow">Overview</span>
              <h2 style={{ marginTop: 8 }}>The five-layer stack</h2>
              <p>A high-level map of the pipeline. Each layer is independently versioned and forward-compatible.</p>
            </div>
            <div className="stack">
              {stackRows.map((row) => (
                <div key={row.lvl} className={`stack-row${row.accent ? ' accent' : ''}`}>
                  <span className="lvl">{row.lvl}</span>
                  <div>
                    <span className="name">{row.name}</span>
                    <span className="desc">{row.desc}</span>
                  </div>
                  <span className="meta">{row.meta}</span>
                </div>
              ))}
            </div>
          </div>

          <div id="compiler" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">02 · Compiler plugin</span>
              <h2 style={{ marginTop: 8 }}>K2 IR visitor</h2>
              <p>Walks the Kotlin IR, emits COMPOSABLE_CALL and CONSTRUCT_JVM instructions, resolves modifiers, snapshots closures.</p>
            </div>
            <div className="placeholder"><b>Placeholder — compiler internals</b>IR visitor walkthrough, named-arg modifier resolution, closure conversion algorithm, capability validator architecture, the six error categories.</div>
          </div>

          <div id="bytecode" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">03 · KBC bytecode</span>
              <h2 style={{ marginTop: 8 }}>104 opcodes across 6 categories</h2>
              <p>Register-based, purpose-built for Kotlin. Not JVM bytecode. Not DEX.</p>
            </div>
            <div className="cards-grid">
              {opcodeCards.map((c) => (
                <div key={c.h} className="card">
                  <div className="num">{c.num}</div>
                  <h3>{c.h}</h3>
                  <p>{c.p}</p>
                </div>
              ))}
            </div>
            <div className="placeholder" style={{ marginTop: 24 }}><b>Placeholder — opcode reference</b>Per-opcode operand layout, semantics, exception behavior, and a worked example for each category.</div>
          </div>

          <div id="bundle" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">04 · Bundle format</span>
              <h2 style={{ marginTop: 8 }}>.ktx wire format</h2>
              <p>Brotli-compressed, Ed25519-signed binary container. Format version 2, backward-compatible with v1.</p>
            </div>
            <div className="code-window" style={{ marginBottom: 24 }}>
              <div className="code-chrome">
                <div className="dots"><i></i><i></i><i></i></div>
                <span className="file">.ktx · binary layout</span>
              </div>
              <div className="code-body">
                <pre>
{``}<span className="tk-com">Header (14 bytes)</span>{`
├── magic:             `}<span className="tk-num">0x4B 0x54 0x4F 0x59</span>{`   `}<span className="tk-com">// "KTOY"</span>{`
├── formatVersion:     `}<span className="tk-num">2</span>{` bytes  `}<span className="tk-com">// current: 2, min: 1</span>{`
├── minRuntimeVersion: `}<span className="tk-num">2</span>{` bytes
├── flags:             `}<span className="tk-num">4</span>{` bytes  `}<span className="tk-com">// DEBUG_INFO_PRESENT, UNSIGNED</span>{`
└── sectionCount:      `}<span className="tk-num">2</span>{` bytes

`}<span className="tk-com">Sections (variable)</span>{`
├── STRING_POOL          `}<span className="tk-com">// interned, deduplicated</span>{`
├── ADAPTER_MANIFEST     `}<span className="tk-com">// composable adapter requirements</span>{`
├── CONSTRUCTOR_MANIFEST
├── CAPABILITY_MANIFEST
├── MODIFIER_TABLE       `}<span className="tk-com">// lazy-resolved modifier chains</span>{`
├── FUNCTION_TABLE       `}<span className="tk-com">// metadata + suspension + handlers</span>{`
├── CODE                 `}<span className="tk-com">// KBC instruction stream (Brotli)</span>{`
├── DEBUG_INFO           `}<span className="tk-com">// line numbers — debug builds</span>{`
├── BUNDLE_METADATA      `}<span className="tk-com">// IDs + descriptors</span>{`
└── ENTRY_POINTS         `}<span className="tk-com">// name → function index</span>{`

`}<span className="tk-com">Signature (64 bytes)</span>{`
└── Ed25519 over all preceding bytes`}
                </pre>
              </div>
            </div>
            <div className="placeholder"><b>Placeholder — section-by-section spec</b>Field widths, encoding (varint vs. fixed), padding rules, forward-compat strategy when adding sections in v3+.</div>
          </div>

          <div id="interpreter" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">05 · Interpreter &amp; JIT</span>
              <h2 style={{ marginTop: 8 }}>Register-based VM with on-device DEX JIT</h2>
              <p>Tier-1 JIT uses DexMaker to generate DEX from hot KBC functions — locally, at runtime, on API 26+.</p>
            </div>
            <div className="placeholder"><b>Placeholder — interpreter internals</b>Register file layout, continuation table, exception handler tables, hot-function detection, DexMaker integration, Tier-2 (planned) type-propagation register model.</div>
          </div>

          <div id="renderer" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">06 · Renderer</span>
              <h2 style={{ marginTop: 8 }}>KSP-generated typed adapters</h2>
              <p>Every Material3 component has a typed adapter that decodes a KBCParamSet and invokes the real Compose function. No reflection at the call site.</p>
            </div>
            <div className="placeholder"><b>Placeholder — adapter generation</b>How KSP scans the Compose classpath, the generated code shape, the two-layer parameter system end-to-end, registering app-specific adapters.</div>
          </div>

          <div id="security" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">07 · Security</span>
              <h2 style={{ marginTop: 8 }}>Sandbox at the boundary</h2>
              <p>Ed25519 signatures, the compile-time capability sandbox, and Play Store compliance — three independent guarantees.</p>
            </div>
            <div className="placeholder"><b>Placeholder — security deep dive</b>Threat model, signing key rotation, sandbox enforcement points (compile, link, runtime), why on-device DEX-from-bytecode is compliant under DPA.</div>
          </div>

          <div id="performance">
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">08 · Performance</span>
              <h2 style={{ marginTop: 8 }}>Targets and measurements</h2>
              <p>Everything in this table is a target the runtime hits today on mid-range Android hardware (API 26+).</p>
            </div>

            <div className="feat-list">
              {perfRows.map((r) => (
                <div key={r.cat} className="feat-row">
                  <div className="cat">
                    {r.cat}
                    <small>{r.small}</small>
                  </div>
                  <div className="items">
                    {r.chips.map((c) => (
                      <span key={c} className="chip">{c}</span>
                    ))}
                  </div>
                  <span className="count">{r.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="cta-banner" style={{ marginTop: 88 }}>
            <div>
              <h2>Want the implementation details?</h2>
              <p>Source is on Maven Central. The docs cover compiler internals, bytecode opcodes, and bundle format with worked examples.</p>
            </div>
            <div className="right">
              <Link className="btn btn-ghost" href="/docs">Read the docs</Link>
              <Link className="btn btn-primary" href="/get-started">Get started</Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
