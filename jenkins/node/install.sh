#!/bin/bash -xe

cd /app_to_build

echo "Install application dependencies and create DLL"
# Still some peer dependency failing so far
npm install --prefer-offline --legacy-peer-deps --no-update-notifier

echo "Create production DLL"
npm run build:production-dll --no-update-notifier

echo "HACK CESIUM WEBPACK 5 - BEFORE"
cat /app_to_build/node_modules/cesium/package.json

echo "HACK CESIUM WEBPACK 5 - FIX CONTENT"
sed -i "s+\".\": {+\"./\": \"./Source/\",\".\": {+g" /app_to_build/node_modules/cesium/package.json

echo "HACK CESIUM WEBPACK 5 - AFTER"
cat /app_to_build/node_modules/cesium/package.json

echo "Success !"
exit 0
