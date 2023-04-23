# Build React app
FROM node:14 AS build
WORKDIR /app
COPY ./client/package*.json ./
RUN npm ci
COPY ./client/ ./
RUN npm run build

# Set up Express server
FROM node:14
WORKDIR /server
COPY ./server/package*.json ./
RUN npm ci
COPY ./server/ ./

# Copy React build to server
COPY --from=build /app/build/ /server/client-build/

EXPOSE 5000
CMD ["npm", "start"]
