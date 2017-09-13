FROM node:7.10.1

VOLUME /app_to_build

COPY ./install.sh /
COPY ./build_webapp.sh /

	# Set rights on scripts
RUN chmod +x /install.sh \
 && chmod +x /build_webapp.sh \
	# Configure npm by allowing root to use npm
 && echo "unsafe-perm=true" > ~/.npmrc \
	# Use our own registry
 && npm config set strict-ssl false \
 && npm config set registry "https://172.26.46.158:8443/repository/NPM-proxy/"
