# JobHomeMonoRepo

Bienvenue dans le projet **JobHomeMonoRepo** ! Ce dépôt est un mono-repo qui facilite le développement simultané d'une application web en utilisant une architecture frontend et backend distinctes.

## Table des matières

- [Description](#description)
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Scripts](#scripts)
- [Dépendances](#dépendances)
- [Contribuer](#contribuer)
- [Licence](#licence)

## Description

**JobHomeMonoRepo** est conçu pour simplifier le processus de développement d'applications en séparant clairement le code frontend et backend tout en permettant une gestion efficace des dépendances. Grâce à l'utilisation de **workspaces**, il est possible de développer et de déployer les deux parties de l'application de manière fluide.

## Fonctionnalités

- Architecture mono-repo pour une gestion simplifiée des projets.
- Développement simultané du frontend et du backend.
- Utilisation de **concurrently** pour exécuter plusieurs scripts en parallèle.

## Installation

Pour commencer, clonez le dépôt :

```bash
git clone https://github.com/votre-utilisateur/JobHomeMonoRepo.git
cd JobHomeMonoRepo
```

Ensuite, installez les dépendances nécessaires :

```bash
npm install
```

## Utilisation

Pour démarrer le développement de l'application, vous pouvez exécuter le script suivant :

```bash
npm run dev
```

Cela lancera simultanément le serveur frontend et backend.

## Scripts

Voici un aperçu des scripts disponibles dans ce projet :

- dev:frontend : Démarre le serveur de développement du frontend.
- build:frontend : Compile l'application frontend pour la production.
- dev:backend : Démarre le serveur de développement du backend.
- dev : Lance le développement du frontend et du backend en parallèle.

## Dépendances

Ce projet utilise la dépendance suivante :

- concurrently : Permet d'exécuter plusieurs commandes en parallèle.

## Contribuer

Les contributions sont les bienvenues ! Pour contribuer à ce projet, suivez les étapes suivantes :

- Fork le projet.
- Créez une nouvelle branche (git checkout -b ma-nouvelle-branche).
- Faites vos modifications et ajoutez-les à l'index (git add .).
- Commitez vos changements (git commit -m 'Ajout d'une nouvelle fonctionnalité').
- Poussez votre branche (git push origin ma-nouvelle-branche).
- Ouvrez une Pull Request.omeMonoRepo

## Licence

Ce projet est sous licence MIT. Cela signifie que vous pouvez l'utiliser, le modifier et le distribuer librement tant que vous incluez une copie de la licence dans votre distribution.
