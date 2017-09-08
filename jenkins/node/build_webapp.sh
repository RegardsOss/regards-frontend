#!/bin/bash -xe

cd /app_to_build

echo "Execute tests"
npm run test:mocha

echo "Building app"
npm run build:production