FROM nginx:1.27-alpine

# Skopiuj pliki Symfony (wolumenem nadal możesz nadpisywać)
COPY ./symfony/public /var/www/html/public

# Skopiuj konfigurację Nginx
COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
