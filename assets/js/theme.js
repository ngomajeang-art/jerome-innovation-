/* Thème clair / sombre.
   Script synchrone placé en premier dans <head> : le thème est appliqué avant le premier affichage
   (pas de flash blanc). Le choix du visiteur est mémorisé ; sans choix, on suit le réglage de son appareil.
   Le bouton soleil / lune est créé par widgets.js, qui appelle window.jitTheme. */
(function () {
  'use strict';
  var CLE = 'jit-theme';
  var html = document.documentElement;
  var systeme = matchMedia('(prefers-color-scheme: dark)');

  function choisi() {
    try { var s = localStorage.getItem(CLE); if (s === 'dark' || s === 'light') return s; } catch (e) { /* stockage indisponible */ }
    return null;
  }
  function appliquer(theme) {
    html.setAttribute('data-theme', theme);
    html.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
  }

  window.jitTheme = {
    get: function () { return html.getAttribute('data-theme') || 'light'; },
    set: function (theme) {
      try { localStorage.setItem(CLE, theme); } catch (e) { /* le thème s'applique quand même pour cette page */ }
      appliquer(theme);
    },
    bascule: function () { this.set(this.get() === 'dark' ? 'light' : 'dark'); }
  };

  html.setAttribute('data-theme', choisi() || (systeme.matches ? 'dark' : 'light'));

  // Sans choix explicite, le site suit le réglage de l'appareil quand il change
  var suivre = function (e) { if (!choisi()) appliquer(e.matches ? 'dark' : 'light'); };
  if (systeme.addEventListener) systeme.addEventListener('change', suivre); else if (systeme.addListener) systeme.addListener(suivre);
})();
