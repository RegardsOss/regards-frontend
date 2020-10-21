FROM nginx

# Not root user cannot open port 80, so this container use 8080 instead
EXPOSE 8080

# Allow not root user to launch nginx
RUN chown root:root /var/cache/nginx \
    && chmod 0777 /var/cache/nginx \
    && chown root:root /run \
    && chmod 0777 /run

COPY start.sh /
RUN chmod +x /start.sh

ENV GATEWAY_PUBLIC_URL \/

CMD ["/start.sh"]

COPY dist /var/www