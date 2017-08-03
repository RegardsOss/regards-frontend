FROM node:7.10.1

VOLUME /app_to_build

COPY ./shell/run.sh /

RUN chmod +x /run.sh \
    # Allows root to use npm
    && echo "unsafe-perm=true" > ~/.npmrc \
    # Use our own registry
    && npm config set strict-ssl false \
    && npm config set registry "https://172.26.46.158:8443/repository/NPM-proxy/"

CMD ["/run.sh"]
