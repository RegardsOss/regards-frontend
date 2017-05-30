#!/usr/bin/env bash

jar -xvf /bootstrap-frontend-1.0.0-SNAPSHOT.war static/
sed -i s/\$\{regards\.config\.cloud\.gateway\.uri}:\$\{regards\.config\.cloud\.gateway\.port\}/"$GATEWAY_PUBLIC_URL"/g /static/conf/staticConfiguration.js
cat /static/conf/staticConfiguration.js
