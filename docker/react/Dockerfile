# 1️⃣ Build aplikacji React
FROM node:18-alpine AS build

WORKDIR /app

# Kopiujemy tylko package.json najpierw (cache layer)
COPY ../../react/package*.json ./
RUN npm install

# Kopiujemy resztę aplikacji
COPY ../../react ./
RUN npm run build

# 2️⃣ Serwowanie statycznych plików przez Nginx
FROM nginx:alpine

# Kopiujemy build Reacta do Nginx
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

# Uruchomienie Nginx
CMD ["nginx", "-g", "daemon off;"]
