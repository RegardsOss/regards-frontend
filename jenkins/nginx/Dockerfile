FROM nginx
COPY nginx.conf /etc/nginx/
COPY dist /var/www

COPY prestart.sh /
RUN chmod +x /prestart.sh

CMD ["/prestart.sh", "&&", "nginx", "-g", "daemon off;"]