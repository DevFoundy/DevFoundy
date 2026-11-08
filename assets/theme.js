(() => {
  const root = document.documentElement;
  const system = matchMedia('(prefers-color-scheme: dark)');
  let chosen = null;
  try { const saved = localStorage.getItem('devfoundy-theme'); if (saved === 'light' || saved === 'dark') chosen = saved; } catch {}
  const apply = theme => {
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#111c18' : '#f6f4ee');
    document.querySelectorAll('.theme-toggle').forEach(button => {
      const japanese = root.lang === 'ja';
      const label = theme === 'dark'
        ? (japanese ? 'ライトモードに切り替える' : 'Switch to light mode')
        : (japanese ? 'ダークモードに切り替える' : 'Switch to dark mode');
      button.setAttribute('aria-label', label);
      button.title = label;
      button.hidden = false;
    });
  };
  document.querySelectorAll('.theme-toggle').forEach(button => {
    button.addEventListener('click', () => {
      chosen = root.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(chosen);
      try { localStorage.setItem('devfoundy-theme', chosen); } catch {}
    });
  });
  system.addEventListener('change', () => { if (!chosen) apply(system.matches ? 'dark' : 'light'); });
  window.addEventListener('storage', event => {
    if (event.key !== 'devfoundy-theme' && event.key !== null) return;
    chosen = event.newValue === 'dark' || event.newValue === 'light' ? event.newValue : null;
    apply(chosen || (system.matches ? 'dark' : 'light'));
  });
  window.addEventListener('pageshow', () => {
    try { const saved = localStorage.getItem('devfoundy-theme'); chosen = saved === 'dark' || saved === 'light' ? saved : null; } catch {}
    apply(chosen || (system.matches ? 'dark' : 'light'));
  });
  window.addEventListener('devfoundy-language-change', () => apply(root.dataset.theme || 'light'));
  apply(chosen || root.dataset.theme || (system.matches ? 'dark' : 'light'));
})();

