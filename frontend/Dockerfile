FROM node:20-alpine
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY . .

# Build-time API base URL used by Vite (vite.config.ts loadEnv)
ARG API_BASE_URL
ENV API_BASE_URL=${API_BASE_URL}

RUN pnpm build

EXPOSE 5173

CMD ["pnpm", "preview", "--host", "0.0.0.0", "--port", "5173"]


