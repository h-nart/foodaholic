## Setup Instructions

Before running, add a valid Spoonacular API key to the root `.env`:

```bash
SPOONACULAR_API_KEY=your_real_api_key_here
```

### Run with Docker Compose (choose a profile)

- Dev profile (uses your local environment for fast iteration):

```bash
docker compose --profile dev up --build
```

- Prod profile (builds and runs a fully containerized app):

```bash
docker compose --profile prod up --build -d
```

## Design Decisions

1. Monorepo structure: 
   - Contains both `backend` (Spring Boot) and `frontend` (Vite + React) for convenience. 
   - In a real-world setup, each would typically live in its own repository for clearer ownership, CI/CD, and release management.
2. Each project runs independently:
   - Backend and frontend can each be built and run on their own.
   - `docker-compose.yml` orchestrates them together for local/dev and production-like runs.
3. Separate Docker images:
   - each project has its own `Dockerfile` and is built into its own image. 
   - Docker Compose brings these images up as separate containers.
4. Container Dependency:
   - Backend container does health check using `curl` on `:8080` before it marks itself healthy.
   - Frontend container waits for the backend server to go up.
5. `.env` usage: 
   - Docker Compose automatically loads the root `.env` file for variable substitution. In the dev profile, services read values from `.env` alongside mounted source for fast iteration; in the prod profile, those values are injected into containers at build/run time so everything runs fully inside containers.
6. Per-project READMEs for cleaner structure:
   - [frontend/README.md](https://github.com/h-nart/foodaholic/blob/main/frontend/README.md)
   - [backend/README.md](https://github.com/h-nart/foodaholic/blob/main/backend/README.md)

## AI Reflection

- I used Cursor’s Plan and Ask modes to discuss and plan together before switching to Agent to execute changes.
- The Dockerfiles were initially AI-generated; I added a healthcheck and asked it to generate two separate Docker images so the frontend and backend run in distinct containers.
- AI doesn’t question or refactor existing code, but “brute forces” its way into a solution even if it can be optimized.
- Great at generating initial project structure and boilerplate code.
