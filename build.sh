#!/bin/sh
echo "Building frontend ..."
dir=$(pwd)
cd webapp/
npm install --legacy-peer-deps
npm run build:production-dll
npm run build:production
npm run build:plugins-all
cd ../frontend-boot/
mvn clean install -DskipTests -Dwebapp.dir=${dir}/webapp
echo "Building frontend. Done OK."
