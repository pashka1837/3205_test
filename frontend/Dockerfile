#Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY ./package.json ./
RUN npm install

COPY ./ ./

RUN npm run build

#Production stage
FROM node:20-alpine AS production

ENV FRONTEND_PORT ${FRONTEND_PORT}

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production
RUN npm install --global http-server

COPY --from=build /app/dist ./dist

EXPOSE ${FRONTEND_PORT}

CMD ["http-server", "./dist", "--port=3001" ]


