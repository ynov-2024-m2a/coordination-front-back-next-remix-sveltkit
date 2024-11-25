# Remix Todo App

A simple yet powerful **Todo App** built with [Remix](https://remix.run). This application demonstrates the use of Remix for server-side rendering (SSR) and client-side React components, along with a PostgreSQL database powered by Prisma.

## Features
- Add, update, and delete tasks.
- Mark tasks as completed.
- Simple, clean UI for managing your todos.
- Backend powered by Remix and PostgreSQL.

---

## Getting Started

Follow these steps to set up and run the project locally.

---

### Prerequisites

Ensure you have the following installed on your machine:

- **Docker** (for the database setup)
- **Node.js 20** or later (for running the application)

---

## .env
Copy .env.example whit this command and complet it
```bash
cp .env.example .env
```

### Installation

1. **Clone the Repository**  
   Run the following command to clone the repository:
   ```bash
   git clone <repository-url>
   cd remix-todo

   ### Step 2: Install Dependencies

Once you've cloned the repository, navigate to the project directory and install the required Node.js dependencies:

```bash
        npm install
```

2. **Build The DB In Docker**

Run the next commande: 
```bash
    docker compose up -d
```

3. **Migrate And Deploy**

Run the following commande: 
```bash
    npx prisma generate && npx prisma migrate deploy
```
4. **Start The Project**
Run this commande:
```bash
    npm run dev
```

And that's all there is to it: enjoy a good cup of coffee ☕☕
