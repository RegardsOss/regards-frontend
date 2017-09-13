#!/bin/bash -xe

cd /app_to_build

echo "execute preinstallation (bootstrap)"
sed -i s/npm\ link/npm\ install/g ./scripts/bootstrap.sh
npm run bootstrap

echo "execute npm install"
npm install

echo "Fix permissions"
chmod -R 0777 /app_to_build/dist/prod

echo "Success !"
exit 0
