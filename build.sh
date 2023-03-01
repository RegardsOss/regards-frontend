#!/bin/sh
echo "Building frontend ..."
dir=$(pwd)
cd webapp/
rm -rf webpack-config-front/node_modules/
rm -rf webpack-config-front/dist
rm -rf node_modules
find plugins -type d -name "node_modules" -exec rm -rf {} \;
yarn --non-interactive --no-lockfile
yarn build:production-dll
echo "HACK CESIUM WEBPACK 5 - FIX CONTENT"
sed -i "s+\".\": {+\"./\": \"./Source/\",\".\": {+g" node_modules/cesium/package.json
yarn build:production 
yarn build:plugins-all
cd ../frontend-boot/
mvn clean install -DskipTests -Dwebapp.dir=${dir}/webapp
echo "Building frontend. Done OK."
