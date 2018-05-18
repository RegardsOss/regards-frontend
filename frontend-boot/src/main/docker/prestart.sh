#!/usr/bin/env bash

jar -xvf /bootstrap-frontend-2.0.0-SNAPSHOT.war static/
sed -i s/\$\{regards\.config\.cloud\.gateway\.url}/"$GATEWAY_PUBLIC_URL"/g /static/conf/staticConfiguration.js
cat /static/conf/staticConfiguration.js
