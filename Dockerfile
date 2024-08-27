# Build stage
FROM node:18 as build
WORKDIR /opt/app
COPY package*.json ./
RUN npm install --only=production
RUN npm install tailwindcss # Install tailwindcss for building
COPY . .
RUN npm run build

# Production stage
FROM node:18-slim
WORKDIR /opt/app
COPY --from=build /opt/app .
RUN npm install --only=production
RUN npm rebuild better-sqlite3
EXPOSE 3000
CMD ["npm", "run", "start"]
