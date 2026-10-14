# Wonders In Sight — Décisions structurantes

Ce document synthétise les décisions techniques, fonctionnelles et éditoriales qui orientent le développement de Wonders In Sight.

Il vise à préserver la cohérence du projet au fil des évolutions et à éviter de remettre en question inutilement des choix déjà validés.

Les décisions sont formulées de manière synthétique. Elles pourront être complétées ou révisées lorsque les besoins du projet évolueront.

## 1. Architecture et technologies

### 1.1. Next.js App Router

**Décision :** utiliser Next.js avec l'App Router.

**Justification :**
- Organiser les pages à partir de l'arborescence de fichiers.
- Disposer d'un routage adapté aux pages thématiques.
- Faciliter le référencement et la génération des métadonnées.
- Séparer les composants de page des composants interactifs lorsque cela est pertinent.

### 1.2. TypeScript et Tailwind CSS

**Décision :** utiliser TypeScript pour le typage et Tailwind CSS v4 pour la mise en forme.

**Justification :** conserver une base de code explicite et faciliter les ajustements visuels sans multiplier les abstractions.

### 1.3. Déploiement

**Décision :** retenir Vercel comme plateforme de déploiement.

**Justification :** disposer d'une solution adaptée à l'écosystème Next.js.

## 2. Gestion des contenus

### 2.1. Contentful comme CMS

**Décision :** utiliser Contentful pour gérer les photographies et les informations éditoriales associées.

**Justification :**
- Séparer les contenus du code de l'application.
- Faciliter la mise à jour des photographies et de leurs métadonnées.
- Permettre l'enrichissement progressif du fonds photographique.

Les transformations et les données effectivement fournies par Contentful doivent rester cohérentes avec le modèle de données consommé par l'application.

### 2.2. Configuration centralisée des thèmes

**Décision :** centraliser la configuration des thèmes dans `themes.ts`.

**Justification :** éviter de disperser les libellés, les identifiants et les slugs dans plusieurs composants.

Les slugs des pages thématiques doivent rester stables afin de préserver la cohérence de la navigation et des URL.

### 2.3. Sélection éditoriale de la page d'accueil

**Décision :** distinguer la sélection éditoriale de l'accueil de l'ensemble des photographies disponibles dans les galeries thématiques.

**Justification :** l'accueil constitue un choix éditorial intentionnel, et non un simple affichage automatique de tous les contenus reçus.

La sélection doit pouvoir évoluer indépendamment des thèmes. Son mode de gestion doit rester suffisamment simple pour permettre de remplacer les photographies mises en avant sans modifier le fonctionnement des galeries.

## 3. Pages et navigation

### 3.1. Page d'accueil indépendante des thèmes

**Décision :** la page d'accueil (`/`) présente une sélection éditoriale qui n'est pas organisée comme une simple page thématique.

**Justification :** proposer une entrée dans l'univers photographique du site plutôt qu'un classement exclusivement catégoriel.

### 3.2. Pages thématiques dédiées

**Décision :** utiliser une route dynamique `/theme/[slug]` pour les pages thématiques.

**Justification :**
- Éviter de créer une page distincte pour chaque thème.
- Faciliter l'ajout de thèmes.
- Permettre l'accès direct aux pages et leur indexation.

Un thème sans photographie ne doit pas être proposé comme destination dans la navigation. Les accès directs à une page thématique doivent également être traités proprement.

### 3.3. Référencement

**Décision :** donner la priorité aux photographies et aux sujets représentés dans les titres et les métadonnées, tout en conservant « Wonders In Sight » comme identité de marque.

**Justification :** permettre aux contenus photographiques d'être identifiables et compréhensibles indépendamment de la marque, sans négliger l'identité du site.

## 4. Galerie et consultation des photographies

### 4.1. Composant partagé

**Décision :** mutualiser l'affichage des photographies dans `PhotoGallery`.

**Justification :** conserver un comportement cohérent entre l'accueil et les pages thématiques, tout en évitant de dupliquer la logique d'affichage et de consultation.

### 4.2. Mise en page en colonnes CSS

**Décision :** utiliser une disposition en colonnes CSS pour la galerie.

**Justification :** privilégier une présentation visuelle souple qui met les photographies en valeur.

Les ajustements de mise en page doivent préserver la lisibilité et le cadrage des images, sans introduire de complexité injustifiée.

### 4.3. Modale native

**Décision :** utiliser l'élément HTML natif `<dialog>` pour la consultation agrandie.

**Justification :**
- S'appuyer sur un mécanisme natif du navigateur.
- Conserver une interaction de fermeture cohérente, notamment avec la touche Échap.
- Éviter l'ajout d'une dépendance dédiée à la modale.

Les animations d'ouverture et de fermeture reposent sur des états React et des classes CSS.

### 4.4. Récit photographique

**Décision :** prévoir un champ éditorial `narrative` pour accompagner certaines photographies.

**Justification :** permettre une expression personnelle à propos de l'image, au-delà de son titre et de son lieu.

Lorsque le récit existe, il apparaît dans une colonne distincte sur grand écran, avec un défilement indépendant de la photographie. L'alignement du texte est à gauche, avec un interligne généreux.

La photographie doit rester stable pendant la lecture. En l'absence de récit, la présentation doit éviter de conserver une colonne vide qui déséquilibre la composition.

## 5. Identité visuelle

### 5.1. Direction artistique

**Décision :** privilégier une esthétique minimaliste, contemplative et centrée sur la photographie.

**Conséquences :**
- Limiter les éléments décoratifs.
- Utiliser une typographie discrète et une mise en page aérée.
- Réserver les animations aux transitions qui améliorent réellement la compréhension ou l'expérience.
- Éviter les interactions superflues qui détournent l'attention des images.

### 5.2. Modes clair et sombre

**Décision :** proposer un mode clair et un mode sombre.

Le thème sombre constitue l'identité visuelle principale, tandis que le mode clair offre une alternative de consultation.

La préférence du système est prise en compte lors du premier accès et le choix explicite de l'utilisateur est conservé.

**Justification :** respecter les préférences de consultation sans imposer une apparence unique, tout en conservant une direction artistique cohérente.

Le changement de thème ne doit pas altérer le cadrage des photographies ni le fonctionnement de la modale.

## 6. Principes techniques transversaux

### 6.1. Limiter les dépendances

**Décision :** privilégier les fonctionnalités natives de la plateforme et les solutions déjà présentes dans le projet.

**Justification :** limiter la maintenance, la complexité et le coût des évolutions.

Toute nouvelle dépendance doit répondre à un besoin clairement identifié.

### 6.2. Performances et accessibilité

**Principe :** les choix d'interface doivent tenir compte des performances, de la navigation au clavier, de la lisibilité et des préférences de réduction des animations.

Ces exigences doivent être vérifiées lors de l'ajout de nouvelles interactions ou de transitions de page.

## 7. Évolutions à documenter

Les évolutions suivantes devront être documentées lorsqu'elles seront effectivement décidées et mises en œuvre :

- Les effets d'entrée sur la page d'accueil.
- Les transitions entre la page d'accueil et les pages thématiques.
- Les éventuels changements de stratégie de chargement ou d'optimisation des images.
- Les choix définitifs concernant la gestion éditoriale des contenus.

Une intention ou une piste de conception ne doit pas être présentée comme une fonctionnalité terminée.

---

*Ce document décrit les décisions structurantes connues à ce stade. Il doit évoluer avec le projet et être corrigé si l'implémentation réelle diverge d'un choix documenté.*