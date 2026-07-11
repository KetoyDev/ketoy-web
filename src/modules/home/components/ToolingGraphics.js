// Static presentational graphics for the home Tooling section: a terminal for
// the Ketoy CLI and an agent tool-call panel for the Ketoy MCP. No client JS;
// the only motion is a CSS caret blink, disabled under prefers-reduced-motion.

export function CliGraphic() {
  return (
    <div className="cli-term" aria-hidden="true">
      <div className="cli-chrome">
        <span className="cli-dot r"></span>
        <span className="cli-dot y"></span>
        <span className="cli-dot g"></span>
        <span className="cli-title">ketoy</span>
      </div>
      <div className="cli-body">
        <div className="cli-line"><span className="p">$</span> ketoy init</div>
        <div className="cli-out"><span className="ok">✓</span> Gradle plugin added</div>
        <div className="cli-out"><span className="ok">✓</span> Ed25519 key generated</div>
        <div className="cli-out"><span className="ok">✓</span> HomeScreen.kt created</div>

        <div className="cli-line sp"><span className="p">$</span> ketoy push ktx my-app main.ktx --version 7</div>
        <div className="cli-out"><span className="ok">✓</span> Uploaded. Live in <b>1.2s</b></div>

        <div className="cli-line sp"><span className="p">$</span> ketoy ktx rollback my-app<span className="cli-cur"></span></div>
      </div>
    </div>
  );
}

const MCP_TOOLS = ['check_support', 'validate', 'capabilities', 'viewmodel', 'debug', 'cli'];

export function McpGraphic() {
  return (
    <div className="mcp-panel" aria-hidden="true">
      <div className="mcp-head">
        <span className="mcp-star">✦</span>
        <span>AI agent · ketoy mcp</span>
      </div>

      <div className="mcp-call">
        <span className="mcp-tool">ketoy_check_support</span>
        <span className="mcp-arg">&ldquo;LazyVerticalGrid&rdquo;</span>
      </div>

      <div className="mcp-reply">
        <span className="ok">✓</span>
        <div>Supported through the Foundation adapter. Every parameter wired.</div>
      </div>

      <div className="mcp-tools">
        {MCP_TOOLS.map((t) => (
          <span className="mcp-chip" key={t}>ketoy_{t}</span>
        ))}
      </div>
    </div>
  );
}
