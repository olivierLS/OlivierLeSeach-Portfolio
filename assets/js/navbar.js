(function () {
  const header = document.getElementById('site-header');
  if (!header) return;

  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const supportedLangs = ['fr', 'en', 'es'];
  let langIndex = -1;

  pathParts.forEach((part, index) => {
    if (supportedLangs.includes(part)) langIndex = index;
  });

  const lang = langIndex >= 0 ? pathParts[langIndex] : 'fr';
  const currentFile = pathParts[pathParts.length - 1] || 'index.html';
  const currentHash = window.location.hash || '';
  const currentPath = langIndex >= 0 ? pathParts.slice(langIndex + 1).join('/') || 'index.html' : 'index.html';
  const depthFromSiteRoot = langIndex >= 0 ? Math.max(1, pathParts.length - langIndex - 1) : 0;

  const siteRootPrefix = '../'.repeat(depthFromSiteRoot);
  const languagePrefix = `${lang}/`;

  const labels = {
    fr: {
      skip: 'Aller au contenu',
      nav: 'Navigation principale',
      brandHome: "Retour à l'accueil",
      option: 'BTS SIO option SISR',
      open: 'Ouvrir le menu',
      close: 'Fermer le menu',
      languages: 'Choisir la langue',
      projectsMenu: 'Catégories de projets',
      projectLinks: [
        'BTS SIO - Services Informatiques aux Organisations',
        'BAC PRO Systèmes Numériques'
      ],
      links: ['Accueil', 'BTS SIO', 'Compétences', 'Projets', 'À propos', 'Contact']
    },
    en: {
      skip: 'Skip to content',
      nav: 'Main navigation',
      brandHome: 'Back to home page',
      option: 'BTS SIO, SISR track',
      open: 'Open menu',
      close: 'Close menu',
      languages: 'Choose language',
      projectsMenu: 'Project categories',
      projectLinks: [
        'BTS SIO - IT Services for Organisations',
        'Vocational Baccalaureate - Digital Systems'
      ],
      links: ['Home', 'BTS SIO', 'Skills', 'Projects', 'About', 'Contact']
    },
    es: {
      skip: 'Ir al contenido',
      nav: 'Navegación principal',
      brandHome: 'Volver al inicio',
      option: 'BTS SIO, especialidad SISR',
      open: 'Abrir el menú',
      close: 'Cerrar el menú',
      languages: 'Elegir idioma',
      projectsMenu: 'Categorías de proyectos',
      projectLinks: [
        'BTS SIO - Servicios Informáticos a las Organizaciones',
        'Bachillerato profesional - Sistemas Digitales'
      ],
      links: ['Inicio', 'BTS SIO', 'Competencias', 'Proyectos', 'Sobre mí', 'Contacto']
    }
  };

  const linkDefs = [
    { href: 'index.html', group: 'index' },
    { href: 'pages/bts-sio.html', group: 'bts-sio' },
    { href: 'pages/competences.html', group: 'competences' },
    {
      href: 'projets/index.html',
      group: 'projets',
      children: [
        { href: 'projets/bts-sio.html' },
        { href: 'projets/bac-pro-systemes-numeriques.html' }
      ]
    },
    { href: 'pages/apropos.html', group: 'apropos' },
    { href: 'pages/contact.html', group: 'contact' }
  ];

  function siteHref(path) {
    return `${siteRootPrefix}${languagePrefix}${path}`;
  }

  function groupForPath(path) {
    if (path === 'index.html') return 'index';
    if (path.startsWith('pages/')) return path.replace('pages/', '').replace('.html', '');
    if (path.startsWith('projets/')) return 'projets';
    return currentFile.startsWith('projet-') || currentFile.startsWith('projets-') ? 'projets' : currentFile.replace('.html', '');
  }

  const currentGroup = groupForPath(currentPath);

  const items = linkDefs.map((link, index) => {
    const isActive = currentGroup === link.group || currentPath === link.href;
    if (link.children) {
      const submenuId = `${link.group}-submenu`;
      const children = link.children.map((child, childIndex) => {
        const isChildActive = currentPath === child.href;
        return `
          <li>
            <a href="${siteHref(child.href)}" class="${isChildActive ? 'active' : ''}"${isChildActive ? ' aria-current="page"' : ''}>
              ${labels[lang].projectLinks[childIndex]}
            </a>
          </li>
        `;
      }).join('');

      return `
        <li class="navbar__item navbar__item--has-menu">
          <button class="navbar__dropdown-toggle ${isActive ? 'active' : ''}" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="${submenuId}"${isActive ? ' aria-current="page"' : ''}>
            <span>${labels[lang].links[index]}</span>
            <span class="navbar__dropdown-icon" aria-hidden="true"></span>
          </button>
          <ul class="navbar__submenu" id="${submenuId}" aria-label="${labels[lang].projectsMenu}">
            ${children}
          </ul>
        </li>
      `;
    }

    return `
      <li>
        <a href="${siteHref(link.href)}" class="${isActive ? 'active' : ''}"${isActive ? ' aria-current="page"' : ''}>
          ${labels[lang].links[index]}
        </a>
      </li>
    `;
  }).join('');

  function localizedHref(targetLang) {
    const targetPrefix = `${targetLang}/`;
    return `${siteRootPrefix}${targetPrefix}${currentPath}${currentHash}`;
  }

  const langItems = [
    { code: 'fr', label: 'FR', name: 'Français', flag: 'fr.svg' },
    { code: 'en', label: 'EN', name: 'English', flag: 'en.svg' },
    { code: 'es', label: 'ES', name: 'Español', flag: 'es.svg' }
  ].map((item) => {
    const isActive = item.code === lang;
    return `
      <a href="${localizedHref(item.code)}" lang="${item.code}" hreflang="${item.code}" class="${isActive ? 'active' : ''}" aria-label="${item.name}" title="${item.name}"${isActive ? ' aria-current="true"' : ''}>
        <img class="language-switch__flag" src="${siteRootPrefix}assets/img/flags/${item.flag}" alt="" width="21" height="14">
        <span class="language-switch__code">${item.label}</span>
      </a>
    `;
  }).join('');

  header.innerHTML = `
    <a class="skip-link" href="#main-content">${labels[lang].skip}</a>
    <nav class="navbar" aria-label="${labels[lang].nav}">
      <a class="navbar__brand" href="${siteHref('index.html')}" aria-label="${labels[lang].brandHome}">
        <img class="navbar__logo" src="${siteRootPrefix}assets/img/logo-olls.png" alt="" width="34" height="34">
        <span class="navbar__brand-text">
          <span>Olivier Le SEAC'H</span>
          <small>${labels[lang].option}</small>
        </span>
      </a>
      <div class="navbar__actions">
        <div class="language-switch" aria-label="${labels[lang].languages}">
          ${langItems}
        </div>
        <button class="navbar__toggle" type="button" aria-label="${labels[lang].open}" aria-expanded="false" aria-controls="primary-navigation">
          <span class="navbar__toggle-lines" aria-hidden="true"></span>
        </button>
      </div>
      <ul class="navbar__links" id="primary-navigation">
        ${items}
      </ul>
    </nav>
  `;

  const nav = header.querySelector('.navbar');
  const toggle = header.querySelector('.navbar__toggle');
  const menu = header.querySelector('.navbar__links');
  const dropdownItems = Array.from(header.querySelectorAll('.navbar__item--has-menu'));

  function setDropdownState(item, isOpen) {
    const button = item.querySelector('.navbar__dropdown-toggle');
    item.classList.toggle('open', isOpen);
    if (button) button.setAttribute('aria-expanded', String(isOpen));
  }

  function closeDropdowns(exceptItem) {
    dropdownItems.forEach((item) => {
      if (item !== exceptItem) setDropdownState(item, false);
    });
  }

  function closeMenu() {
    closeDropdowns();
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', labels[lang].open);
  }

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    document.body.classList.toggle('menu-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? labels[lang].close : labels[lang].open);
  });

  dropdownItems.forEach((item) => {
    const button = item.querySelector('.navbar__dropdown-toggle');
    if (!button) return;

    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = !item.classList.contains('open');
      closeDropdowns(item);
      setDropdownState(item, isOpen);
    });
  });

  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) {
      closeMenu();
      return;
    }

    if (!event.target.closest('.navbar__item--has-menu')) closeDropdowns();
  });

  function updateScrollState() {
    nav.classList.toggle('scrolled', window.scrollY > 6);
  }

  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });
})();
