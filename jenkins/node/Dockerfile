FROM node:9

VOLUME /app_to_build

COPY install.sh build_webapp.sh build_plugin.sh run_coverage.sh reset_rights.sh /

	# Set rights on scripts
RUN chmod +x /install.sh \
			/build_webapp.sh \
			/run_coverage.sh \
			/build_plugin.sh \
			/reset_rights.sh \
	# Configure npm by allowing root to use npm
 && echo "unsafe-perm=true" > ~/.npmrc \
	# Use our own registry
 && npm config set strict-ssl false \
 && npm config set registry "https://172.26.46.158:8443/repository/NPM-proxy/"