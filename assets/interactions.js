(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const accordions = [];

  document.querySelectorAll('.faq details').forEach(details => {
    const summary = details.querySelector('summary');
    let animation;
    let expanded = details.open;

    const finish = () => {
      animation?.cancel();
      animation = null;
      details.open = expanded;
      details.style.removeProperty('height');
      details.style.removeProperty('overflow');
      details.classList.remove('is-closing');
    };
    accordions.push(finish);

    summary.addEventListener('click', event => {
      event.preventDefault();
      const startHeight = details.getBoundingClientRect().height;
      expanded = !expanded;
      animation?.cancel();
      animation = null;
      if (reducedMotion.matches) {
        finish();
        return;
      }

      // Measure each natural state so wrapped answers and resized screens fit.
      details.style.removeProperty('height');
      details.open = false;
      const closedHeight = details.getBoundingClientRect().height;
      details.open = true;
      const openHeight = details.getBoundingClientRect().height;
      details.classList.toggle('is-closing', !expanded);
      details.style.height = `${startHeight}px`;
      details.style.overflow = 'hidden';
      animation = details.animate(
        { height: [`${startHeight}px`, `${expanded ? openHeight : closedHeight}px`] },
        { duration: 360, easing: 'cubic-bezier(.22,.7,.25,1)', fill: 'forwards' }
      );
      animation.onfinish = finish;
    });
  });

  const canTilt = matchMedia('(hover: hover) and (pointer: fine)');
  const cards = document.querySelectorAll(
    '.offer-card, .experience-intro, .experience-item, .current-project, .project-card, .concept-card, .focus-panel'
  );
  const resets = [];
  cards.forEach(card => {
    card.classList.add('tilt-card');
    let bounds;
    let frame;
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = null;
      bounds = null;
      card.classList.remove('is-tilting');
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
    };
    resets.push(reset);
    card.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'mouse' || !canTilt.matches || reducedMotion.matches) return;
      bounds = card.getBoundingClientRect();
    });
    card.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse' || !canTilt.matches || reducedMotion.matches) return;
      bounds ??= card.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
      const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        card.classList.add('is-tilting');
        card.style.setProperty('--tilt-x', `${-y * 4}deg`);
        card.style.setProperty('--tilt-y', `${x * 4}deg`);
      });
    });
    card.addEventListener('pointerleave', reset);
    card.addEventListener('pointercancel', reset);
  });
  const resetCards = () => resets.forEach(reset => reset());
  window.addEventListener('blur', resetCards);
  window.addEventListener('resize', resetCards);
  window.addEventListener('scroll', resetCards, { passive: true });
  canTilt.addEventListener('change', resetCards);
  reducedMotion.addEventListener('change', () => {
    resetCards();
    accordions.forEach(finish => finish());
  });

  const showcase = document.querySelector('[data-project-showcase]');
  if (showcase) {
    const primaryCards = [...showcase.querySelectorAll('.showcase-set:not([aria-hidden]) .showcase-card')];
    showcase.querySelectorAll('.showcase-card img').forEach(image => {
      const markMissing = () => image.closest('.showcase-card')?.classList.add('image-missing');
      image.addEventListener('error', markMissing);
      if (image.complete && image.naturalWidth === 0) markMissing();
    });

    const reveal = card => {
      primaryCards.forEach(item => item.classList.toggle('is-revealed', item === card));
      showcase.classList.toggle('is-interacting', Boolean(card));
    };
    primaryCards.forEach(card => {
      card.addEventListener('pointerup', event => {
        if (event.pointerType === 'mouse' || event.target.closest('a')) return;
        reveal(card.classList.contains('is-revealed') ? null : card);
      });
      card.addEventListener('keydown', event => {
        if ((event.key === 'Enter' || event.key === ' ') && event.target === card) {
          event.preventDefault();
          reveal(card);
          card.querySelector('.showcase-more')?.focus();
        }
      });
    });
    document.addEventListener('pointerup', event => {
      if (!showcase.contains(event.target)) reveal(null);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        const activeCard = showcase.querySelector('.showcase-card.is-revealed');
        reveal(null);
        activeCard?.focus();
      }
    });
  }

  const revealProjectFromHash = () => {
    document.querySelectorAll('.project-card.is-showcase-target').forEach(card => card.classList.remove('is-showcase-target'));
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    const target = document.getElementById(id);
    if (!target?.classList.contains('project-card')) return;
    target.classList.add('is-showcase-target');
    target.setAttribute('tabindex', '-1');
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'center' });
      target.focus({ preventScroll: true });
    });
  };
  revealProjectFromHash();
  window.addEventListener('hashchange', revealProjectFromHash);
})();
