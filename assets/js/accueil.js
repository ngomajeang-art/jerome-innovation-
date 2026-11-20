/* Page d'accueil : carrousel du héros et cartes de réalisations. */
(function () {
  'use strict';

  // ---------- Carrousel du héros : fondu enchaîné, les sujets détourés suivent leur décor ----------
  var track = document.getElementById('sliderTrack');
  if (track) {
    var slides = track.children;
    var pops = document.querySelectorAll('.pop [data-slide]');
    var index = 0;

    var montrer = function (i) {
      Array.prototype.forEach.call(slides, function (s, k) { s.classList.toggle('on', k === i); });
      Array.prototype.forEach.call(pops, function (p) { p.classList.toggle('on', Number(p.dataset.slide) === i); });
    };

    montrer(0);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // 3,5 s par diapositive, 6,5 s pour le robot (le temps de saluer et de lire sa bulle)
      var duree = function (i) { return document.querySelector('.ia[data-slide="' + i + '"]') ? 6500 : 3500; };
      var suivante = function () {
        index = (index + 1) % slides.length;
        montrer(index);
        setTimeout(suivante, duree(index));
      };
      setTimeout(suivante, duree(0));
    }
  }

  // ---------- Réalisations : la carte survolée ou atteinte au clavier prend la grande place ----------
  var projets = document.querySelectorAll('.projet');
  projets.forEach(function (p) {
    var activer = function () {
      projets.forEach(function (x) { x.classList.toggle('actif', x === p); });
    };
    p.addEventListener('mouseenter', activer);
    p.addEventListener('focusin', activer);
  });
})();
