# syntax=docker/dockerfile:1

FROM node:22-alpine AS deps

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && corepack prepare pnpm@10 --activate

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

FROM node:22-alpine AS build

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable && corepack prepare pnpm@10 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG VITE_API_URL
ARG VITE_APP_DOMAIN
ARG VITE_APP_PORT
ARG VITE_APP_PROTOCOL
ARG VITE_DEV_DOMAIN

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_APP_DOMAIN=$VITE_APP_DOMAIN
ENV VITE_APP_PORT=$VITE_APP_PORT
ENV VITE_APP_PROTOCOL=$VITE_APP_PROTOCOL
ENV VITE_DEV_DOMAIN=$VITE_DEV_DOMAIN

RUN pnpm build

FROM nginx:alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
