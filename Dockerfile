FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package*.json ./

RUN npm ci

COPY prisma ./prisma

COPY src ./src

COPY tsconfig.json ./

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]
