// Reveal the relevant studio chapter before following a saved or shared anchor.
(() => {
  function revealChapter() {
    if (!location.hash) return;
    let id;
    try {
      id = decodeURIComponent(location.hash.slice(1));
    } catch {
      return;
    }
    const target = document.getElementById(id);
    const chapter = target?.closest("details");
    if (!chapter) return;
    chapter.open = true;
    requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
  }

  window.addEventListener("hashchange", revealChapter);
  window.addEventListener("pageshow", revealChapter);
  revealChapter();
})();
