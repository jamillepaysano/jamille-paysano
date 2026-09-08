// Menu no celular: a barra lateral vira lista retrátil no topo.
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
}

// Reveal progressivo. Só esconde se o JS estiver rodando.
const targets = document.querySelectorAll('.reveal');
if (targets.length && 'IntersectionObserver' in window) {
  targets.forEach(el => el.classList.add('js-reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(el => io.observe(el));

  // Rede de seguranca: se o observer nao disparar por qualquer motivo,
  // o conteudo aparece mesmo assim. Texto invisivel e pior que texto sem animacao.
  setTimeout(() => targets.forEach(el => el.classList.add('on')), 2500);
}

// Ano no rodapé.
document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});
