FROM node:7.10.1

VOLUME /app_to_build

COPY install.sh build_webapp.sh build_plugin.sh reset_rights.sh /

	# Set rights on scripts
RUN chmod +x /install.sh \
			/build_webapp.sh \
			/build_plugin.sh \
			/reset_rights.sh \
	# Configure npm by allowing root to use npm
 && echo "unsafe-perm=true" > ~/.npmrc \
	# Use our own registry
 #&& npm config set strict-ssl false \
 #&& npm config set registry "https://172.26.46.158:8443/repository/NPM-proxy/" \
    # Fix npm link permissions : https://github.com/npm/npm/issues/13306#issuecomment-236876133
 && cd $(npm root -g)/npm \
 && npm install fs-extra \
 && sed -i -e s/graceful-fs/fs-extra/ -e s/fs.rename/fs.move/ ./lib/utils/rename.js