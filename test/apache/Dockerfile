FROM httpd

COPY dist /var/www
COPY prestart.sh /
COPY httpd.conf httpd-proxy.conf ./conf/

# Make it executable
RUN chmod +x /prestart.sh


CMD ["/prestart.sh", "&&", "httpd-foreground"]


