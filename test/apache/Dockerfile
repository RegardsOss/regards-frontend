FROM httpd

COPY ../../frontend-webapp/src/main/webapp/dist/prod /var/www

COPY ./prestart.sh /

COPY ./httpd-proxy.conf ./conf/

# Make it executable
RUN chmod +x /prestart.sh && \
    echo '
Include conf/httpd-proxy.conf
<IfModule mod_proxy.c>
    # Security requirement E6.1.3
    <Proxy *>
    Order deny,allow
    Deny from all
    </Proxy>

    # Security requirement E6.1.1
    ProxyRequests Off

    # Security requirement E6.1.2
    ProxyPreserveHost Off
</IfModule>' >> ./conf/httpd.conf 
    


CMD ["/prestart.sh", "&&", "httpd-foreground"]


