#!/bin/bash -xe

cd /app_to_build

echo "Install application dependencies and create DLL"
npm install --prefer-offline

echo "Create production DLL"
npm run build:production-dll

echo "Success !"
exit 0
