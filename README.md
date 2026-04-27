# AI Resume Analyzer

Monorepo setup with separate backend and frontend from day one.

## Repository layout

- `backend/`: Node.js + Express + MongoDB API
- `frontend/`: React + Vite client app
- `.github/`: PR workflow templates

## Local setup

1. Install root tooling:
   - `npm install`
2. Install backend dependencies:
   - `npm --prefix backend install`
3. Install frontend dependencies:
   - `npm --prefix frontend install`
4. Configure environment files:
   - Copy `backend/.env.example` to `backend/.env`
   - Copy `frontend/.env.example` to `frontend/.env` (optional for now)

## Run commands

- Backend only: `npm run dev:backend`
- Frontend only: `npm run dev:frontend`
- Both apps: `npm run dev`
- Backend production start: `npm run start:backend`
- Frontend build: `npm run build:frontend`

## Git baseline

### Branch naming

Use this format:

- `feat/<short-description>`
- `fix/<short-description>`
- `chore/<short-description>`
- `docs/<short-description>`

Examples:

- `feat/resume-upload-endpoint`
- `fix/mongo-connection-timeout`

### Commit message guideline

Use imperative, scoped commit messages:

- `feat(backend): add health check route`
- `fix(frontend): handle empty resume response`
- `chore(repo): add monorepo dev scripts`

### Pull requests

- Open small, reviewable PRs.
- Fill `.github/pull_request_template.md`.
- Include a short test plan and rollback note for risky changes.
