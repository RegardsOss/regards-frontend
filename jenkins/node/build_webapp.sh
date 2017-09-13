#!/bin/bash -xe

cd /app_to_build

echo "Setup npm links"
npm run bootstrap

echo "Fix permissions"
chmod -R 0777 /app_to_build/

echo "Execute tests"
npm run test:mocha

echo "Building app"
npm run build:production