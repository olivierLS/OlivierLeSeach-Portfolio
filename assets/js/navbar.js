(function () {
  const nav = document.getElementById('site-header');
  if (!nav) return;

  const links = [
    { href: 'index.html', label: 'Accueil' },
    { href: 'projets.html', label: 'Projets' },
    { href: 'apropos.html', label: 'À propos' },
    { href: 'contact.html', label: 'Contact' }
  ];

  // Récupération simple de la page courante
  const current = window.location.pathname.split('/').pop() || 'index.html';

  // Génération des liens
  const linksHTML = links.map(l => {
    const isActive = current === l.href;
    return `<li><a href="${l.href}" class="${isActive ? 'active' : ''}"${isActive ? ' aria-current="page"' : ''}>${l.label}</a></li>`;
  }).join('');

  // Injection du HTML épuré
  nav.innerHTML = `
    <nav class="navbar">
      <a class="navbar__brand" href="index.html">OL<span>•</span>LS</a>
      <button class="navbar__toggle" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="primary-navigation">☰</button>
      <ul class="navbar__links" id="primary-navigation">
        ${linksHTML}
      </ul>
    </nav>
  `;

  // Gestion du clic + état accessible du bouton burger
  const btn = nav.querySelector('.navbar__toggle');
  const list = nav.querySelector('.navbar__links');

  btn.addEventListener('click', () => {
    const isOpen = list.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
    btn.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  });
})();
