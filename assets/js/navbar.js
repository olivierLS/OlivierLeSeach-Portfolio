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
  const linksHTML = links.map(l => 
    `<li><a href="${l.href}" class="${current === l.href ? 'active' : ''}">${l.label}</a></li>`
  ).join('');

  // Injection du HTML épuré
  nav.innerHTML = `
    <nav class="navbar">
      <a class="navbar__brand" href="index.html">OL<span>•</span>LS</a>
      <button class="navbar__toggle">☰</button>
      <ul class="navbar__links">
        ${linksHTML}
      </ul>
    </nav>
  `;

  // Gestion ultra-basique du clic
  const btn = nav.querySelector('.navbar__toggle');
  const list = nav.querySelector('.navbar__links');
  
  btn.addEventListener('click', () => list.classList.toggle('open'));
})();
