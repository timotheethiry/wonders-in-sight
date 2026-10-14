# Wonders In Sight

Galerie photographique personnelle développée avec Next.js, React, TypeScript, Tailwind CSS et Contentful.

## Présentation

Wonders In Sight propose deux expériences complémentaires : une sélection éditoriale sur la page d’accueil et des galeries permettant d’explorer les photographies par thème.

L’interface privilégie une approche éditoriale et minimaliste, plaçant les photographies au centre de l’expérience.

## Fonctionnalités

- **Accueil éditorial** : sélection indépendante des galeries thématiques, pilotée par le champ Contentful `featuredOnHome`.
- **Galeries thématiques** : pages accessibles via `/theme/[slug]`.
- **Consultation des photos** : galerie responsive en colonnes CSS et modale native HTML `<dialog>` avec animations.
- **Interactions** : variation de luminosité au survol et curseur indiquant les photographies cliquables.
- **Navigation** : en-tête et pied de page communs, accès aux thèmes depuis l’interface.
- **Transitions et animations** : apparition progressive du contenu, animation d’entrée de la galerie d’accueil et transitions entre les pages.
- **Chargement progressif** : squelettes de chargement pour les galeries, avec React `Suspense`.
- **Page 404 personnalisée** : présentation cohérente avec l’identité visuelle du site.
- **Modes clair et sombre** : thème sombre privilégié, thème clair en alternative.
- **Contentful** : récupération des photographies et de leurs métadonnées.
- **SEO** : métadonnées globales, Open Graph et métadonnées spécifiques aux pages thématiques.
- **Responsive design** : mise en page adaptée aux différentes tailles d’écran.

## Stack technique

| Technologie | Utilisation |
| --- | --- |
| Next.js 16 — App Router | Routage, rendu et métadonnées |
| React 19 | Composants et interactions |
| TypeScript | Typage |
| Tailwind CSS v4 | Styles et responsive design |
| Contentful | Gestion des contenus |
| npm / Git | Dépendances et versions |
| Vercel | Plateforme de déploiement prévue |

## Architecture

Les principales routes sont :

- `/` : sélection éditoriale.
- `/theme/[slug]` : galerie thématique. Un slug inconnu renvoie une page 404.
- `not-found.tsx` : page 404 personnalisée.

Les thèmes sont centralisés dans `src/data/themes.ts` :

- `paysages`
- `structure`
- `voyages`
- `nature`

### Fichiers principaux

```text
src/
├── app/
│   ├── layout.tsx
│   ├── template.tsx
│   ├── page.tsx
│   ├── not-found.tsx
│   ├── globals.css
│   └── theme/
│       └── [slug]/
│           └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── PhotoGallery.tsx
│   ├── HomeEntrance.tsx
│   └── GallerySkeleton.tsx
├── data/
│   └── themes.ts
└── lib/
    └── contentful.ts
```

Cette arborescence présente les principaux fichiers, sans prétendre être exhaustive.

`src/lib/contentful.ts` centralise la récupération et la transformation des contenus. `PhotoGallery.tsx` est partagé entre l’accueil et les pages thématiques. `HomeEntrance.tsx` gère l’animation d’entrée de la galerie d’accueil, tandis que `GallerySkeleton.tsx` fournit un état de chargement réutilisable.

Le layout global intègre l’en-tête et le pied de page. `template.tsx` applique la transition d’entrée du contenu lors des navigations. Les animations sont définies dans `globals.css` et respectent la préférence système de réduction des mouvements.

## Contentful

Les photographies proviennent du type de contenu `photoWondersInSight`. Le module `src/lib/contentful.ts` initialise le client, récupère les entrées et prépare les données consommées par les pages.

Les entrées sans URL d’image exploitable sont écartées et les URL commençant par `//` sont converties en HTTPS.

Les données préparées comprennent notamment :

| Propriété | Rôle |
| --- | --- |
| `id` | Identifiant de la photographie |
| `title` | Titre |
| `theme` | Slug du thème |
| `image` | URL de l’image |
| `alt` | Texte alternatif |
| `location` | Coordonnées géographiques |
| `locationName` | Nom lisible du lieu |

La sélection d’accueil repose sur `featuredOnHome` et conserve actuellement l’ordre de réception des photographies depuis Contentful.

Aucun géocodage n’est effectué : les coordonnées et le nom du lieu sont fournis séparément par le CMS.

### Configuration

Créer un fichier `.env.local` à la racine du projet :

```dotenv
CONTENTFUL_SPACE_ID=...
CONTENTFUL_ACCESS_TOKEN=...
CONTENTFUL_ENVIRONMENT=master
```

`CONTENTFUL_ENVIRONMENT` est facultative : sa valeur par défaut est `master`.

Les identifiants doivent rester confidentiels. Ne jamais versionner `.env.local` ni exposer les jetons au navigateur. Le client Contentful est réservé au serveur via `server-only`. Les variables nécessaires doivent également être configurées dans l’environnement de déploiement.

## Installation et développement

**Prérequis :** Node.js, npm et un accès configuré à Contentful.

```bash
git clone <URL_DU_DEPOT>
cd <NOM_DU_DEPOT>
npm install
```

Configurer ensuite `.env.local`, puis lancer le serveur :

```bash
npm run dev
```

L’application est normalement accessible sur [http://localhost:3000](http://localhost:3000).

### Vérification avant livraison

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Les pages récupèrent les contenus de manière asynchrone et utilisent React `Suspense` pour encadrer les attentes. Des squelettes de chargement limitent les changements visuels pendant la récupération des données. L’utilisation de `Suspense` ne définit pas, à elle seule, une stratégie de mise en cache.

## Principes de conception

- Placer les photographies au centre de l’expérience.
- Distinguer la sélection éditoriale des galeries thématiques.
- Centraliser les données et la configuration des thèmes.
- Séparer la récupération des contenus de leur présentation.
- Privilégier les solutions natives et limiter les dépendances.
- Préserver l’accessibilité, la lisibilité et les performances.
- Respecter les préférences de réduction des mouvements.
- Réutiliser les variables visuelles existantes.
- Ne jamais exposer les secrets de connexion.
- Éviter les modifications architecturales sans nécessité identifiée.

## Documentation complémentaire

Voir [`docs/decisions-structurantes.md`](./docs/decisions-structurantes.md) pour les choix techniques et éditoriaux à préserver lors des évolutions.

## Déploiement

Le déploiement est prévu sur [Vercel](https://vercel.com/). Les variables d’environnement nécessaires à Contentful doivent y être configurées.

## Licence

La licence du projet reste à préciser. Aucun régime de licence particulier n’est présumé.

*Ce document doit rester concis et refléter l’implémentation réelle. Toute évolution significative d’une décision doit être répercutée ici et, si nécessaire, dans `docs/decisions-structurantes.md`.*
