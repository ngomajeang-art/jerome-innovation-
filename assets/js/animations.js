// Animations communes à toutes les pages : entrée du héros, apparition au défilement, compteurs.
// Rien ne s'applique si le visiteur a demandé moins de mouvement : la page reste alors simplement affichée.
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

  var DUREE = 700, DECALAGE = 80, COURBE = 'cubic-bezier(.2,.7,.2,1)';

  var style = document.createElement('style');
  style.textContent =
    'html .a-voir { opacity: 0; transform: translateY(24px); }' +
    'html .a-zoom { opacity: 0; transform: scale(.92); }' +
    'html .a-voir.vu, html .a-zoom.vu { opacity: 1; transform: none; transition: opacity ' + DUREE + 'ms ' + COURBE + ', transform ' + DUREE + 'ms ' + COURBE + '; }' +
    '@media print { html .a-voir, html .a-zoom { opacity: 1; transform: none; } }';
  document.head.appendChild(style);

  function preparer(el, classe, rang) {
    el.classList.add(classe);
    el.style.transitionDelay = Math.min(rang, 5) * DECALAGE + 'ms';
  }

  // Une fois l'élément apparu, on rend la main à ses propres effets de survol
  function montrer(el) {
    el.classList.add('vu');
    setTimeout(function () {
      el.classList.remove('a-voir', 'a-zoom', 'vu');
      el.style.transitionDelay = '';
    }, DUREE + 500);
  }

  // Héros : le texte monte ligne par ligne et l'objectif s'ouvre au chargement
  var heros = document.querySelector('main section');
  var titre = heros && heros.querySelector('h1');
  var entree = [];
  if (titre) {
    Array.prototype.forEach.call(titre.parentElement.children, function (el, i) {
      preparer(el, 'a-voir', i);
      entree.push(el);
    });
    var objectif = heros.querySelector('.ring');
    if (objectif) {
      preparer(objectif.parentElement, 'a-zoom', 2);
      entree.push(objectif.parentElement);
    }
    var lancer = function () {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { entree.forEach(montrer); });
      });
    };
    // Si l'écran de chargement est affiché, le héros entre en scène quand il s'efface
    if (document.getElementById('precharge')) document.addEventListener('precharge:fin', lancer, { once: true });
    else lancer();
  }

  // Reste de la page : titres, cartes et blocs apparaissent au défilement
  var retenus = [];
  document.querySelectorAll('main section h2, main section h2 ~ p, main .grid > *, main .projet, main article, main figure, main aside, main form').forEach(function (el) {
    if (heros && heros.contains(el)) return;
    if (el.closest('[class*="animate-[mq"]')) return;
    if (el.parentElement.classList.contains('place-items-center')) return;
    if (retenus.some(function (r) { return r.contains(el); })) return;
    retenus.push(el);
  });

  var rangs = new Map();
  var vue = new IntersectionObserver(function (lignes) {
    lignes.forEach(function (l) {
      if (!l.isIntersecting) return;
      vue.unobserve(l.target);
      montrer(l.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });

  retenus.forEach(function (el) {
    var rang = rangs.get(el.parentElement) || 0;
    rangs.set(el.parentElement, rang + 1);
    preparer(el, 'a-voir', rang);
    vue.observe(el);
  });

  // Compteurs : le chiffre monte jusqu'à sa valeur quand il devient visible
  function milliers(v) {
    return v >= 1000 ? Math.floor(v / 1000) + ' ' + String(v % 1000).padStart(3, '0') : String(v);
  }
  var compteurs = new IntersectionObserver(function (lignes) {
    lignes.forEach(function (l) {
      if (!l.isIntersecting) return;
      compteurs.unobserve(l.target);
      var el = l.target, texte = el.textContent, nombre = texte.match(/\d[\d\s]*/);
      if (!nombre) return;
      var fin = parseInt(nombre[0].replace(/\D/g, ''), 10), debut = performance.now();
      (function tic(t) {
        var p = Math.min((t - debut) / 1200, 1);
        var v = Math.round(fin * (1 - Math.pow(1 - p, 3)));
        el.textContent = p < 1 ? texte.replace(nombre[0], milliers(v)) : texte;
        if (p < 1) requestAnimationFrame(tic);
      })(debut);
    });
  }, { threshold: .6 });
  document.querySelectorAll('[data-count]').forEach(function (el) { compteurs.observe(el); });
})();
