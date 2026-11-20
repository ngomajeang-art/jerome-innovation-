# Jerome Innovation et Technologie : maquette du site

Site statique (HTML + Tailwind CSS par CDN). Aucune installation : ouvrir `index.html` dans le navigateur.

## Organisation

```
index.html                  Accueil
a-propos.html  solutions.html  categories.html  realisations.html  actualites.html
carrieres.html  contact.html  devis.html
mentions-legales.html  confidentialite.html
articles/                   6 articles d'actualité
projets/                    6 études de cas (réalisations)
assets/
  css/   base.css           socle commun à toutes les pages (reset, composants)
         sombre.css         mode sombre (palette et corrections, activé par data-theme="dark")
         accueil.css        styles propres à l'accueil (héros animé, FAQ, pôles)
  js/    tailwind-config.js couleurs de la marque, polices, animations Tailwind
         main.js            en-tête, menu mobile, formulaires, filtres, lettre d'information
         accueil.js         carrousel du héros, cartes de réalisations
         animations.js      entrée du héros, apparition au défilement, compteurs
         widgets.js         boutons flottants : WhatsApp et assistant (à gauche), thème et retour en haut (à droite)
         theme.js           thème clair / sombre : appliqué avant l'affichage, choix mémorisé
         precharge.js       écran de chargement avec le logo (à chaque page)
  img/   logo.png  favicon.png
         hero/              images du carrousel de l'accueil (sujets détourés, drones animés)
         hero/sources/      images d'origine, gardées pour refaire les versions animées
         produits/          16 photos de la page Catégories (Wikimedia Commons, crédits dans les mentions légales)
  fonts/ sora-700.woff2  dm-sans-600.woff2
_sauvegardes/               copies de sauvegarde (non utilisées par le site)
```

## Comment ça marche

- **Chaque page charge** `assets/css/base.css`, puis Tailwind (CDN) et `assets/js/tailwind-config.js`, puis les scripts en fin de page. Le CSS du socle est chargé **avant** Tailwind : les classes utilitaires gardent toujours la priorité.
- **L'en-tête, le pied de page et la barre d'infos sont recopiés dans chaque page** (pas d'outil de génération). Une modification de ces blocs doit être refaite dans les 22 pages.
- Les pages dans `articles/` et `projets/` utilisent des chemins en `../` ; ne pas les déplacer sans les mettre à jour.
- `widgets.js` retrouve la racine du site à partir de son propre emplacement : ses liens fonctionnent depuis tous les dossiers.
- **Mode sombre** : bouton soleil / lune parmi les boutons flottants ; sans choix du visiteur, le site suit le réglage de son appareil. Pour une nouvelle couleur claire ajoutée dans une classe Tailwind, ajouter sa version sombre dans `assets/css/sombre.css`.
- Les polices sont chargées depuis `assets/fonts/`. Ouvert directement depuis le disque dans **Firefox**, les pages de `articles/` et `projets/` peuvent afficher la police de secours (limite de sécurité de Firefox sur `file://`) ; en ligne ou dans Chrome, aucun problème.

## Reste à faire avant la mise en ligne

- Logos des partenaires de l'accueil : encore des cases « Logo partenaire ».
- Boutons FR / EN : l'affichage change mais le site n'est pas traduit.
- Liens Facebook et LinkedIn du pied de page : adresses génériques, à remplacer par celles de l'entreprise.
- Photos : images d'exemple (Unsplash pour le site, Wikimedia Commons pour la page Catégories) à remplacer par de vraies photos de l'entreprise ; les crédits sont dans les mentions légales (section 5).
- Textes des articles et des projets : exemples à faire relire.
