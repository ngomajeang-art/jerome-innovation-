/* Boutons flottants : WhatsApp, assistant de discussion et retour en haut.
   Fichier partagé par toutes les pages ; il injecte son propre style et son propre HTML. */
(function () {
  var WHATSAPP = 'https://wa.me/242069691866?text=' + encodeURIComponent('Bonjour, je souhaite des informations sur vos solutions.');
  var reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Racine du site, déduite de l'emplacement de ce script (assets/js/) : les liens marchent depuis n'importe quel dossier
  var ROOT = new URL('../../', document.currentScript ? document.currentScript.src : location.href).href;
  function R(chemin) { return ROOT + chemin; }

  // ---------- Réponses de l'assistant (reprises des textes du site) ----------
  var L = {
    solutions: { t: 'Voir nos solutions', h: R('solutions.html') },
    devis: { t: 'Demander un devis gratuit', h: R('devis.html') },
    contact: { t: 'Formulaire de contact', h: R('contact.html') },
    appeler: { t: 'Appeler le +242 06 969 18 66', h: 'tel:+242069691866' },
    whatsapp: { t: 'Écrire sur WhatsApp', h: WHATSAPP, ext: true },
    carrieres: { t: 'Voir les postes ouverts', h: R('carrieres.html') }
  };
  var SUJETS = [
    { k: /batterie|boutique|acheter|achat|vendez|outil|materiel|equipement|onduleur|categorie|produit|catalogue|piece/,
      r: 'Notre page Catégories présente les équipements que nous proposons : batteries, panneaux solaires, onduleurs, caméras, pièces de drone, traceurs GPS et outils. Les prix sont donnés sur demande.', l: [{ t: 'Voir les catégories', h: R('categories.html') }, L.devis] },
    { chip: 'Nos services', k: /service|propos|offre|pole|expertise|que faites|activite|domaine/,
      r: 'Nous réunissons sept pôles : drones industriels, drone AgriTech, sécurité électronique, énergie solaire, innovation et IA, mobilité et suivi GPS, agents de sécurité. Chaque pôle peut intervenir seul ou être combiné aux autres.', l: [L.solutions] },
    { chip: 'Demander un devis', k: /devis|prix|tarif|cout|combien|budget|payant|gratuit/,
      r: 'Le devis est gratuit et sans engagement. Le prix dépend de votre site et de vos besoins : notre équipe analyse votre demande et vous propose une solution chiffrée.', l: [L.devis] },
    { chip: 'Où intervenez-vous ?', k: /ou intervenez|zone|pays|ville|region|localis|situe|adresse|pointe|brazzaville|congo|afrique|basee?s?/,
      r: 'Nous sommes basés à Pointe-Noire, en République du Congo, et nous intervenons dans toute l’Afrique centrale.', l: [] },
    { chip: 'Horaires et contact', k: /horaire|ouvert|heure|contact|joindre|telephone|appel|mail|numero|reponse/,
      r: 'Notre équipe vous répond du lundi au vendredi, de 8h00 à 17h00. Téléphone : +242 06 969 18 66. E-mail : contact@jerome-innovation.com.', l: [L.appeler, L.contact] },
    { chip: 'Candidater', k: /carriere|emploi|recrut|candidat|poste|travailler chez|stage|cv|job/,
      r: 'Vous pouvez envoyer une candidature spontanée : nous lisons chaque dossier. Les postes ouverts sont présentés sur la page Carrières.', l: [L.carrieres] },
    { k: /agents? de securite|gardienn|gardien|vigile|ronde|controle d acces|surveillance humaine/,
      r: 'Nos agents de sécurité assurent le gardiennage et la surveillance de vos locaux, chantiers et entrepôts, de jour comme de nuit : contrôle d’accès, accueil, rondes et levée de doute en cas d’alarme.', l: [{ t: 'Agents de sécurité', h: R('solutions.html#agents') }, L.devis] },
    { chip: 'Parler à un conseiller', k: /conseiller|humain|personne|quelqu un|agent|parler|whatsapp|rappel/,
      r: 'Pour échanger avec une personne de l’équipe, écrivez-nous sur WhatsApp. Nous répondons du lundi au vendredi.', l: [L.whatsapp] },
    { k: /demarr|ouverture|lancement|2027|quand|commenc/,
      r: 'Jerome Innovation et Technologie, filiale de Jerome holdings, démarre ses activités en 2027. Les réalisations présentées sur le site sont des exemples.', l: [] },
    { k: /particulier|entreprise|institution|societe|professionnel|client/,
      r: 'Nous accompagnons les particuliers comme les entreprises, et les institutions pour l’énergie solaire.', l: [] },
    { k: /methode|etape|deroul|processus|comment (se|ca)|projet|maintenance|apres|suivi|formation/,
      r: 'Un projet se déroule en quatre étapes : audit et écoute, conception d’une solution chiffrée, déploiement (installation, configuration, formation de vos équipes), puis suivi et maintenance dans la durée.', l: [L.solutions] },
    { k: /drone industriel|inspection|pylone|cartograph|facade/,
      r: 'Nos drones industriels prennent en charge les missions les plus risquées : inspection de pylônes, cartographie de sites et nettoyage de façades.', l: [{ t: 'Drones industriels', h: R('solutions.html#drones') }] },
    { k: /agri|epandage|culture|engrais|champ|agricol/,
      r: 'Le drone AgriTech épand les engrais et traite les cultures, plus vite et plus précisément.', l: [{ t: 'Drone AgriTech', h: R('solutions.html#agritech') }] },
    { k: /securite|camera|surveillance|alarme|cloture|video/,
      r: 'Vidéosurveillance, détection de mouvement, alarmes et clôtures électriques, pour les particuliers comme pour les entreprises.', l: [{ t: 'Sécurité électronique', h: R('solutions.html#securite') }] },
    { k: /solaire|photovolta|panneau|energie|electricite/,
      r: 'Nous vendons et installons des équipements solaires, du dimensionnement à la mise en service.', l: [{ t: 'Énergie solaire', h: R('solutions.html#solaire') }] },
    { k: /\bia\b|intelligence|artificielle|analyse|predictive|donnee/,
      r: 'Nous développons des applications d’intelligence artificielle sur mesure : analyse d’images de drone, détection d’anomalies et maintenance prédictive.', l: [{ t: 'Innovation et IA', h: R('solutions.html#ia') }] },
    { k: /gps|flotte|camion|vehicule|carburant|suivi/,
      r: 'Nous proposons le suivi GPS et le contrôle du carburant pour les flottes de camions et de véhicules.', l: [{ t: 'Mobilité et suivi GPS', h: R('solutions.html#gps') }] },
    { k: /^(bonjour|bonsoir|salut|hello|coucou|merci)/,
      r: 'Bonjour ! Choisissez un sujet ci-dessous ou posez-moi votre question.', l: [] }
  ];
  var SECOURS = { r: 'Je n’ai pas de réponse précise à cette question. Choisissez un sujet ci-dessous, ou écrivez directement à l’équipe.', l: [L.whatsapp, L.contact] };

  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/['’]/g, ' ').trim(); }
  function repondre(texte) {
    var n = norm(texte);
    for (var i = 0; i < SUJETS.length; i++) if (SUJETS[i].k.test(n)) return SUJETS[i];
    return SECOURS;
  }

  // ---------- Style ----------
  var css = [
    '.jw-pile{position:fixed;left:max(16px,env(safe-area-inset-left,0px));bottom:max(16px,env(safe-area-inset-bottom,0px));z-index:70;display:flex;flex-direction:column;align-items:flex-start;gap:12px;font-family:inherit}',
    '.jw-pile.jw-cache{visibility:hidden}',
    '.jw-pile.jw-droite{left:auto;right:max(16px,env(safe-area-inset-right,0px));align-items:flex-end}',
    '.jw-droite .jw-btn[data-label]::after{left:auto;right:calc(100% + 10px)}',
    '.jw-btn{position:relative;width:56px;height:56px;border:0;border-radius:50%;display:grid;place-items:center;color:#fff;cursor:pointer;text-decoration:none;box-shadow:0 12px 28px -10px rgba(6,18,46,.55);transition:transform .2s,background-color .2s}',
    '.jw-btn:hover{transform:translateY(-2px)}',
    '.jw-btn:focus-visible,.jw-panel button:focus-visible,.jw-panel input:focus-visible,.jw-panel a:focus-visible{outline:3px solid #FFB020;outline-offset:3px}',
    '.jw-btn svg{width:26px;height:26px;display:block}',
    '.jw-btn[data-label]::after{content:attr(data-label);position:absolute;left:calc(100% + 10px);top:50%;transform:translateY(-50%);padding:6px 12px;border-radius:999px;background:#06122E;color:#fff;font-size:14px;font-weight:600;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .2s}',
    '.jw-btn[data-label]:hover::after,.jw-btn[data-label]:focus-visible::after{opacity:1}',
    '.jw-wa{background:#1FA855}.jw-wa:hover{background:#188a45}',
    '.jw-theme{width:44px;height:44px;background:#fff;color:#154EB4;border:1px solid #D6DFE9}.jw-theme:hover{background:#F3F7FB}.jw-theme svg{width:22px;height:22px}',
    '.jw-bot{background:#1F5FD1}.jw-bot:hover{background:#154EB4}',
    '.jw-wa,.jw-bot{animation:jw-ping 2.4s ease-out infinite}',
    '.jw-bot{animation-delay:1.2s;--jw-ping:31,95,209}.jw-wa{--jw-ping:31,168,85}',
    '.jw-wa:hover,.jw-wa:focus-visible,.jw-bot:hover,.jw-bot:focus-visible{animation-play-state:paused}',
    // Bouton de l'assistant : le robot Jerome, sans rond, qui flotte doucement
    '.jw-btn.jw-bot{width:120px;height:135px;border-radius:18px;background:none;box-shadow:none;animation:jw-flotte 3.2s ease-in-out infinite}',
    // Robot en trois calques (corps + deux bras) : les bras pivotent au coude pour dire bonjour, une bulle sort de la bouche
    '.jw-robot{position:relative;display:block;width:100%;height:100%;filter:drop-shadow(0 10px 12px rgba(6,18,46,.35));transition:transform .2s}',
    '.jw-bot:hover .jw-robot{transform:scale(1.06)}',
    '.jw-robot img{position:absolute;left:0;top:0;display:block;width:100%;height:100%;object-fit:contain}',
    '.jw-bras-d{transform-origin:74.2% 66.5%}.jw-bras-g{transform-origin:22.5% 66%}',
    // Yeux animés (l'image du corps n'a plus d'yeux) : le regard se déplace, puis un clignement ; tailles en cqw (1cqw = 1,78 px de l'image source)
    '.jw-robot{container-type:inline-size}',
    '.jw-oeil{position:absolute;top:30%;width:6.6cqw;height:9.2cqw;margin:-4.6cqw 0 0 -3.3cqw;border-radius:50%;background:radial-gradient(ellipse at 50% 42%,#B6F1FF 0%,#6FD8F0 55%,#3FB8DE 100%);box-shadow:0 0 2.4cqw .4cqw rgba(86,205,240,.55)}',
    '.jw-oeil-g{left:31.2%}.jw-oeil-d{left:52.1%}',
    '@media (prefers-reduced-motion:no-preference){.jw-yeux{animation:jw-regard 9s ease-in-out infinite}.jw-oeil{animation:jw-cligne 5.6s ease-in-out infinite}}',
    '.jw-yeux{position:absolute;inset:0;pointer-events:none}',
    '@keyframes jw-regard{0%,12%{transform:translate(0,0)}18%,32%{transform:translate(-2.6cqw,0)}38%,46%{transform:translate(0,0)}52%,66%{transform:translate(2.6cqw,.6cqw)}72%,80%{transform:translate(0,-1.8cqw)}86%,100%{transform:translate(0,0)}}',
    '@keyframes jw-cligne{0%,90%,100%{transform:scaleY(1)}93%,95.5%{transform:scaleY(.08)}}',
    '.jw-parole{position:absolute;inset:0;pointer-events:none;opacity:0;transform-origin:42% 39%;text-align:left}',
    '.jw-btn .jw-queue{position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible;fill:#fff;filter:drop-shadow(0 3px 6px rgba(6,18,46,.3))}',
    '.jw-bulle{position:absolute;left:107%;top:4%;width:190px;padding:10px 14px;border-radius:16px;background:#fff;color:#0B1530;font-size:14px;font-weight:700;line-height:1.35;box-shadow:0 12px 24px -10px rgba(6,18,46,.5)}',
    '@media (prefers-reduced-motion:no-preference){.jw-bras-d{animation:jw-salue-d 22s ease-in-out 4.5s infinite}.jw-bras-g{animation:jw-salue-g 22s ease-in-out 4.5s infinite}.jw-parole{animation:jw-parle 22s ease 4.5s infinite}}',
    '@keyframes jw-salue-d{0%,1%,32%,100%{rotate:0deg}3%{rotate:-10deg}6%{rotate:16deg}9%{rotate:-14deg}12%{rotate:16deg}15%{rotate:-14deg}18%{rotate:16deg}21%{rotate:-14deg}24%{rotate:14deg}27%{rotate:-8deg}30%{rotate:0deg}}',
    '@keyframes jw-salue-g{0%,1%,32%,100%{rotate:0deg}5%{rotate:14deg}10%{rotate:6deg}15%{rotate:14deg}20%{rotate:6deg}25%{rotate:14deg}30%{rotate:0deg}}',
    '@keyframes jw-parle{0%{opacity:0;transform:scale(.1)}2.5%{opacity:1;transform:scale(1.07)}4%,28%{opacity:1;transform:scale(1)}31%,100%{opacity:0;transform:scale(.1)}}',
    // WhatsApp centré au-dessus de la tête du robot (tête à 47 % de la largeur de l'image)
    '.jw-pile:not(.jw-droite) .jw-wa{margin-left:28px}',
    '@keyframes jw-flotte{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}',
    '@keyframes jw-ping{0%{box-shadow:0 12px 28px -10px rgba(6,18,46,.55),0 0 0 0 rgba(var(--jw-ping),.65);filter:brightness(1)}35%{filter:brightness(1.18)}70%,100%{box-shadow:0 12px 28px -10px rgba(6,18,46,.55),0 0 0 18px rgba(var(--jw-ping),0);filter:brightness(1)}}',
    '.jw-top{width:44px;height:44px;background:#06122E;opacity:0;visibility:hidden;transform:translateY(8px);transition:transform .2s,background-color .2s,opacity .25s,visibility .25s}',
    '.jw-top.jw-on{opacity:1;visibility:visible;transform:none}.jw-top.jw-on:hover{transform:translateY(-2px)}',
    '.jw-top svg{width:20px;height:20px}',
    '.jw-panel{position:fixed;left:max(16px,env(safe-area-inset-left,0px));bottom:max(16px,env(safe-area-inset-bottom,0px));z-index:75;width:min(380px,calc(100vw - 32px));height:min(560px,calc(100dvh - 32px));display:flex;flex-direction:column;background:#fff;color:#0B1530;border-radius:22px;overflow:hidden;box-shadow:0 30px 70px -20px rgba(6,18,46,.6);border:1px solid #D6DFE9;font-family:inherit;font-size:15px;line-height:1.5}',
    '.jw-panel[hidden]{display:none}',
    '.jw-tete{display:flex;align-items:center;gap:12px;padding:14px 16px;background:#06122E;color:#fff}',
    '.jw-av{flex:none;width:44px;height:44px;border-radius:50%;background:#E6EEFC;overflow:hidden}.jw-av img{display:block;width:100%;height:100%}',
    '.jw-tete b{display:block;font-size:16px}.jw-tete small{display:block;font-size:13px;color:#C9D4EA}',
    '.jw-x{margin-left:auto;flex:none;width:44px;height:44px;border:0;border-radius:50%;background:transparent;color:#fff;cursor:pointer;display:grid;place-items:center}.jw-x:hover{background:rgba(255,255,255,.12)}.jw-x svg{width:20px;height:20px}',
    '.jw-log{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:#F3F7FB}',
    '.jw-m{max-width:88%;padding:10px 14px;border-radius:16px;word-wrap:break-word}',
    '.jw-m.jw-b{align-self:flex-start;background:#fff;border:1px solid #E3EAF3;border-bottom-left-radius:4px}',
    '.jw-m.jw-u{align-self:flex-end;background:#1F5FD1;color:#fff;border-bottom-right-radius:4px}',
    '.jw-m p{margin:0}',
    '.jw-m .jw-l{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}',
    '.jw-m .jw-l a{display:inline-block;padding:8px 14px;border-radius:999px;background:#E6EEFC;color:#154EB4;font-weight:600;font-size:14px;text-decoration:none}.jw-m .jw-l a:hover{background:#D3E2FA}',
    '.jw-saisie{align-self:flex-start;padding:12px 16px;border-radius:16px;border-bottom-left-radius:4px;background:#fff;border:1px solid #E3EAF3;display:flex;gap:4px}',
    '.jw-saisie i{width:7px;height:7px;border-radius:50%;background:#6B7690;animation:jw-p 1s infinite ease-in-out}.jw-saisie i:nth-child(2){animation-delay:.15s}.jw-saisie i:nth-child(3){animation-delay:.3s}',
    '@keyframes jw-p{0%,80%,100%{opacity:.3}40%{opacity:1}}',
    '.jw-chips{display:flex;flex-wrap:wrap;gap:8px;padding:10px 16px;border-top:1px solid #E3EAF3;background:#fff;max-height:156px;overflow-y:auto}',
    '.jw-chips button{min-height:36px;padding:6px 14px;border:1px solid #BFD3F5;border-radius:999px;background:#fff;color:#154EB4;font:inherit;font-size:14px;font-weight:600;cursor:pointer}.jw-chips button:hover{background:#E6EEFC}',
    '.jw-form{display:flex;gap:8px;padding:12px 16px 14px;border-top:1px solid #E3EAF3;background:#fff}',
    '.jw-form input{flex:1;min-width:0;min-height:44px;padding:0 14px;border:1px solid #D6DFE9;border-radius:999px;font:inherit;font-size:16px;color:#0B1530}',
    '.jw-form button{flex:none;width:44px;height:44px;border:0;border-radius:50%;background:#1F5FD1;color:#fff;cursor:pointer;display:grid;place-items:center}.jw-form button:hover{background:#154EB4}.jw-form button svg{width:20px;height:20px}',
    '.jw-vh{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}',
    '@media (max-width:620px){.jw-btn{width:52px;height:52px}.jw-btn.jw-bot{width:92px;height:104px}.jw-pile:not(.jw-droite) .jw-wa{margin-left:17px}.jw-top{width:44px;height:44px}.jw-btn[data-label]::after{display:none}.jw-panel{right:0;left:0;bottom:0;width:auto;height:min(82dvh,640px);border-radius:22px 22px 0 0}}',
    '@media (prefers-reduced-motion:reduce){.jw-btn,.jw-btn.jw-bot,.jw-bot img,.jw-saisie i{transition:none;animation:none}}',
    '@media print{.jw-pile,.jw-panel{display:none}}'
  ].join('\n');

  // ---------- Petits outils DOM ----------
  var NS = 'http://www.w3.org/2000/svg';
  function svg(d, opts) {
    var s = document.createElementNS(NS, 'svg');
    s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('aria-hidden', 'true');
    var p = document.createElementNS(NS, 'path'); p.setAttribute('d', d);
    if (opts && opts.stroke) { p.setAttribute('fill', 'none'); p.setAttribute('stroke', 'currentColor'); p.setAttribute('stroke-width', '2.4'); p.setAttribute('stroke-linecap', 'round'); p.setAttribute('stroke-linejoin', 'round'); }
    else p.setAttribute('fill', 'currentColor');
    s.appendChild(p); return s;
  }
  function el(tag, attrs, kids) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (k === 'text') e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); });
    (kids || []).forEach(function (c) { if (c) e.appendChild(c); });
    return e;
  }
  var ICO = {
    wa: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z',
    chat: 'M4 3h16a2 2 0 012 2v11a2 2 0 01-2 2H9.5L4 22v-4a2 2 0 01-2-2V5a2 2 0 012-2zm4 6.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zm4 0a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zm4 0a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z',
    lune: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z',
    soleil: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
    up: 'M12 19V5M5 12l7-7 7 7', close: 'M6 6l12 12M18 6L6 18', send: 'M3 11.5L21 3l-8.5 18-2.5-7.5L3 11.5z'
  };

  // Dossier des images, valable depuis la racine comme depuis articles/ et projets/
  var IMG = (function () {
    var sc = document.querySelector('script[src*="widgets.js"]');
    return sc ? new URL('../img/', sc.src).href : 'assets/img/';
  })();

  function init() {
    if (document.querySelector('.jw-pile')) return;
    document.head.appendChild(el('style', { text: css }));

    // Boutons
    var wa = el('a', { class: 'jw-btn jw-wa', href: WHATSAPP, target: '_blank', rel: 'noopener', 'aria-label': 'Écrire sur WhatsApp', 'data-label': 'WhatsApp' }, [svg(ICO.wa)]);
    // Robot Jerome : corps + deux bras (calques de 178 x 200 px) et bulle de bienvenue
    function robot() {
      var calque = function (nom, classe) { return el('img', { src: IMG + nom, alt: '', width: '178', height: '200', class: classe || '' }); };
      var queue = document.createElementNS(NS, 'svg');
      queue.setAttribute('class', 'jw-queue'); queue.setAttribute('viewBox', '0 0 120 135'); queue.setAttribute('aria-hidden', 'true');
      var tri = document.createElementNS(NS, 'polygon'); tri.setAttribute('points', '62,54 129,35 129,63'); queue.appendChild(tri);
      var parole = el('span', { class: 'jw-parole', 'aria-hidden': 'true' }, [queue, el('span', { class: 'jw-bulle', text: 'Bonjour, bienvenue à Jerome Innovation et Technologie' })]);
      var yeux = el('span', { class: 'jw-yeux', 'aria-hidden': 'true' }, [el('span', { class: 'jw-oeil jw-oeil-g' }), el('span', { class: 'jw-oeil jw-oeil-d' })]);
      return el('span', { class: 'jw-robot' }, [calque('assistant-corps.png'), yeux, calque('assistant-bras-g.png', 'jw-bras-g'), calque('assistant-bras-d.png', 'jw-bras-d'), parole]);
    }
    var bot = el('button', { type: 'button', class: 'jw-btn jw-bot', 'aria-label': 'Ouvrir l’assistant de discussion', 'aria-expanded': 'false', 'aria-controls': 'jw-panel', 'data-label': 'Assistant' }, [robot()]);
    var top = el('button', { type: 'button', class: 'jw-btn jw-top', 'aria-label': 'Revenir en haut de la page' }, [svg(ICO.up, { stroke: true })]);
    var theme = el('button', { type: 'button', class: 'jw-btn jw-theme', 'data-label': 'Mode sombre' });
    var majTheme = function () {
      var sombre = window.jitTheme && window.jitTheme.get() === 'dark';
      theme.replaceChildren(svg(sombre ? ICO.soleil : ICO.lune, { stroke: true }));
      theme.setAttribute('aria-label', sombre ? 'Passer en mode clair' : 'Passer en mode sombre');
      theme.setAttribute('aria-pressed', sombre ? 'true' : 'false');
      theme.setAttribute('data-label', sombre ? 'Mode clair' : 'Mode sombre');
    };
    theme.addEventListener('click', function () { if (window.jitTheme) window.jitTheme.bascule(); });
    document.documentElement.addEventListener('themechange', majTheme);
    majTheme();
    // Deux boutons de chaque côté : WhatsApp et assistant à gauche, thème et retour en haut à droite
    var pile = el('div', { class: 'jw-pile' }, [wa, bot]);
    var pileDroite = el('div', { class: 'jw-pile jw-droite' }, [theme, top]);

    // Panneau de discussion
    var close = el('button', { type: 'button', class: 'jw-x', 'aria-label': 'Fermer l’assistant' }, [svg(ICO.close, { stroke: true })]);
    var log = el('div', { class: 'jw-log', role: 'log', 'aria-live': 'polite', 'aria-label': 'Conversation' });
    var chips = el('div', { class: 'jw-chips', role: 'group', 'aria-label': 'Sujets proposés' });
    var champ = el('input', { type: 'text', id: 'jw-champ', placeholder: 'Posez votre question', autocomplete: 'off', maxlength: '200' });
    var form = el('form', { class: 'jw-form' }, [
      el('label', { for: 'jw-champ', class: 'jw-vh', text: 'Votre question' }), champ,
      el('button', { type: 'submit', 'aria-label': 'Envoyer' }, [svg(ICO.send)])
    ]);
    var panel = el('section', { class: 'jw-panel', id: 'jw-panel', role: 'dialog', 'aria-label': 'Assistant Jerome', hidden: '' }, [
      el('div', { class: 'jw-tete' }, [
        el('span', { class: 'jw-av' }, [el('img', { src: IMG + 'assistant-tete.png', alt: '', width: '120', height: '120' })]),
        el('div', {}, [el('b', { text: 'Assistant Jerome' }), el('small', { text: 'Réponses automatiques, tirées du site' })]),
        close
      ]), log, chips, form
    ]);
    document.body.appendChild(pile); document.body.appendChild(pileDroite); document.body.appendChild(panel);

    // Conversation
    function bulle(kind, texte, liens) {
      var m = el('div', { class: 'jw-m ' + kind }, [el('p', { text: texte })]);
      if (liens && liens.length) {
        var box = el('div', { class: 'jw-l' });
        liens.forEach(function (l) {
          var a = el('a', { href: l.h, text: l.t });
          if (l.ext) { a.target = '_blank'; a.rel = 'noopener'; }
          box.appendChild(a);
        });
        m.appendChild(box);
      }
      log.appendChild(m); log.scrollTop = log.scrollHeight; return m;
    }
    function poser(question, rep) {
      if (question) bulle('jw-u', question);
      var attente = el('div', { class: 'jw-saisie', 'aria-hidden': 'true' }, [el('i'), el('i'), el('i')]);
      log.appendChild(attente); log.scrollTop = log.scrollHeight;
      setTimeout(function () { attente.remove(); bulle('jw-b', rep.r, rep.l); }, reduit ? 0 : 450);
    }
    SUJETS.forEach(function (s) {
      if (!s.chip) return;
      chips.appendChild(el('button', { type: 'button', text: s.chip }));
      chips.lastChild.addEventListener('click', function () { poser(s.chip, s); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = champ.value.trim(); if (!q) return;
      champ.value = ''; poser(q, repondre(q));
    });

    var accueilFait = false;
    function ouvrir() {
      panel.hidden = false; pile.classList.add('jw-cache'); bot.setAttribute('aria-expanded', 'true');
      if (!accueilFait) { accueilFait = true; bulle('jw-b', 'Bonjour ! Je suis l’assistant du site. Je réponds à partir des informations publiées ici. Choisissez un sujet ou posez votre question.'); }
      champ.focus();
    }
    function fermer() {
      panel.hidden = true; pile.classList.remove('jw-cache'); bot.setAttribute('aria-expanded', 'false'); bot.focus();
    }
    bot.addEventListener('click', ouvrir);
    close.addEventListener('click', fermer);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) fermer(); });

    // Retour en haut
    function onScroll() { top.classList.toggle('jw-on', window.scrollY > 600); }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduit ? 'auto' : 'smooth' }); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
