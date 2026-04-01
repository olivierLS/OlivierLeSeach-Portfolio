/* Fade-in on scroll */
(function () {
  const els = document.querySelectorAll('.fade-in');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
})();

/* RGPD information modal (displayed once per 6 months) */
(function () {
  const storageKey = 'ols_rgpd_notice_ack_v1';
  const ackTtlMs = 1000 * 60 * 60 * 24 * 183;
  let alreadySeen = false;

  try {
    const now = Date.now();
    const raw = window.localStorage.getItem(storageKey);

    if (raw === '1') {
      window.localStorage.setItem(storageKey, JSON.stringify({ v: 1, ts: now }));
      alreadySeen = true;
    } else if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.v === 1 && typeof parsed.ts === 'number') {
        alreadySeen = (now - parsed.ts) < ackTtlMs;
        if (!alreadySeen) {
          window.localStorage.removeItem(storageKey);
        }
      } else {
        window.localStorage.removeItem(storageKey);
      }
    }
  } catch (_) {
    alreadySeen = false;
  }

  if (alreadySeen) return;

  const modal = document.createElement('div');
  modal.className = 'consent-modal';
  modal.innerHTML = `
    <section class="consent-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="consent-title">
      <h2 id="consent-title">Information sur la confidentialite</h2>
      <p>Bienvenue sur ce portfolio. Ce site vitrine n'utilise ni cookies publicitaires ni suivi d'audience tiers.</p>
      <ul class="consent-modal__list">
        <li>Aucune creation de compte.</li>
        <li>Aucune collecte de donnees via formulaire.</li>
        <li>Un stockage local conserve votre choix de fermeture pendant 6 mois maximum.</li>
      </ul>
      <p>Consultez les pages <a href="mentions-legales.html">Mentions legales</a> et <a href="confidentialite.html">Politique de confidentialite</a>.</p>
      <div class="consent-modal__actions">
        <button type="button" class="btn" id="consent-ack-btn">J'ai compris</button>
      </div>
    </section>
  `;

  function closeModal() {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ v: 1, ts: Date.now() }));
    } catch (_) {}
    document.body.style.overflow = '';
    modal.remove();
  }

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  const btn = modal.querySelector('#consent-ack-btn');
  if (btn) btn.addEventListener('click', closeModal);
})();
