# Portfolio — Nesrine Boussenna

Portfolio React d'une ingénieure en Statistique & Data Science. Thème violet
clair/sombre, portrait extrait du CV, trois visualisations de données et une
couche d'interactions complète (palette de commandes, curseur maison, FLIP,
tilt 3D, compteurs animés).

## Démarrer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # bundle de production dans dist/
npm run preview  # prévisualiser le build
```

Aucune dépendance en dehors de React : toutes les animations et interactions
sont écrites à la main (pas de framer-motion, pas de GSAP, pas de Tailwind).

## Ce que contient la page

| Section | Contenu |
|---------|---------|
| Hero | Titre animé ligne par ligne, portrait incliné en 3D, pastilles flottantes, bandeau de 4 chiffres à compteurs animés |
| Profil | Récit + trois axes de travail en cartes à projecteur |
| Expérience | Onglets verticaux accessibles (STAR, WEVIOO, INS) avec indicateur glissant |
| Projets | 5 projets, filtres animés en FLIP, fiche détaillée en fenêtre modale |
| Compétences | 3 graphiques à barres de maîtrise |
| Parcours | Frise de jalons + radar de domaines + diplômes |
| Contact | Formulaire validé côté client + coordonnées copiables |

## Interactions

- **Palette de commandes** — `Ctrl/⌘ + K` : navigation, copie de l'email,
  téléchargement du CV, bascule de thème. Recherche approximative insensible
  aux accents, navigation complète au clavier.
- **Raccourci `T`** — bascule clair/sombre (inactif pendant la saisie).
- **Thème** — mémorisé dans `localStorage`, appliqué avant le premier rendu par
  un script inline pour éviter le flash clair au chargement.
- **Curseur maison** — point collé au pointeur + anneau amorti, agrandi sur les
  éléments interactifs. Désactivé au doigt et en `prefers-reduced-motion`.
- **Magnétisme** — les boutons principaux suivent légèrement le curseur.
- **FLIP** — au changement de filtre, les cartes glissent de leur ancienne
  position vers la nouvelle (mesure avant rendu, animation de l'écart).
- **Progression de lecture** — barre en haut et anneau autour du bouton
  « retour en haut ».
- **Portrait** — aperçu flou de 16×20 px en base64 pendant le chargement de
  l'image pleine définition (extraite du PDF du CV).

Tout respecte `prefers-reduced-motion`.

## Structure

```
index.html                 polices, métadonnées, script anti-flash de thème
public/                    portrait.jpg/.webp, CV, favicon
src/
  data/content.js          TOUT le contenu éditorial (source unique de vérité)
  data/lqip.js             aperçu basse définition du portrait
  styles/
    tokens.css             jetons clair + sombre (les deux thèmes sont posés)
    global.css             reset, typographie, utilitaires
    components.css         boutons, cartes, nav, onglets, filtres, formulaire
    charts.css             barres, radar, frise
    sections.css           hero, profil, expérience, projets, parcours, contact
    overlays.css           curseur, préchargeur, palette, modale, notifications
  hooks/
    useReveal.js           apparition au défilement
    useScrollState.js      scroll, section active, progression
    useTheme.js            thème persistant
    useInteractions.js     magnétisme, tilt, projecteur, compteur, FLIP, verrou
  components/
    charts/                ProficiencyChart · DomainRadar · Stepper
    *.jsx                  une section ou une couche par fichier
```

## Modifier le contenu

Tout passe par [`src/data/content.js`](src/data/content.js). Aucun texte n'est
codé en dur dans les composants.

### Niveaux de compétence

Les valeurs de `skills` et `domains` sont une **auto-évaluation indicative sur
100** : elles ne figurent pas sur le CV et doivent être relues avant diffusion.
La page l'indique sous le titre de la section Compétences.

## Design

| Rôle | Clair | Sombre |
|------|-------|--------|
| Fond | `#ffffff` | `#0e0d14` |
| Surface | `#ffffff` | `#17161f` |
| Encre | `#14121f` | `#f5f4f9` |
| Marque | `#7c3aed` | `#a78bfa` |
| Accent | `#db2777` | `#f472b6` |

Polices : **Plus Jakarta Sans** (titres, 800), **Inter** (texte),
**JetBrains Mono** (dates, valeurs, touches).

### Palette des graphiques

Séries violet / orange / aqua, validées pour le daltonisme **dans les deux
thèmes**, toutes paires confondues :

| Mode | ΔE CVD min (seuil 8) | ΔE vision normale min (plancher 15) |
|------|----------------------|--------------------------------------|
| Clair (`#4a3aa7`, `#eb6834`, `#1baf7a`) | 9,2 | 27,6 |
| Sombre (`#9085e9`, `#d95926`, `#199e70`) | 9,4 | 24,6 |

L'aqua passe sous 3:1 de contraste en thème clair : chaque barre porte donc une
**étiquette de valeur visible**, la règle de secours associée. Chaque graphique
expose aussi un tableau équivalent masqué (`.sr-only`), une infobulle au survol
et une légende dès deux séries.

## Accessibilité

Lien d'évitement, `:focus-visible` sur tous les éléments actifs, onglets au
clavier (flèches haut/bas, `aria-selected`), piège à focus et restauration du
focus dans la modale, `aria-live` sur le compteur de projets et les
notifications, formulaire avec `aria-invalid` et messages liés par
`aria-describedby`, éléments décoratifs en `aria-hidden`.
