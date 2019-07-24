#!/bin/bash -xe

cd /app_to_build

echo "Execute tests"
npm test

echo "Building app"
npm run build:production
