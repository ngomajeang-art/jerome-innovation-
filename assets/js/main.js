/* Comportements communs à toutes les pages :
   en-tête (barre de progression, menu mobile), choix de langue, lettre d'information,
   formulaires (contact, devis, candidature), préremplissage depuis l'adresse et filtres. */
(function () {
  'use strict';

  // ---------- En-tête : barre de progression et ombre au défilement ----------
  var hdr = document.getElementById('hdr');
  var bar = document.getElementById('progress');
  var burger = document.getElementById('burger');

  function onScroll() {
    var y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.width = (h > 0 ? y / h * 100 : 0) + '%';
    if (hdr) hdr.classList.toggle('scrolled', y > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Menu mobile ----------
  if (hdr && burger) {
    burger.addEventListener('click', function () {
      var open = hdr.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
    });
    document.querySelectorAll('#nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        hdr.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Choix de la langue (affichage seul pour l'instant) ----------
  var langs = document.querySelectorAll('#lang button');
  langs.forEach(function (b) {
    b.addEventListener('click', function () {
      langs.forEach(function (x) { x.classList.toggle('on', x === b); });
    });
  });

  // ---------- Lettre d'information (pied de page) ----------
  var nl = document.getElementById('nl-form');
  var nlMsg = document.getElementById('nl-msg');
  if (nl && nlMsg) {
    nl.addEventListener('submit', function (e) {
      e.preventDefault();
      var mail = nl.querySelector('input');
      if (!mail.checkValidity() || !mail.value) {
        nlMsg.textContent = 'Merci de saisir une adresse e-mail valide.';
        return;
      }
      nlMsg.textContent = 'Merci, votre inscription est bien prise en compte.';
      nl.reset();
    });
  }

  // ---------- Formulaires de contact, de devis et de candidature ----------
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (f) {
        var bad = !f.value.trim() || !f.checkValidity();
        f.classList.toggle('err', bad);
        var m = form.querySelector('[data-err-for="' + f.id + '"]');
        if (m) m.hidden = !bad;
        if (bad) ok = false;
      });
      if (!ok) { form.querySelector('.err').focus(); return; }
      form.hidden = true;
      document.getElementById(form.dataset.form).hidden = false;
    });
    form.querySelectorAll('[required]').forEach(function (f) {
      f.addEventListener('input', function () {
        f.classList.remove('err');
        var m = form.querySelector('[data-err-for="' + f.id + '"]');
        if (m) m.hidden = true;
      });
    });
  });

  // ---------- Préremplissage depuis l'adresse (ex. devis.html?pole=Drones%20industriels) ----------
  var params = new URLSearchParams(location.search);
  document.querySelectorAll('select[data-param]').forEach(function (s) {
    var v = params.get(s.dataset.param);
    if (v) Array.prototype.forEach.call(s.options, function (o) { if (o.text === v) s.value = o.value || o.text; });
  });

  // ---------- Filtres (réalisations, actualités) ----------
  document.querySelectorAll('[data-filters]').forEach(function (box) {
    var grid = document.getElementById(box.dataset.filters);
    var btns = box.querySelectorAll('button');
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
        grid.querySelectorAll('[data-cat]').forEach(function (c) {
          c.hidden = b.dataset.cat !== 'all' && c.dataset.cat !== b.dataset.cat;
        });
      });
    });
  });
})();
