/* Écran de chargement : le logo apparaît avec un anneau qui tourne et une barre de progression,
   puis l'écran s'efface. Affiché à chaque chargement de page, sur toutes les pages du site.
   Sauté si le visiteur a demandé moins de mouvement.
   Script synchrone, placé dans <head> : l'écran est en place avant le premier affichage. */
(function () {
  'use strict';
  var html = document.documentElement;
  var script = document.currentScript;
  if (!script || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var MINIMUM = 1900;   // durée minimale d'affichage (ms)
  var MAXIMUM = 4200;   // l'écran ne doit jamais bloquer le site, même si une image tarde
  var logo = new URL('../img/logo.png', script.src).href;

  var ecran = document.createElement('div');
  ecran.id = 'precharge';
  ecran.setAttribute('role', 'status');
  ecran.setAttribute('aria-label', 'Chargement du site');
  ecran.innerHTML =
    '<div class="pc-marque">' +
      '<span class="pc-orbite" aria-hidden="true"></span>' +
      '<img class="pc-logo" src="' + logo + '" width="240" height="120" alt="Jerome Innovation et Technologie">' +
    '</div>' +
    '<div class="pc-barre" aria-hidden="true"><i></i></div>';
  html.appendChild(ecran);
  html.classList.add('pc-actif');

  var debut = Date.now(), fini = false;
  function sortir() {
    if (fini) return; fini = true;
    ecran.classList.add('pc-sortie');
    document.dispatchEvent(new Event('precharge:fin'));   // le héros de la page peut entrer en scène
    setTimeout(function () { ecran.remove(); html.classList.remove('pc-actif'); }, 700);
  }
  function pret() { setTimeout(sortir, Math.max(0, MINIMUM - (Date.now() - debut))); }

  if (document.readyState === 'complete') pret(); else addEventListener('load', pret);
  setTimeout(sortir, MAXIMUM);
})();
