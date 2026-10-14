# Wonders In Sight

**Galerie photographique personnelle — Next.js, React et Contentful**

## Description

Wonders In Sight est un site personnel consacré à la photographie. Il propose une galerie visuelle organisée autour de deux expériences complémentaires : une sélection éditoriale sur la page d'accueil et des galeries thématiques permettant d'explorer les photographies par sujet.

Le projet privilégie une approche minimaliste et contemplative, dans laquelle les photographies occupent la place centrale. La typographie, les transitions et les interactions sont conçues pour accompagner la consultation sans détourner l'attention des images.

Le site s'appuie sur Contentful pour la gestion des photographies et sur Next.js pour le rendu des pages, le routage et le référencement.

## Fonctionnalités principales

- **Sélection éditoriale** : choix explicite des photographies mises en avant sur la page d'accueil.
- **Galeries thématiques** : pages dédiées aux différents thèmes photographiques.
- **Modale photographique** : affichage agrandi des images, avec titre, lieu et récit éventuel.
- **Navigation** : accès aux pages thématiques par leur URL et depuis la navigation du site.
- **Mode clair et mode sombre** : prise en compte des préférences du système et possibilité de choisir son mode d'affichage.
- **Gestion des contenus** : récupération des photographies depuis Contentful.
- **Référencement** : métadonnées adaptées aux pages et partage des contenus.
- **Mise en page responsive** : adaptation aux différentes tailles d'écran.

## Stack technique

| Technologie | Utilisation |
|---|---|
| Next.js — App Router | Routage et rendu des pages |
| React | Composants et interactions |
| TypeScript | Typage et fiabilité du code |
| Tailwind CSS v4 | Mise en forme |
| Contentful | Gestion des contenus photographiques |
| npm | Gestion des dépendances |
| Vercel | Hébergement et déploiement prévus |

## Architecture

L'application repose sur deux types de pages principaux :

- `/` : page d'accueil présentant une sélection éditoriale.
- `/theme/[slug]` : page thématique identifiée par un slug.

Les thèmes actuellement définis sont :

- `paysages`
- `architecture`
- `voyages`
- `noir-et-blanc`

La configuration des thèmes est centralisée dans `themes.ts`, afin de faciliter leur évolution tout en conservant des URL stables.

Le composant `PhotoGallery` est partagé entre les pages. Il gère l'affichage des photographies et la modale de consultation. Cette séparation permet de mutualiser le comportement de la galerie sans dupliquer son implémentation.

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

Configurer ensuite les variables d'environnement nécessaires à Contentful, conformément aux noms utilisés dans le projet. Ne jamais publier les secrets ou jetons d'accès.

### Développement

```bash
npm run dev
```

L'application est normalement accessible à l'adresse `http://localhost:3000`.

### Vérification avant livraison

```bash
npm run build
```

Cette commande permet de vérifier que l'application peut être compilée pour la production. Les éventuelles commandes de lint et de test sont à exécuter selon les scripts définis dans `package.json`.

## Principes de conception

- Placer la photographie au centre de l'expérience.
- Distinguer la sélection éditoriale de l'accueil des galeries thématiques.
- Centraliser la configuration des thèmes.
- Réutiliser les composants lorsque cela simplifie réellement la maintenance.
- Privilégier les solutions natives et les dépendances minimales.
- Maintenir une expérience cohérente entre les modes clair et sombre.
- Préserver la lisibilité, l'accessibilité et les performances.
- Concevoir les interactions et les animations au service de la contemplation.

## Documentation complémentaire

- [Décisions structurantes](./docs/decisions-structurantes.md)

Ce document rassemble les principaux choix techniques et éditoriaux du projet, leur justification et les principes à conserver lors des évolutions.

## Déploiement

Le déploiement est prévu sur [Vercel](https://vercel.com/). La configuration de production doit inclure les variables d'environnement nécessaires à Contentful.

## Licence

La licence du projet reste à préciser. Aucun régime de licence particulier n'est présumé dans cette documentation.