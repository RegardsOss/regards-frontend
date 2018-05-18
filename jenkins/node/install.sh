#!/bin/bash -xe

cd /app_to_build

echo "Install application dependencies and create DLL"
npm install --prefer-offline

echo "Install plugins dependencies"
npm run install:plugins

echo "Success !"
exit 0
