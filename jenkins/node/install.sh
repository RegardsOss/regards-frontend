#!/bin/bash -xe

cd /app_to_build

echo "Install application dependencies and create DLL"
# mdi-material-ui@"^4.28.0" expects material-ui@"^0.17.4 so we need to disable that check
npm install --prefer-offline --legacy-peer-deps

echo "Create production DLL"
npm run build:production-dll

echo "Success !"
exit 0
