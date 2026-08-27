FROM node:22-alpine AS build
WORKDIR /app
COPY package.json ./
COPY client/package.json ./client/package.json
RUN npm install && npm --prefix client install
COPY client ./client
RUN npm --prefix client run build

FROM node:22-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY server ./server
COPY --from=build /app/client/dist ./client/dist
ENV PORT=8080
EXPOSE 8080
CMD ["node", "server/index.js"]
