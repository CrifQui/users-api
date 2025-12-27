FROM node:24-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package*.json ./

RUN npm ci

COPY prisma ./prisma

COPY prisma.config.ts ./

COPY src ./src

COPY tsconfig.json ./

RUN DATABASE_URL="postgresql://placeholder:5432" npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]