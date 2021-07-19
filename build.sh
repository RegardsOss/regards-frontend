#!/bin/sh
echo "Building frontend ..."
dir=$(pwd)
cd webapp/
rm -rf webpack-config-front/node_modules/
rm -rf webpack-config-front/dist
rm -rf webpack-config-front/dist
rm -rf node_modules
find plugins -type d -name "node_modules" -exec rm -rf {} \;
npm install --prefer-offline --no-update-notifier --ignore-scripts
npm run build:production-dll --no-update-notifier
echo "HACK CESIUM WEBPACK 5 - FIX CONTENT"
sed -i "s+\".\": {+\"./\": \"./Source/\",\".\": {+g" node_modules/cesium/package.json
npm run build:production 
npm run build:plugins-all
cd ../frontend-boot/
mvn clean install -DskipTests -Dwebapp.dir=${dir}/webapp
echo "Building frontend. Done OK."
