#Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

#Production stage
FROM node:20-alpine AS production

WORKDIR /app

COPY ./package*.json ./

RUN npm ci --only=production

COPY --from=build /app/build ./build
COPY --from=build /app/prisma ./prisma

EXPOSE ${SERVER_PORT}

CMD [ "npm", "run", "start:docker" ]