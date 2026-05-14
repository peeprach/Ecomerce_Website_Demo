document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('nav-hamburger');
  const navbar    = document.querySelector('.navbar');
  if (!hamburger || !navbar) return;

  // Toggle open/close
  hamburger.addEventListener('click', e => {
    e.stopPropagation();
    navbar.classList.toggle('nav-open');
    hamburger.classList.toggle('is-open');
  });

  // Close when any nav link is clicked
  navbar.querySelectorAll('.nav-links a, .nav-dropdown-menu a').forEach(a => {
    a.addEventListener('click', () => {
      navbar.classList.remove('nav-open');
      hamburger.classList.remove('is-open');
    });
  });

  // Close when clicking outside the navbar
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) {
      navbar.classList.remove('nav-open');
      hamburger.classList.remove('is-open');
    }
  });
});
