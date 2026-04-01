(function () {
  const ft = document.getElementById('site-footer');
  if (!ft) return;
  const year = new Date().getFullYear();
  ft.innerHTML = `
    <div class="footer">
      <p>© ${year} — Olivier Le SEAC'H • BTS SIO</p>
      <p class="muted">Site statique (HTML/CSS/JS). Aucune dépendance externe. Développé par Maxime GOUSSU</p>
      <p class="footer__links">
        <a href="mentions-legales.html">Mentions légales</a> •
        <a href="confidentialite.html">Politique de confidentialité</a>
      </p>
    </div>
  `;
})();
