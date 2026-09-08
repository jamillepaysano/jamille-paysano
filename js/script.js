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

// Cursor: um ponto que acompanha o mouse na hora e um anel que chega
// com atraso. So entra em ponteiro fino e quando o usuario nao pediu
// menos movimento; o cursor do sistema continua visivel nos dois casos.
(() => {
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const calm = matchMedia('(prefers-reduced-motion:reduce)').matches;
  if (!fine || calm) return;

  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  dot.setAttribute('aria-hidden', 'true');
  ring.setAttribute('aria-hidden', 'true');
  document.body.append(dot, ring);

  let mx = 0, my = 0, rx = 0, ry = 0, on = false;

  addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    if (!on) { on = true; rx = mx; ry = my; document.body.classList.add('cursor-on'); }
    dot.style.transform = `translate(${mx}px, ${my}px)`;
    // o alvo clicavel abre o anel
    document.body.classList.toggle('cursor-active',
      !!e.target.closest('a, button, [role="button"]'));
  });

  // sai da janela: esconde, senao o anel fica parado num canto
  addEventListener('mouseleave', () => { on = false; document.body.classList.remove('cursor-on'); });
  addEventListener('mouseenter', () => { on = true; document.body.classList.add('cursor-on'); });

  (function loop() {
    // 0.18 = quanto o anel anda em direcao ao mouse por quadro: o atraso
    // e o efeito; valores altos demais matam a sensacao de linha puxada
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(loop);
  })();
})();
