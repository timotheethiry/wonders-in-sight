# Wonders In Sight

Galerie photographique personnelle développée avec Next.js, React, TypeScript, Tailwind CSS et Contentful.

## Présentation

Wonders In Sight propose une sélection éditoriale sur la page d’accueil et des galeries permettant d’explorer les photographies par thème.

L’interface privilégie une approche minimaliste et contemplative, centrée sur les images.

## Fonctionnalités

- **Accueil éditorial** : sélection indépendante des galeries thématiques, pilotée par le champ Contentful `featuredOnHome`.
- **Galeries thématiques** : pages dédiées accessibles via `/theme/[slug]`.
- **Page À propos** : présentation personnelle, portrait et origine du projet.
- **Consultation des photos** : galerie responsive en colonnes CSS et modale native `<dialog>` avec animations d’ouverture et de fermeture.
- **Navigation** : en-tête, pied de page, navigation thématique et transitions entre les pages.
- **Expérience utilisateur** : animations d’entrée, chargements progressifs avec React `Suspense`, squelettes de chargement et page 404 personnalisée.
- **Thèmes clair et sombre** : thème sombre par défaut, thème clair alternatif, mémorisation du choix et favicon adapté au thème sélectionné.
- **SEO et accessibilité** : métadonnées globales et thématiques, Open Graph et prise en compte de la préférence de réduction des mouvements.
- **Images optimisées** : variantes WebP servies par Contentful, adaptées à la grille et à l’affichage agrandi.

## Stack technique

| Technologie | Utilisation |
| --- | --- |
| Next.js 16 — App Router | Routage, rendu et métadonnées |
| React 19 | Composants et interactions |
| TypeScript | Typage |
| Tailwind CSS v4 | Styles et responsive design |
| Contentful | Gestion des contenus et des images |
| npm / Git | Dépendances et versions |
| GitHub | Hébergement du dépôt source |
| Vercel | Plateforme de déploiement prévue |

## Architecture

### Routes

- `/` : sélection éditoriale.
- `/theme/[slug]` : galerie thématique ; un slug inconnu renvoie une page 404 personnalisée.
- `/a-propos` : présentation personnelle et origine du projet.
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
│   ├── a-propos/
│   │   └── page.tsx
│   └── theme/
│       └── [slug]/
│           └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ThemeToggle.tsx
│   ├── PhotoGallery.tsx
│   ├── HomeEntrance.tsx
│   └── GallerySkeleton.tsx
├── data/
│   └── themes.ts
└── lib/
    └── contentful.ts

public/
└── images/
    └── about/
        └── portrait.JPG
```

Cette arborescence présente les principaux fichiers, sans prétendre être exhaustive. Les icônes du site sont également stockées dans `public/images/`.

- `src/lib/contentful.ts` centralise la récupération et la transformation des contenus.
- `PhotoGallery.tsx` est partagé entre l’accueil et les pages thématiques.
- `ThemeToggle.tsx` gère le changement de thème, la mémorisation du choix et la synchronisation du favicon.
- `HomeEntrance.tsx` gère l’animation d’entrée de la galerie d’accueil.
- `GallerySkeleton.tsx` fournit un état de chargement réutilisable.
- `layout.tsx` intègre les éléments communs, les métadonnées globales et l’initialisation du thème.
- `template.tsx` applique la transition d’entrée lors des navigations.
- `globals.css` centralise les variables visuelles, les transitions et les animations globales.

## Contentful

Les photographies proviennent du type de contenu `photoWondersInSight`. Le module `src/lib/contentful.ts` initialise le client Contentful côté serveur, récupère les entrées et prépare les données consommées par les pages.

Les entrées sans URL d’image exploitable sont écartées. Les URL commençant par `//` sont converties en HTTPS.

### Images

Les URL sont optimisées via l’API Images de Contentful :

- **Galerie** : largeur maximale de 800 px.
- **Modale** : largeur maximale de 1600 px.
- **Format** : WebP.

Les fichiers sources sont préparés avant leur import dans Contentful. Le projet utilise actuellement des balises HTML `<img>` pour les photographies de la galerie, et le composant `next/image` pour le portrait de la page 'À propos'.

### Champs et données

| Champ | Rôle |
| --- | --- |
| `id` | Identifiant de la photographie |
| `title` | Titre |
| `theme` | Slug du thème |
| `image` | URL de l’image destinée à la galerie |
| `imageFull` | URL de l’image destinée à la modale |
| `alt` | Texte alternatif |
| `location` | Coordonnées géographiques |
| `locationName` | Nom lisible facultatif du lieu |
| `narrative` | Texte descriptif complémentaire |
| `featuredOnHome` | Inclusion dans la sélection de l’accueil |

Les coordonnées et le nom lisible du lieu sont distincts. Le nom lisible est renseigné manuellement dans Contentful. Aucun géocodage n’est effectué.

### Sélection éditoriale

`getHomePhotos()` récupère les photographies dont `featuredOnHome` est activé. `getContentfulPhotos()` récupère les photographies destinées aux galeries thématiques.

La sélection de l’accueil suit actuellement l’ordre de réception des données de Contentful.

### Configuration

Créer un fichier `.env.local` à la racine du projet :

```dotenv
CONTENTFUL_SPACE_ID=...
CONTENTFUL_ACCESS_TOKEN=...
CONTENTFUL_ENVIRONMENT=master
```

`CONTENTFUL_ENVIRONMENT` est facultative ; sa valeur par défaut est `master`.

Les identifiants doivent rester confidentiels. Ne jamais versionner `.env.local` ni exposer les jetons au navigateur. Le client Contentful est réservé au serveur via `server-only`. Les variables nécessaires doivent également être configurées dans l’environnement de déploiement.

## Installation et développement

**Prérequis :** Node.js, npm, Git et un accès configuré à Contentful.

```bash
git clone <URL_DU_DEPOT>
cd wonders-in-sight
npm install
```

Configurer ensuite `.env.local`, puis lancer le serveur de développement :

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

Les pages utilisent React `Suspense` pour encadrer les chargements asynchrones et afficher des squelettes pendant l’attente des données. `Suspense` ne définit pas, à lui seul, une stratégie de mise en cache.

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

Le dépôt source est hébergé sur GitHub. Le déploiement sur [Vercel](https://vercel.com/) reste à effectuer.

Les variables d’environnement nécessaires à Contentful devront être configurées dans le projet Vercel avant la mise en production.

## Licence

La licence du projet reste à préciser. Aucun régime de licence particulier n’est présumé.

---

*Ce document doit rester concis et refléter l’implémentation réelle. Toute évolution significative doit être répercutée ici et, si nécessaire, dans `docs/decisions-structurantes.md`.*
