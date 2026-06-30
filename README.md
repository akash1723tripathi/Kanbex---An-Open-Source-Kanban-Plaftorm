# Kanbex

Kanbex is a lightweight Kanban-style project management app built with Next.js and Express.

## What’s Included

- Drag-and-drop Kanban boards
- Real-time collaboration with Socket.io
- Authentication, projects, tasks, labels, comments, and attachments
- PostgreSQL, Redis, and Prisma on the backend
- Docker-based local development

## Repo Layout

- `frontend/` - Next.js app
- `backend/` - Express API
- `docker-compose.yml` - Local development stack
- `render.yaml` - Render deployment blueprint

## Local Development

```bash
npm install
docker-compose up --build
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`

## Environment Variables

Create a root `.env` file for local development. The backend validates these values in [`backend/src/config/env.ts`](backend/src/config/env.ts).

```env
DATABASE_URL=postgresql://kanbex:kanbex_secret@localhost:5432/kanbex_dev?schema=public
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key
R2_SECRET_ACCESS_KEY=your-secret-key
R2_BUCKET_NAME=kanbex-files
```

## Render Deployment

- The backend and frontend are defined in [`render.yaml`](render.yaml).
- Render builds both services from Dockerfiles.
- Set the required environment variables in the Render dashboard for each service.

## Scripts

```bash
npm run dev:frontend
npm run dev:backend
npm run build
npm run lint
npm run test
```
