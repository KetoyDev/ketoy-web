(function () {
  var wrap = document.getElementById('searchWrap');
  var input = document.getElementById('searchInput');
  var results = document.getElementById('searchResults');
  var empty = document.getElementById('searchEmpty');

  if (!wrap || !input || !results || !empty) return;

  var searchable = [];
  var activeHit = null;

  function isTypingTarget(el) {
    if (!el) return false;
    var tag = el.tagName;
    return tag === 'TEXTAREA' || el.isContentEditable || (tag === 'INPUT' && el !== input);
  }

  function buildIndex() {
    if (searchable.length) return;
    var nodes = document.querySelectorAll('h1, h2, h3, h4, p, li');
    Array.prototype.forEach.call(nodes, function (el) {
      if (!el || !el.textContent) return;
      if (el.closest('header, nav, footer, .topbar, .subnav, .docs-side, .search-wrap')) return;
      var text = el.textContent.replace(/\s+/g, ' ').trim();
      if (!text) return;
      searchable.push({ el: el, text: text.toLowerCase(), raw: text });
    });
  }

  function clearHit() {
    if (activeHit) { activeHit.classList.remove('search-hit'); activeHit = null; }
  }

  function setHit(el) {
    clearHit();
    activeHit = el;
    activeHit.classList.add('search-hit');
    setTimeout(function () { if (activeHit === el) clearHit(); }, 2200);
  }

  function makeSnippet(raw, q) {
    if (!q) return raw.slice(0, 120);
    var idx = raw.toLowerCase().indexOf(q);
    if (idx === -1) return raw.slice(0, 120);
    var start = Math.max(0, idx - 36);
    var end = Math.min(raw.length, idx + 64);
    return (start > 0 ? '...' : '') + raw.slice(start, end) + (end < raw.length ? '...' : '');
  }

  function render(query) {
    var q = (query || '').trim().toLowerCase();
    results.innerHTML = '';
    clearHit();
    if (!q) { empty.style.display = 'none'; return; }
    buildIndex();
    var matches = searchable.filter(function (item) {
      return item.text.indexOf(q) !== -1;
    }).slice(0, 20);
    if (!matches.length) { empty.style.display = 'block'; return; }
    empty.style.display = 'none';
    matches.forEach(function (item) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'search-result';
      btn.setAttribute('data-hit', 'true');
      var title = document.createElement('span');
      title.textContent = item.raw.length > 80 ? item.raw.slice(0, 80) + '...' : item.raw;
      btn.appendChild(title);
      var snippet = document.createElement('small');
      snippet.textContent = makeSnippet(item.raw, q);
      btn.appendChild(snippet);
      btn.addEventListener('click', function () {
        close();
        item.el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setHit(item.el);
      });
      results.appendChild(btn);
    });
  }

  function open() {
    wrap.classList.add('open');
  }

  function close() {
    wrap.classList.remove('open');
    results.innerHTML = '';
    empty.style.display = 'none';
    clearHit();
  }

  input.addEventListener('focus', open);

  input.addEventListener('input', function () {
    open();
    render(input.value);
  });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      var first = results.querySelector('button[data-hit]');
      if (first) first.click();
    }
    if (e.key === 'Escape') { close(); input.blur(); }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && !wrap.classList.contains('open') && !isTypingTarget(document.activeElement)) {
      e.preventDefault();
      input.focus();
    }
  });

  document.addEventListener('mousedown', function (e) {
    if (!wrap.contains(e.target)) close();
  });
})();
