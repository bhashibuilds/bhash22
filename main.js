// ── Docs filter ──
const filterButtons = document.querySelectorAll('.filter-btn');
const docItems = document.querySelectorAll('.doc-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    docItems.forEach(item => {
      const tags = item.dataset.tags || '';
      if (filter === 'all' || tags.includes(filter)) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// ── Docs sort ──
const sortButtons = document.querySelectorAll('.sort-btn');
const docsList = document.querySelector('.docs-list');

sortButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    sortButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const sort = btn.dataset.sort;
    const items = Array.from(docsList.querySelectorAll('.doc-item'));

    items.sort((a, b) => {
      if (sort === 'date') {
        return (b.dataset.date || '').localeCompare(a.dataset.date || '');
      }
      if (sort === 'topic') {
        const aTag = (a.dataset.tags || '').split(' ')[0];
        const bTag = (b.dataset.tags || '').split(' ')[0];
        return aTag.localeCompare(bTag);
      }
      return 0;
    });

    items.forEach(item => docsList.appendChild(item));
  });
});

// ── Subtle fade-in on scroll ──
const fadeEls = document.querySelectorAll('.project-item, .library-card, .doc-item, .fun-card, .highlight-card');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(12px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});
