(() => {
  const tools = document.querySelector('.journal-tools');
  if (!tools) return;
  const search = document.getElementById('journal-search');
  const category = document.getElementById('journal-category');
  const reset = document.getElementById('journal-reset');
  const status = document.getElementById('journal-results');
  const empty = document.getElementById('journal-empty');
  const archive = document.querySelector('.notebook-archive');
  const mainGrid = document.getElementById('journal-grid');
  const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[’‘]/g, "'");
  const posts = Array.from(document.querySelectorAll('.journal-list .blog-post'), card => ({
    card,
    category: card.querySelector('.blog-meta span').textContent.trim(),
    text: normalize(card.textContent),
    archived: Boolean(card.closest('.notebook-archive'))
  }));
  const categories = [...new Set(posts.map(post => post.category))].sort((a, b) => a.localeCompare(b));
  for (const label of categories) {
    const option = document.createElement('option');
    option.value = label;
    option.textContent = label;
    category.append(option);
  }
  function filter() {
    const words = normalize(search.value).trim().split(/\s+/).filter(Boolean);
    let count = 0, currentCount = 0, archiveCount = 0;
    for (const post of posts) {
      const visibleText = normalize(post.card.textContent);
      const matches = (!category.value || post.category === category.value) && words.every(word => post.text.includes(word) || visibleText.includes(word));
      post.card.hidden = !matches;
      if (matches) {
        count++;
        if (post.archived) archiveCount++; else currentCount++;
      }
    }
    mainGrid.hidden = currentCount === 0;
    if (archive) archive.hidden = archiveCount === 0;
    empty.hidden = count !== 0;
    status.textContent = document.documentElement.lang === 'ja'
      ? `${count}件の記事${words.length || category.value ? `（全${posts.length}件から検索）` : ' · 新しい順'}`
      : `${count} ${count === 1 ? 'entry' : 'entries'}${words.length || category.value ? ` found · ${posts.length} total` : ' · newest first'}`;
    reset.hidden = !search.value && !category.value;
  }
  search.addEventListener('input', filter);
  category.addEventListener('change', filter);
  tools.addEventListener('submit', event => event.preventDefault());
  reset.addEventListener('click', () => {
    search.value = '';
    category.value = '';
    filter();
    search.focus();
  });
  tools.hidden = false;
  window.addEventListener('devfoundy-language-change', filter);
  filter();
})();

