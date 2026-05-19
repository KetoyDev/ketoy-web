// Ketoy — updates card drawer
// Opens a slide-in detail panel when an update card is clicked.
// Version constants — keep in sync with src/constants.js
var KETOY_SDK_VERSION = '0.3.3';
var KETOY_SDK_VERSION_SHORT = '0.3';
var KETOY_SDK_PRERELEASE = 'alpha';
var KETOY_SDK_VERSION_FULL = KETOY_SDK_VERSION + '-' + KETOY_SDK_PRERELEASE;

(function () {
  var UPDATES = {
    'ai-tool': {
      title: 'Ketoy AI: one-tool ops for builds, bundles and rollouts',
      chip: 'Coming soon',
      chipClass: 'uchip-coming',
      date: 'May 14, 2026',
      tag: 'Preview · Q3 2026',
      body: [
        'A coming-soon AI assistant that handles Gradle, bundles, exports and cloud pushes from one command. Generates <code>build.gradle.kts</code> changes, runs <code>ketoyBundle</code>, signs and pushes to your CDN.',
        'The assistant understands your project structure, suggests optimal bundle splits, and can roll back to the previous signed bundle in one step.',
        '<strong>Status:</strong> Preview — sign up on the waitlist from the dashboard. Targeting public beta in Q3 2026.'
      ]
    },
    'edge-cdn': {
      title: 'Edge bundle delivery on Ketoy Cloud',
      chip: 'Stable',
      chipClass: 'uchip-stable',
      date: 'May 6, 2026',
      tag: 'Cloud · v1.2',
      body: [
        'Signed <code>.ktx</code> bundles now distribute through 38 points of presence with automatic Brotli negotiation. Median cold-fetch dropped from 240 ms to 78 ms in APAC.',
        'Bundles are immutable and content-addressed — the CDN layer verifies the signature before serving, so tampered payloads are rejected at the edge.',
        'No SDK changes required; existing apps pick up the lower latency automatically on their next bundle fetch.'
      ]
    },
    'dev-overlay-v2': {
      title: 'Dev Overlay v2: live KBC inspector & opcode profiler',
      chip: 'Beta',
      chipClass: 'uchip-beta',
      date: 'April 22, 2026',
      tag: '0.4.0-beta',
      body: [
        'Inspect the running bundle, step through KBC instructions and see per-opcode timings overlaid on your app. Adds a Compose slot-table view and a capability log.',
        'The opcode profiler highlights hotspots — instructions consuming more than 2 ms of frame time are flagged in red. Tap any row to see the originating DSL call site.',
        '<strong>To enable:</strong> add <code>ketoy { devtools { overlay = true } }</code> to your <code>build.gradle.kts</code> and build a debug APK.'
      ]
    },
    'fontfamily': {
      title: 'Custom fonts with FontFamily()',
      chip: 'Stable',
      chipClass: 'uchip-stable',
      date: 'May 10, 2026',
      tag: 'SDK · ' + KETOY_SDK_VERSION,
      body: [
        'Reference any font in <code>res/font/</code> directly from a Ketoy bundle — no asset registry, no manual loader. Adds two KBC constructors: <code>FONT</code> and <code>FONT_FAMILY</code>.',
        'Supports system fonts, downloaded fonts, and variable-font axes. Weight and style axes are mapped to Compose <code>FontWeight</code> and <code>FontStyle</code> automatically.',
        'Upgrade to SDK ' + KETOY_SDK_VERSION + ' to get access. No <code>Ketoy.initialize()</code> changes needed.'
      ]
    },
    'image-painter': {
      title: 'Image() with painterResource & imageVector',
      chip: 'Stable',
      chipClass: 'uchip-stable',
      date: 'May 10, 2026',
      tag: 'SDK · ' + KETOY_SDK_VERSION,
      body: [
        'Render drawable and vector assets straight from Ketoy bundles. PNG, JPEG, WebP, nine-patch and Compose VectorDrawables — paths, groups, gradients and tint state lists all supported.',
        'Remote images via Coil are still the recommended pattern for dynamic content. Use <code>painterResource</code> for assets that ship with the APK.',
        'Available in SDK ' + KETOY_SDK_VERSION + '. The new <code>IMAGE_PAINTER</code> and <code>IMAGE_VECTOR</code> KBC constructors are backwards compatible with 0.3.x runtimes.'
      ]
    },
    'navigation3': {
      title: 'Navigation 3 type-safe routes inside bundles',
      chip: 'Beta',
      chipClass: 'uchip-beta',
      date: 'April 28, 2026',
      tag: 'SDK · 0.3.2',
      body: [
        'Compose Navigation 3 routes are first-class. Declare destinations with sealed classes; the K2 compiler plugin emits the matching KBC dispatch for each route.',
        'Deep-link URIs are resolved on-device — no cloud round-trip. Argument types are validated at compile time, eliminating a whole class of runtime crashes from malformed URIs.',
        '<strong>Status:</strong> Beta. Targeting stable in 0.4.0. Breaking API changes are possible before then; pin to <code>0.3.2-beta</code> and watch the changelog.'
      ]
    }
  };

  function buildDrawer() {
    var overlay = document.createElement('div');
    overlay.id = 'updateDrawerOverlay';
    overlay.style.cssText = [
      'position:fixed;inset:0;z-index:200',
      'background:rgba(0,0,0,0.32)',
      'backdrop-filter:blur(2px)',
      '-webkit-backdrop-filter:blur(2px)',
      'opacity:0;pointer-events:none',
      'transition:opacity 220ms ease'
    ].join(';');

    var drawer = document.createElement('aside');
    drawer.id = 'updateDrawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    drawer.style.cssText = [
      'position:fixed;top:0;right:0;bottom:0',
      'width:min(520px,100vw)',
      'background:var(--card-bg)',
      'border-left:1px solid var(--border)',
      'box-shadow:-8px 0 40px -8px rgba(0,0,0,0.18)',
      'z-index:201',
      'display:flex;flex-direction:column',
      'transform:translateX(100%)',
      'transition:transform 260ms cubic-bezier(.4,0,.2,1)',
      'overflow:hidden'
    ].join(';');

    var head = document.createElement('div');
    head.id = 'updateDrawerHead';
    head.style.cssText = [
      'display:flex;align-items:flex-start;gap:16px',
      'padding:28px 28px 0',
      'flex-shrink:0'
    ].join(';');

    var meta = document.createElement('div');
    meta.id = 'updateDrawerMeta';
    meta.style.cssText = 'flex:1;min-width:0';

    var closeBtn = document.createElement('button');
    closeBtn.id = 'updateDrawerClose';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.style.cssText = [
      'width:36px;height:36px;border-radius:999px',
      'background:var(--surface);border:1px solid var(--border)',
      'color:var(--ink);cursor:pointer',
      'display:inline-flex;align-items:center;justify-content:center',
      'flex-shrink:0;transition:background 120ms ease',
      'font-size:18px;line-height:1;font-family:var(--font-ui)'
    ].join(';');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('mouseover', function () { this.style.background = 'var(--surface-2)'; });
    closeBtn.addEventListener('mouseout',  function () { this.style.background = 'var(--surface)'; });

    head.appendChild(meta);
    head.appendChild(closeBtn);

    var body = document.createElement('div');
    body.id = 'updateDrawerBody';
    body.style.cssText = [
      'flex:1;overflow-y:auto',
      'padding:20px 28px 40px',
      'font-family:var(--font-body);font-weight:300',
      'font-size:16px;line-height:1.65;color:var(--ink-2)'
    ].join(';');

    drawer.appendChild(head);
    drawer.appendChild(body);
    overlay.appendChild(drawer);
    document.body.appendChild(overlay);

    function close() {
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
      drawer.style.transform = 'translateX(100%)';
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', function (e) {
      if (!drawer.contains(e.target)) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    return { overlay: overlay, drawer: drawer, meta: meta, body: body, open: open };

    function open(id) {
      var u = UPDATES[id];
      if (!u) return;

      meta.innerHTML =
        '<span class="uchip ' + u.chipClass + '" style="display:inline-flex;align-items:center;gap:6px;font-family:var(--font-ui);font-weight:600;font-size:12px;padding:4px 10px;border-radius:999px;margin-bottom:14px">' +
          '<span style="width:6px;height:6px;border-radius:50%;display:inline-block;background:currentColor;opacity:.7"></span>' +
          u.chip +
        '</span>' +
        '<h2 style="font-family:var(--font-display);font-weight:600;font-size:clamp(20px,2.8vw,28px);line-height:1.15;letter-spacing:-0.02em;color:var(--ink);margin:0 0 6px">' + u.title + '</h2>' +
        '<p style="font-family:var(--font-ui);font-size:13px;color:var(--muted-2);margin:0">' + u.date + ' &middot; ' + u.tag + '</p>';

      body.innerHTML = u.body.map(function (p) {
        return '<p style="margin-bottom:16px">' + p + '</p>';
      }).join('');

      overlay.style.pointerEvents = 'auto';
      overlay.style.opacity = '1';
      drawer.style.transform = 'translateX(0)';
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }
  }

  var ui = buildDrawer();

  document.addEventListener('click', function (e) {
    var card = e.target.closest('.update-card[data-update-id]');
    if (!card) return;
    ui.open(card.getAttribute('data-update-id'));
  });
})();
