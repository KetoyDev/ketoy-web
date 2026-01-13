// Hero tab switching: K-DSL / JSON / UI
(function () {
  const tabButtons = document.querySelectorAll('.hero-card-tabs .tab');
  const kdsl = document.querySelector('.code-kdsl');
  const json = document.querySelector('.code-json');
  const ui = document.querySelector('.code-ui');

  if (!tabButtons.length) return;

  function showTab(name) {
    kdsl.classList.add('hidden');
    json.classList.add('hidden');
    ui.classList.add('hidden');

    if (name === 'kdsl') kdsl.classList.remove('hidden');
    if (name === 'json') json.classList.remove('hidden');
    if (name === 'ui') ui.classList.remove('hidden');
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab');
      showTab(tab);
    });
  });

  // Default
  showTab('kdsl');
})();
