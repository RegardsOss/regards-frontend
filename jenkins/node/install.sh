#!/bin/bash -xe

cd /app_to_build

echo "execute preinstallation (bootstrap)"
npm run bootstrap

echo "Install application dependencies and create DLL"
npm install

echo "Install plugins dependencies"
npm run install:plugins

echo "Success !"
exit 0
