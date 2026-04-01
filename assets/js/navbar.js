(function () {
  const nav = document.getElementById('site-header');
  if (!nav) return;

  const links = [
    { href: 'index.html', label: 'Accueil' },
    { href: 'projets.html', label: 'Projets' },
    { href: 'apropos.html', label: 'À propos' },
    { href: 'contact.html', label: 'Contact' }
  ];

  const current = location.pathname.split('/').pop() || 'index.html';

  nav.innerHTML = `
    <nav class="navbar">
      <a class="navbar__brand" href="index.html">OL<span>•</span>LS</a>
      <button class="navbar__toggle" aria-label="Menu" aria-expanded="false">☰</button>
      <ul class="navbar__links">
        ${links.map(l => `<li><a href="${l.href}" class="${current === l.href ? 'active' : ''}">${l.label}</a></li>`).join('')}
      </ul>
    </nav>
  `;

  const btn = nav.querySelector('.navbar__toggle');
  const list = nav.querySelector('.navbar__links');
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    list.classList.toggle('open');
  });
})();
