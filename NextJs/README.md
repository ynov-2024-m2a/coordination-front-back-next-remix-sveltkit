# Application Todo

Une application de gestion de tâches (Todo) moderne construite avec Next.js 14, Prisma et PostgreSQL.

## Fonctionnalités

- ✨ Création, modification et suppression de tâches
- 🔄 Gestion des états des tâches (Non commencé, En cours, Terminé)
- 🎨 Interface utilisateur moderne avec Tailwind CSS
- 🔍 Validation des données avec Zod
- 🚀 Performance optimisée avec React Query

## Prérequis

- Node.js 18+
- Docker et Docker Compose
- pnpm (recommandé) ou npm

## Installation

1. Clonez le dépôt :

```
git clone https://github.com/ynov-2024-m2a/coordination-front-back-next-remix-sveltkit.git todo-app
cd todo-app/nextjs
```

2. Copiez le fichier .env.sample en .env à la racine du projet et ajoutez y la variable d'environnement DATABASE_URL :
   `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todos?schema=public"`

3. Lancez la base de données PostgreSQL avec Docker :

```
docker run --name todos-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=todos \
  -p 5432:5432 \
  -d postgres:latest
```

4. Installez les dépendances :

```
pnpm install
```

5. Appliquez les migrations Prisma :

```
pnpm prisma migrate deploy
```

## Développement

Pour lancer l'application en mode développement :

```
pnpm dev
```

L'application sera accessible à l'adresse : http://localhost:3000

## Production

Pour construire et lancer l'application en production :

```
pnpm build
pnpm start
```

## Structure du Projet

- /app - Pages et composants de l'application Next.js
- /src/components - Composants UI réutilisables
- /src/features - Logique métier organisée par fonctionnalité
- /prisma - Schéma et migrations de la base de données

## Technologies Principales

- Next.js 14
- Prisma
- PostgreSQL
- TailwindCSS
- React Query
- Zod
- TypeScript

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

---

# Todo Application

A modern task management application built with Next.js 14, Prisma and PostgreSQL.

## Features

- ✨ Create, edit and delete tasks
- 🔄 Task state management (Not Started, Active, Completed)
- 🎨 Modern UI with Tailwind CSS
- 🔍 Data validation with Zod
- 🚀 Optimized performance with React Query

## Prerequisites

- Node.js 18+
- Docker and Docker Compose
- pnpm (recommended) or npm

## Installation

1. Clone the repository:

```
git clone https://github.com/ynov-2024-m2a/coordination-front-back-next-remix-sveltkit.git todo-app
cd todo-app/nextjs
```

2. Copy the .env.sample file to .env in the project root and add the DATABASE_URL environment variable:
   `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todos?schema=public"`

3. Start PostgreSQL database with Docker:

```
docker run --name todos-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=todos \
  -p 5432:5432 \
  -d postgres:latest
```

4. Install dependencies:

```
pnpm install
```

5. Apply Prisma migrations:

```
pnpm prisma migrate deploy
```

## Development

To run the application in development mode:

```
pnpm dev
```

The application will be available at: http://localhost:3000

## Production

To build and run the application in production:

```
pnpm build
pnpm start
```

## Project Structure

- /app - Next.js application pages and components
- /src/components - Reusable UI components
- /src/features - Business logic organized by feature
- /prisma - Database schema and migrations

## Core Technologies

- Next.js 14
- Prisma
- PostgreSQL
- TailwindCSS
- React Query
- Zod
- TypeScript

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.
