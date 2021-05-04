FROM node:15

ARG TUXUID=987
ARG TUXGID=982

# Create a user to use for the build
RUN groupadd -g ${TUXGID} tux \
    && useradd -d /home/tux -m -u ${TUXUID} -g tux -s /bin/bash tux

VOLUME /app_to_build

COPY install.sh install-plugin.sh build_webapp.sh lint_webapp.sh build_plugin.sh run_coverage.sh /

	# Set rights on scripts
RUN chmod +x /install.sh \
			/install-plugin.sh \
			/build_webapp.sh \
			/lint_webapp.sh \
			/run_coverage.sh \
			/build_plugin.sh

USER tux

# Use our own registry
RUN npm config set strict-ssl false --no-update-notifier \
	&& npm config set registry "https://172.26.46.158:8443/repository/new-npm-proxy/" --no-update-notifier \
 # Package lock auto prune the repo https://github.com/npm/npm/issues/16853#issuecomment-371665774
	&& npm config set package-lock false --no-update-notifier

ENV https_proxy "http://proxy2.si.c-s.fr:3128"
ENV no_proxy "172.26.46.158,172.26.47.129"
# Set max number of CPU
ENV NB_THREAD "1"
