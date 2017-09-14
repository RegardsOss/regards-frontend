#!/usr/bin/env bash
set -e
sed -i s/\$\{regards\.config\.cloud\.gateway\.url}/"$GATEWAY_PUBLIC_URL"/g /var/www/conf/staticConfiguration.js
cat /var/www/conf/staticConfiguration.js

echo "Launching nginx..."
nginx -g 'daemon off;'
echo "Nginx launched but not sync"