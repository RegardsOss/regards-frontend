#!/usr/bin/env bash
set -e

# Await gateway is up and ready, except if venv WAIT_GATEWAY=false
declare GATEWAY_INTERNAL_URL_INTERNAL=${GATEWAY_INTERNAL_URL:-"rs-gateway:9030"}
declare WAIT_GATEWAY_INTERNAL=${WAIT_GATEWAY:-"true"}
if [ "${WAIT_GATEWAY_INTERNAL}" == "true" ]; then
  /wait-for-it.sh ${GATEWAY_INTERNAL_URL_INTERNAL} -t 0
fi

# Update config file with public gateway URL
mkdir -p /var/www/conf/
cp -n /var/www/conf-template/staticConfiguration.js /var/www/conf/
sed -i s/\$\{regards\.config\.cloud\.gateway\.url}/"$GATEWAY_PUBLIC_URL"/g /var/www/conf/staticConfiguration.js
cat /var/www/conf/staticConfiguration.js

# Launch NGinx
echo "Launching nginx..."
exec nginx -g 'daemon off;'
