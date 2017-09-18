FROM nginx
COPY nginx.conf /etc/nginx/
COPY dist /var/www

COPY prestart.sh /
RUN chmod +x /prestart.sh

ENV GATEWAY_PUBLIC_URL \/

CMD ["/prestart.sh", "&&", "nginx", "-g", "daemon off;"]