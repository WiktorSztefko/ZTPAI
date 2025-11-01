FROM nginx:alpine

# Usuń domyślną konfigurację
RUN rm /etc/nginx/conf.d/default.conf

# Skopiuj naszą własną konfigurację
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Skopiuj zbudowaną aplikację (jeśli chcesz, by Nginx ją hostował bezpośrednio)
# Ale tutaj będziemy montować wolumen w docker-compose, więc nie kopiujemy builda na stałe

EXPOSE 80
