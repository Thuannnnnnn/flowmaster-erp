
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npx nx build api --prod
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist/apps/api ./
RUN npm install --omit=dev --force
ENV PORT=3000
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "main.js"]