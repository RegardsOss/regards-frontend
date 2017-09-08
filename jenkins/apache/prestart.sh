#!/usr/bin/env bash
sed -i s/\$\{regards\.config\.cloud\.gateway\.url}/"$GATEWAY_PUBLIC_URL"/g /var/www/conf/staticConfiguration.js
cat /var/www/conf/staticConfiguration.js

