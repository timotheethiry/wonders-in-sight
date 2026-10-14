# Wonders In Sight

Galerie photographique personnelle développée avec Next.js, React, TypeScript et Contentful.

## Présentation

Wonders In Sight propose deux expériences complémentaires : une sélection éditoriale sur la page d’accueil et des galeries permettant d’explorer les photographies par thème.

L’interface privilégie une approche éditoriale et minimaliste, plaçant les photographies au centre de l’expérience.

## Fonctionnalités

- **Accueil éditorial** : sélection indépendante des galeries thématiques, pilotée par le champ Contentful `featuredOnHome`.
- **Galeries thématiques** : pages accessibles via `/theme/[slug]`.
- **Consultation des photos** : galerie en colonnes CSS et modale native HTML `<dialog>` avec animations.
- **Navigation** : accès aux thèmes depuis l’interface commune.
- **Modes clair et sombre** : présentation adaptée à chaque mode.
- **Contentful** : récupération des photographies et de leurs métadonnées.
- **SEO** : métadonnées globales et spécifiques aux pages thématiques.
- **Responsive design** : interface adaptée aux différentes tailles d’écran.

## Stack technique

| Technologie | Utilisation |
| --- | --- |
| Next.js 16 — App Router | Routage, rendu et métadonnées |
| React | Composants et interactions |
| TypeScript | Typage |
| Tailwind CSS v4 | Styles et responsive design |
| Contentful | Gestion des contenus |
| npm / Git | Dépendances et versions |
| Vercel | Plateforme de déploiement prévue |

## Architecture

Les principales routes sont :

- `/` : sélection éditoriale.
- `/theme/[slug]` : galerie thématique. Un slug inconnu renvoie une page 404.

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
│   ├── page.tsx
│   └── theme/
│       └── [slug]/
│           └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── PhotoGallery.tsx
├── data/
│   └── themes.ts
└── lib/
    └── contentful.ts
```

`src/lib/contentful.ts` centralise la récupération et la transformation des contenus. `PhotoGallery.tsx` est partagé entre les pages. Le layout global intègre notamment l’en-tête et le pied de page.

Cette arborescence présente les principaux fichiers, sans prétendre être exhaustive.

## Contentful

Les photographies proviennent du type de contenu `photoWondersInSight`. Le module `src/lib/contentful.ts` initialise le client, récupère les entrées et prépare les données consommées par les pages. Les entrées sans URL d’image exploitable sont écartées et les URL commençant par `//` sont converties en HTTPS.

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
npm run build
```

Les scripts de lint et de test éventuels sont à consulter dans `package.json`.

Les pages récupèrent les contenus de manière asynchrone et utilisent React `Suspense` pour encadrer l’attente des données. Cela ne définit pas, à lui seul, une stratégie de mise en cache.

## Principes de conception

- Placer les photographies au centre de l’expérience.
- Distinguer la sélection éditoriale des galeries thématiques.
- Centraliser les données et la configuration des thèmes.
- Séparer la récupération des contenus de leur présentation.
- Privilégier les solutions natives et limiter les dépendances.
- Préserver l’accessibilité, la lisibilité et les performances.
- Réutiliser les variables visuelles existantes.
- Ne jamais exposer les secrets de connexion.
- Éviter les modifications architecturales sans nécessité identifiée.

## Documentation complémentaire

Voir [`docs/decisions-structurantes.md`](./docs/decisions-structurantes.md) pour les choix techniques et éditoriaux à préserver lors des évolutions.

## Déploiement

Le déploiement est prévu sur [Vercel](https://vercel.com/). Les variables d’environnement nécessaires à Contentful doivent y être configurées.

## Licence

La licence du projet reste à préciser. Aucun régime de licence particulier n’est présumé.

*Ce document doit rester concis et refléter l'implémentation réelle, en conservant ce qui est utile au quotidien. Toute évolution significative d'une décision doit être répercutée ici et, si nécessaire, dans le `docs/decisions-structurantes.md`.*
