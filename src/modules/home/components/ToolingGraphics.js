// Static presentational graphics for the home Tooling section: a terminal for
// the Ketoy CLI and an install panel for Ketoy Skills. No client JS; the only
// motion is a CSS caret blink, disabled under prefers-reduced-motion.

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

const SKILL_FILES = ['catalog', 'capabilities', 'viewmodel-and-state', 'host-integration', 'troubleshooting', 'build-and-ship'];

export function SkillsGraphic() {
  return (
    <div className="skills-panel" aria-hidden="true">
      <div className="skills-head">
        <span className="skills-star">✦</span>
        <span>AI agent · ketoy skills</span>
      </div>

      <div className="skills-call">
        <span className="skills-tool">ketoy skills add</span>
      </div>

      <div className="skills-reply">
        <span className="ok">✓</span>
        <div>Installed to .claude/skills — catalog, capabilities, and every KetoyBC: fix.</div>
      </div>

      <div className="skills-tools">
        {SKILL_FILES.map((t) => (
          <span className="skills-chip" key={t}>{t}.md</span>
        ))}
      </div>
    </div>
  );
}
