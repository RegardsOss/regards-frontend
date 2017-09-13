#!/bin/bash -xe

cd /app_to_build

echo "execute preinstallation (bootstrap)"
npm run bootstrap

echo "execute npm install"
npm install

echo "Fix permissions"
chmod -R 0777 /app_to_build/

echo "Success !"
exit 0
