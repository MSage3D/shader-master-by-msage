(() => {
  const body = document.body;
  const search = document.querySelector('#wiki-search');
  const searchEmpty = document.querySelector('#search-empty');
  const searchable = [...document.querySelectorAll('.searchable')];
  const details = [...document.querySelectorAll('details')];
  const navToggle = document.querySelector('.nav-toggle');
  const expandButton = document.querySelector('.expand-all');
  const navLinks = [...document.querySelectorAll('#wiki-nav a')];
  const pageSections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  navToggle?.addEventListener('click', () => {
    const open = body.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  navLinks.forEach(link => link.addEventListener('click', () => {
    body.classList.remove('nav-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }));

  document.addEventListener('click', event => {
    if (!body.classList.contains('nav-open')) return;
    if (event.target.closest('.sidebar') || event.target.closest('.nav-toggle')) return;
    body.classList.remove('nav-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });

  expandButton?.addEventListener('click', () => {
    const shouldOpen = details.some(item => !item.open);
    details.forEach(item => { item.open = shouldOpen; });
    expandButton.textContent = shouldOpen ? 'Collapse all' : 'Expand all';
  });

  function normalize(value) {
    return value.toLowerCase().replace(/\s+/g, ' ').trim();
  }

  function runSearch() {
    const query = normalize(search.value);
    let visibleCount = 0;

    searchable.forEach(section => {
      const visible = !query || normalize(section.textContent).includes(query);
      section.classList.toggle('search-hidden', !visible);
      if (visible) visibleCount += 1;

      if (query && visible) {
        section.querySelectorAll('details').forEach(item => {
          item.open = normalize(item.textContent).includes(query);
        });
      }
    });

    searchEmpty.hidden = visibleCount > 0;
  }

  search?.addEventListener('input', runSearch);
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const tag = document.activeElement?.tagName;
      if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
        event.preventDefault();
        search?.focus();
      }
    }
    if (event.key === 'Escape' && document.activeElement === search) {
      search.value = '';
      runSearch();
      search.blur();
    }
  });

  const observer = new IntersectionObserver(entries => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`);
    });
  }, { rootMargin: '-22% 0px -68% 0px', threshold: [0, .15, .4] });
  pageSections.forEach(section => observer.observe(section));

  // Drop future screenshots into assets/images as IMG-01.png, IMG-02.jpg, and so on.
  // The first matching extension automatically replaces that numbered placeholder.
  const extensions = ['webp', 'png', 'jpg', 'jpeg', 'avif'];
  document.querySelectorAll('[data-image-id]').forEach(slot => {
    const id = slot.dataset.imageId;
    const tryExtension = index => {
      if (index >= extensions.length) return;
      const image = new Image();
      image.onload = () => {
        image.alt = slot.querySelector('b')?.textContent || `${id} wiki illustration`;
        slot.prepend(image);
        slot.classList.add('has-image');
      };
      image.onerror = () => tryExtension(index + 1);
      image.src = `assets/images/${id}.${extensions[index]}`;
    };
    tryExtension(0);
  });
})();
