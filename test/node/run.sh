#!/bin/bash -xe

cd /app_to_build

echo "execute preinstallation (bootstrap)"
npm run bootstrap

echo "execute npm install"
npm install

# let's build the app
echo "execute tests"
npm run test:mocha

echo "build app and plugins"
npm run build:plugins

echo "Success !"
exit 0
