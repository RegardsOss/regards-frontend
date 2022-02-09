FROM 172.26.46.158/regards-nginx
USER root
COPY start.sh /
RUN chmod +x /start.sh

ENV GATEWAY_PUBLIC_URL \/

CMD ["/start.sh"]

COPY dist /var/www
USER 101
