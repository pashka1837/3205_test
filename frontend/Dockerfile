#Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY ./package.json ./
RUN npm install

COPY ./ ./

RUN npm run build

#Production stage
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production
RUN npm i -g serve

COPY --from=build /app/dist ./dist
EXPOSE 3001


CMD ["serve", "-l","3001", "-s", "dist"]
# CMD ["npm", "run", "preview", "--host"]
