FROM node:9

ARG TUXUID=987
ARG TUXGID=982

# Create a user to use for the build
RUN groupadd -g ${TUXGID} tux \
    && useradd -d /home/tux -m -u ${TUXUID} -g tux -s /bin/bash tux

VOLUME /app_to_build

COPY install.sh build_webapp.sh build_plugin.sh run_coverage.sh /

	# Set rights on scripts
RUN chmod +x /install.sh \
			/build_webapp.sh \
			/run_coverage.sh \
			/build_plugin.sh

USER tux
	# Use our own registry
 RUN npm config set strict-ssl false \
 && npm config set registry "https://172.26.46.158:8443/repository/NPM-proxy/" \
    # Package lock auto prune the repo https://github.com/npm/npm/issues/16853#issuecomment-371665774
 && npm config set package-lock false