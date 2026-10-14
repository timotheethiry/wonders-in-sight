# Wonders In Sight

Galerie photographique personnelle — Next.js, React et Contentful

## Description

Wonders In Sight est un site personnel consacré à la photographie. Il propose deux expériences complémentaires : une sélection éditoriale sur la page d'accueil et des galeries thématiques permettant d'explorer les photographies par sujet.

Le projet privilégie une approche minimaliste et contemplative, dans laquelle les photographies occupent la place centrale. La typographie, les transitions et les interactions accompagnent la consultation sans détourner l'attention des images.

Le site s'appuie sur Contentful pour la gestion des photographies et sur Next.js pour le rendu des pages, le routage et le référencement.

## Fonctionnalités principales

- **Sélection éditoriale** : principe d'une sélection de photographies mises en avant sur la page d'accueil, distincte du classement thématique.
- **Galeries thématiques** : pages dédiées aux différents thèmes photographiques.
- **Modale photographique** : affichage agrandi des images, avec titre, lieu et récit éventuel.
- **Navigation** : accès aux pages thématiques par leur URL et depuis la navigation du site.
- **Mode clair et mode sombre** : prise en compte des préférences du système et possibilité de choisir son mode d'affichage.
- **Gestion des contenus** : récupération des photographies et de leurs métadonnées depuis Contentful.
- **Référencement** : prise en compte des métadonnées et du partage des contenus.
- **Mise en page responsive** : adaptation aux différentes tailles d'écran.

## Stack technique

| Technologie | Utilisation |
| --- | --- |
| Next.js 16 — App Router | Routage, rendu des pages et métadonnées |
| React | Composants et interactions |
| TypeScript | Typage et fiabilité du code |
| Tailwind CSS v4 | Mise en forme |
| Contentful | Gestion des contenus photographiques |
| npm | Gestion des dépendances |
| Vercel | Plateforme de déploiement retenue |

## Architecture

L'application repose sur deux types de pages principaux :

- `/` : page d'accueil présentant une sélection éditoriale.
- `/theme/[slug]` : page thématique identifiée par un slug.

Les thèmes actuellement définis sont :

- `paysages`
- `structure`
- `voyages`
- `nature`

La configuration des thèmes est centralisée dans `src/data/themes.ts`, afin de faciliter leur évolution tout en conservant des URL stables.

Le composant `src/components/PhotoGallery.tsx` est partagé entre les pages. Il gère l'affichage des photographies et leur consultation dans une modale native `<dialog>`. La galerie utilise une mise en page en colonnes CSS et des animations d'ouverture et de fermeture.

La récupération et la transformation des données du CMS sont centralisées dans `src/lib/contentful.ts`. Les pages utilisent ensuite le composant de galerie pour afficher les photographies.

### Organisation des principaux fichiers

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

Cette arborescence présente les principaux fichiers connus du projet ; elle ne constitue pas un inventaire exhaustif.

## Contentful

Les photographies sont récupérées depuis le type de contenu `photoWondersInSight`.

Le module `src/lib/contentful.ts` :

- initialise le client Contentful à partir des variables d'environnement ;
- récupère les entrées photographiques avec `include: 1` pour accéder aux ressources liées, notamment aux fichiers image ;
- transforme les données du CMS en objets consommés par la galerie ;
- convertit les URL d'images commençant par `//` en URL HTTPS ;
- écarte les entrées dont la ressource image ou l'URL du fichier est absente.

Les données de la galerie comprennent notamment les propriétés `id`, `title`, `theme`, `lieu`, `image` et `alt`. Les identifiants des entrées Contentful sont des chaînes de caractères.

**Localisation :** Contentful fournit des coordonnées géographiques (`lat` et `lon`) dans le champ `location`. À ce stade, ces coordonnées peuvent être affichées telles quelles dans les informations de la photographie. Leur conversion en nom de lieu lisible constitue une évolution distincte.

### Variables d'environnement

Créer un fichier `.env.local` à la racine du projet et y définir :

```dotenv
CONTENTFUL_SPACE_ID=...
CONTENTFUL_ACCESS_TOKEN=...
CONTENTFUL_ENVIRONMENT=master
```

`CONTENTFUL_ENVIRONMENT` est facultative dans le code actuel : si elle n'est pas définie, l'environnement `master` est utilisé.

Les valeurs réelles doivent rester confidentielles. Le fichier `.env.local` ne doit pas être versionné dans Git. Les variables nécessaires à Contentful doivent également être configurées dans l'environnement de déploiement.

Le client Contentful est réservé au serveur via l'import `server-only`. Les identifiants et jetons d'accès ne doivent pas être exposés au navigateur.

## Installation et lancement

### Prérequis

- [Node.js](https://nodejs.org/)
- npm
- Un accès à Contentful et les paramètres nécessaires à la connexion au CMS

### Installation

```bash
git clone <URL_DU_DEPOT>
cd <NOM_DU_DEPOT>
npm install
```

Configurer ensuite les variables d'environnement décrites dans la section Contentful.

### Développement

```bash
npm run dev
```

L'application est normalement accessible à l'adresse [http://localhost:3000](http://localhost:3000).

### Vérification avant livraison

```bash
npx tsc --noEmit
npm run build
```

La première commande vérifie les types TypeScript. La seconde vérifie la compilation de production. Les commandes de lint et de test sont à exécuter selon les scripts définis dans `package.json`.

### Chargement asynchrone

La récupération des photographies depuis Contentful est asynchrone. Les pages concernées encadrent les composants qui attendent les données avec React `<Suspense>`, afin de permettre à Next.js de gérer l'affichage pendant leur chargement.

Cette utilisation de `<Suspense>` gère l'attente des données ; elle ne constitue pas, à elle seule, une stratégie de mise en cache.

## Principes de conception

- Placer la photographie au centre de l'expérience.
- Distinguer la sélection éditoriale de l'accueil des galeries thématiques.
- Centraliser la configuration des thèmes.
- Réutiliser les composants lorsque cela simplifie réellement la maintenance.
- Privilégier les solutions natives et les dépendances minimales.
- Maintenir une expérience cohérente entre les modes clair et sombre.
- Préserver la lisibilité, l'accessibilité et les performances.
- Concevoir les interactions et les animations au service de la contemplation.
- Séparer la récupération des contenus du CMS de leur présentation.
- Ne jamais exposer les secrets de connexion à Contentful.

## Documentation complémentaire

- [Décisions structurantes](./docs/decisions-structurantes.md)

Ce document rassemble les principaux choix techniques et éditoriaux du projet, leur justification et les principes à conserver lors des évolutions.

## Déploiement

Le déploiement est prévu sur [Vercel](https://vercel.com/). La configuration de production doit inclure les variables d'environnement nécessaires à Contentful, sans exposer les jetons d'accès au client.

## Licence

La licence du projet reste à préciser. Aucun régime de licence particulier n'est présumé dans cette documentation.
