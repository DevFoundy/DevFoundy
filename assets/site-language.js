(() => {
  const root = document.documentElement;
  const pagePath = location.pathname.split('/DevFoundy/').pop().replace(/^\//, '') || 'index.html';
  const translations = {
    ...(window.devfoundyJournalTranslations || {}),
    ...(window.devfoundyPageTranslations?.[pagePath] || {})
  };
  const originalTitle = document.title;
  const header = document.querySelector('header .nav') || document.querySelector('header');
  if (!header) return;
  const picker = document.createElement('div');
  picker.className = 'language-picker';
  picker.innerHTML = '<button class="language-toggle" type="button" aria-label="Choose language" aria-haspopup="true" aria-expanded="false" aria-controls="language-menu" title="Choose language"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z"/></svg></button><div class="language-menu" id="language-menu" hidden><div class="language-menu-title">Language</div><button class="language-option" type="button" data-language-option="en" lang="en"><span>English</span><span class="language-check" aria-hidden="true">✓</span></button><button class="language-option" type="button" data-language-option="ja" lang="ja"><span>日本語</span><span class="language-check" aria-hidden="true">✓</span></button></div>';
  const theme = header.querySelector('.theme-toggle');
  if (theme) header.insertBefore(picker, theme);
  else header.append(picker);

  const button = picker.querySelector('.language-toggle');
  const menu = picker.querySelector('.language-menu');
  const options = [...picker.querySelectorAll('[data-language-option]')];
  const normalize = value => value.trim().replace(/\s+/g, ' ');
  const originals = new Map();
  function collect(node) {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, {
      acceptNode(text) {
        if (!text.nodeValue.trim() || text.parentElement.closest('script, style, svg, pre, code, .language-picker')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    while (walker.nextNode()) if (!originals.has(walker.currentNode)) originals.set(walker.currentNode, walker.currentNode.nodeValue);
  }
  collect(document.body);
  const attributes = [...document.querySelectorAll('[aria-label],[placeholder],[alt],[title],meta[name="description"],meta[property="og:title"],meta[property="og:description"]')]
    .filter(element => !element.closest('.language-picker'))
    .flatMap(element => ['aria-label','placeholder','alt','title',...(element.tagName === 'META' ? ['content'] : [])]
      .filter(name => element.hasAttribute(name))
      .map(name => ({element,name,english:element.getAttribute(name)})));
  function setLanguage(language) {
    const japanese = language === 'ja';
    root.lang = japanese ? 'ja' : 'en';
    root.dataset.language = root.lang;
    originals.forEach((english,node) => {
      const trimmed = normalize(english);
      if (japanese && Object.hasOwn(translations,trimmed)) node.nodeValue = english.replace(english.trim(),translations[trimmed]);
      else node.nodeValue = english;
    });
    attributes.forEach(({element,name,english}) => {
      const translated = translations[normalize(english)];
      element.setAttribute(name,japanese && translated ? translated : english);
    });
    button.setAttribute('aria-label',japanese ? '言語を選択' : 'Choose language');
    button.title = button.getAttribute('aria-label');
    picker.querySelector('.language-menu-title').textContent = japanese ? '言語' : 'Language';
    options.forEach(option => option.setAttribute('aria-current',String(option.dataset.languageOption === language)));
    document.title = japanese && translations[originalTitle] ? translations[originalTitle] : originalTitle;
    try { localStorage.setItem('devfoundy-language',language); } catch {}
    window.dispatchEvent(new Event('devfoundy-language-change'));
  }
  function closeMenu() {
    menu.hidden = true;
    button.setAttribute('aria-expanded','false');
  }
  button.addEventListener('click',() => {
    menu.hidden = !menu.hidden;
    button.setAttribute('aria-expanded',String(!menu.hidden));
  });
  options.forEach(option => option.addEventListener('click',() => {
    setLanguage(option.dataset.languageOption);
    closeMenu();
    button.focus();
  }));
  document.addEventListener('click',event => { if (!event.target.closest('.language-picker')) closeMenu(); });
  document.addEventListener('keydown',event => { if (event.key === 'Escape' && !menu.hidden) { closeMenu(); button.focus(); } });
  setLanguage(root.dataset.language === 'ja' ? 'ja' : 'en');
})();
