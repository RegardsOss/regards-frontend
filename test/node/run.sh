#!/bin/bash -xe

cd /app_to_build

echo "execute preinstallation (bootstrap)"
npm run bootstrap

echo "execute npm install"
npm install

# echo "execute tests"
# npm run test:mocha

# echo "Building app"
# npm run build:production

# echo "build app and plugins"
# npm run build:plugins

echo "Fix permissions"
chmod -R 0777 /app_to_build/dist/prod

echo "Success !"
exit 0
