FROM nginx
COPY nginx.conf /etc/nginx/
COPY dist /var/www

COPY start.sh /
RUN chmod +x /start.sh

ENV GATEWAY_PUBLIC_URL \/

CMD ["/start.sh"]