(function () {
  const elements = document.querySelectorAll('.fade-in');

  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('in'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach((element) => observer.observe(element));
})();

(function () {
  const ageElements = document.querySelectorAll('[data-birthdate]');
  if (!ageElements.length) return;

  function calculateAge(birthdate) {
    const [year, month, day] = birthdate.split('-').map(Number);
    if (!year || !month || !day) return null;

    const today = new Date();
    let age = today.getFullYear() - year;
    const birthdayThisYear = new Date(today.getFullYear(), month - 1, day);

    if (today < birthdayThisYear) age -= 1;
    return age;
  }

  ageElements.forEach((element) => {
    const age = calculateAge(element.dataset.birthdate);
    if (age !== null) element.textContent = age;
  });
})();
