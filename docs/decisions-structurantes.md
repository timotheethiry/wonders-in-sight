# Wonders In Sight — Décisions structurantes

Ce document rassemble les décisions techniques, fonctionnelles et éditoriales qui guident l'évolution de Wonders In Sight. Il complète le [README](../README.md), sans remplacer la documentation de l'installation ou du fonctionnement du projet.

Les décisions décrivent l'architecture retenue et les contraintes à préserver. Les pistes d'évolution ne sont pas considérées comme des fonctionnalités réalisées.

## 1. Architecture et technologies

### 1.1. Stack technique

**Décision :** utiliser Next.js 16 avec l'App Router, React, TypeScript et Tailwind CSS v4.

**Justification :** bénéficier du routage par fichiers, du rendu serveur, des métadonnées SEO et d'une base de code typée, sans multiplier les abstractions.

Vercel est la plateforme de déploiement retenue, pour son adaptation à l'écosystème Next.js.

### 1.2. Séparation des responsabilités

**Décision :** séparer la récupération des contenus, les données de configuration et leur présentation.

- `src/lib/contentful.ts` centralise l'accès au CMS et l'adaptation des données.
- `src/data/themes.ts` centralise la configuration des thèmes.
- `src/components/PhotoGallery.tsx` gère l'affichage des photographies et leur consultation.
- `src/app/` contient les pages, le layout et le template de l'application.
- `src/components/` contient les composants d'interface réutilisables, notamment les états de chargement.

Les composants de présentation ne doivent pas dépendre directement de la structure brute des réponses de Contentful.

### 1.3. Dépendances

**Décision :** privilégier les fonctionnalités natives et les dépendances minimales.

Toute nouvelle dépendance doit répondre à un besoin identifié et faire l'objet d'un arbitrage préalable.

## 2. Gestion des contenus

### 2.1. Contentful

**Décision :** utiliser Contentful comme CMS pour les photographies et leurs informations éditoriales.

Le type de contenu utilisé est `photoWondersInSight`. Le module `src/lib/contentful.ts` récupère les entrées, notamment avec `include: 1` pour accéder aux ressources liées, et transforme les données en objets adaptés à l'application.

Le modèle exploité comprend notamment les identifiants Contentful, le titre, le thème, l'image et ses métadonnées. Les identifiants restent des chaînes de caractères. Les URL d'images commençant par `//` sont converties en URL HTTPS et les entrées sans image exploitable sont écartées.

La localisation utilise deux champs distincts : `location` pour les coordonnées géographiques et `locationName` pour le nom lisible du lieu. Aucun géocodage n'est effectué.

Toute évolution du modèle Contentful doit être répercutée dans la couche d'adaptation et dans les types de l'application.

**Sécurité :** le client Contentful est réservé au serveur. Les paramètres de connexion sont fournis par les variables d'environnement `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN` et, facultativement, `CONTENTFUL_ENVIRONMENT` (valeur par défaut : `master`). Les secrets ne doivent être ni versionnés ni exposés au navigateur.

### 2.2. Sélection éditoriale de l'accueil

**Décision :** distinguer la sélection éditoriale de la page d'accueil des galeries thématiques.

Le champ Contentful `featuredOnHome` identifie les photographies mises en avant sur l'accueil. Une photographie peut ainsi figurer dans cette sélection tout en restant accessible depuis son thème.

L'ordre de la sélection suit actuellement l'ordre de réception des photographies depuis Contentful.

**Justification :** l'accueil constitue un choix éditorial indépendant du classement thématique.

### 2.3. Thèmes

**Décision :** centraliser les thèmes dans `src/data/themes.ts`, avec un slug, un libellé et une description.

Les slugs actuels sont :

- `paysages`
- `structure`
- `voyages`
- `nature`

Les valeurs de thème issues de Contentful doivent correspondre aux slugs utilisés par l'application.

## 3. Pages, navigation et chargement

### 3.1. Accueil et pages thématiques

**Décision :** proposer deux expériences complémentaires :

- `/` : sélection éditoriale indépendante des thèmes.
- `/theme/[slug]` : galerie dédiée à un thème, accessible directement par URL et indexable.

Les pages thématiques utilisent la configuration centralisée des thèmes. Un slug inconnu déclenche `notFound()` et affiche la page 404 personnalisée de `src/app/not-found.tsx`.

Les thèmes sans photographie ne doivent pas être proposés comme destinations dans la navigation.

### 3.2. Chargement et transitions

**Décision :** utiliser les composants serveur pour la récupération des données et React `Suspense` lorsque le rendu asynchrone le nécessite.

Les paramètres dynamiques sont traités conformément à la version de Next.js utilisée, notamment sous forme de `Promise` dans les pages concernées par Next.js 16.

Les états de chargement utilisent des squelettes adaptés à la structure des pages et des galeries. `src/components/GallerySkeleton.tsx` fournit un état de chargement réutilisable, notamment dans les pages thématiques.

Le template `src/app/template.tsx` permet d'appliquer une animation d'entrée au contenu lors des navigations. Des animations complémentaires accompagnent l'entrée de la marque et de la galerie d'accueil.

Les animations doivent respecter la préférence système `prefers-reduced-motion`.

`Suspense` gère l'attente du rendu asynchrone ; il ne définit pas, à lui seul, une stratégie de mise en cache.

### 3.3. Référencement

**Décision :** produire des métadonnées cohérentes avec le contenu réel de chaque page.

Les photographies et leurs sujets doivent rester prioritaires dans les titres et descriptions, tout en conservant « Wonders In Sight » comme identité de marque.

Les métadonnées spécifiques aux pages thématiques et les informations de partage doivent rester cohérentes avec leur contenu.

## 4. Galerie et consultation

### 4.1. Galerie partagée

**Décision :** mutualiser l'affichage des photographies dans `PhotoGallery`.

Le composant reçoit des données déjà adaptées au modèle de l'application et reste indépendant de leur provenance.

La galerie utilise des colonnes CSS pour obtenir une disposition de type masonry, sans dépendance dédiée. Le nombre de colonnes et la largeur maximale s'adaptent à la taille de l'écran, avec un centrage horizontal.

Le composant `GallerySkeleton` fournit un état de chargement visuel cohérent avec cette présentation.

### 4.2. Modale photographique

**Décision :** utiliser l'élément HTML natif `<dialog>` pour afficher une photographie agrandie.

Les animations d'ouverture et de fermeture reposent sur des états React et les classes CSS associées, notamment `is-visible` et `is-closing`.

Les évolutions de la récupération des données et de la présentation ne doivent pas altérer le fonctionnement de la modale ni la consultation au clavier.

### 4.3. Récit photographique

**Orientation éditoriale :** permettre d'accompagner certaines photographies d'un récit personnel via le champ `narrative`.

Lorsque cette fonctionnalité est présente, le récit doit rester secondaire par rapport à l'image, avec une présentation lisible et un défilement indépendant si nécessaire. En son absence, la composition ne doit pas conserver une colonne vide.

L'intégration effective de ce champ dans les données et dans l'interface doit être vérifiée avant de considérer la fonctionnalité comme entièrement achevée.

## 5. Identité visuelle

### 5.1. Direction artistique

**Décision :** privilégier une esthétique éditoriale, minimaliste et contemplative.

Les espaces, la typographie et les animations servent la lecture des images. Les éléments décoratifs gratuits, les étiquettes génériques et les interactions superflues sont à éviter.

Les interactions avec les photographies restent discrètes : variation de luminosité au survol et curseur indiquant la possibilité de cliquer.

Les pages thématiques comprennent un titre en police serif et une description spécifique au thème, dans un en-tête éditorial distinct de l'en-tête global du site.

### 5.2. Modes clair et sombre

**Décision :** proposer des modes clair et sombre en cohérence avec la palette du projet.

Le mode sombre est utilisé par défaut et l'utilisateur peut choisir son mode d'affichage.

Les composants réutilisent les variables et classes de couleur existantes plutôt que d'introduire des couleurs arbitraires.

## 6. Principes transversaux

Les évolutions doivent respecter les principes suivants :

- Préserver les performances, l'accessibilité et la navigation au clavier.
- Adapter l'interface aux différentes tailles d'écran.
- Respecter les préférences de réduction des animations.
- Maintenir la séparation entre données, logique métier et présentation.
- Éviter les dépendances et les abstractions injustifiées.
- Ne pas modifier l'architecture ou les décisions validées sans nécessité identifiée et arbitrage explicite.

## 7. Points restant à vérifier

Les éléments suivants ne doivent être considérés comme terminés qu'après vérification de l'implémentation :

- L'intégration complète du champ `narrative` dans les données et l'interface.
- La stratégie de mise en cache et d'optimisation des requêtes Contentful.
- Les éventuelles optimisations complémentaires du chargement des images.

Ces points constituent des pistes de travail, pas des décisions d'architecture supplémentaires.

---

*Ce document doit rester concis et refléter l'implémentation réelle. Toute évolution significative d'une décision doit être répercutée ici et, si nécessaire, dans le README.*
