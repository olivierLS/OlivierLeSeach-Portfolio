(function () {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const supportedLangs = ['fr', 'en', 'es'];
  let langIndex = -1;

  pathParts.forEach((part, index) => {
    if (supportedLangs.includes(part)) langIndex = index;
  });

  const lang = langIndex >= 0 ? pathParts[langIndex] : 'fr';
  const currentFile = pathParts[pathParts.length - 1] || 'index.html';
  const depthFromSiteRoot = langIndex >= 0 ? Math.max(1, pathParts.length - langIndex - 1) : 0;

  const siteRootPrefix = '../'.repeat(depthFromSiteRoot);
  const languagePrefix = `${lang}/`;
  const year = new Date().getFullYear();
  const content = {
    fr: {
      line1: `© ${year} — Olivier Le SEAC'H • Portfolio BTS SIO option SISR`,
      line2: 'Site statique HTML, CSS et JavaScript, conçu pour une consultation claire par un jury ou un recruteur.',
      legal: 'Mentions légales',
      privacy: 'Politique de confidentialité'
    },
    en: {
      line1: `© ${year} — Olivier Le SEAC'H • BTS SIO SISR portfolio`,
      line2: 'A static HTML, CSS and JavaScript portfolio designed for clear review by an examiner or recruiter.',
      legal: 'Legal notice',
      privacy: 'Privacy policy'
    },
    es: {
      line1: `© ${year} — Olivier Le SEAC'H • Portfolio BTS SIO SISR`,
      line2: 'Sitio estático en HTML, CSS y JavaScript, pensado para una lectura clara por parte de un tribunal o reclutador.',
      legal: 'Aviso legal',
      privacy: 'Política de privacidad'
    }
  };
  const labels = content[lang];

  footer.innerHTML = `
    <div class="footer">
      <p>${labels.line1}</p>
      <p>${labels.line2}</p>
      <p class="footer__links">
        <a href="${siteRootPrefix}${languagePrefix}legal/mentions-legales.html">${labels.legal}</a>
        <a href="${siteRootPrefix}${languagePrefix}legal/confidentialite.html">${labels.privacy}</a>
      </p>
    </div>
  `;
})();
