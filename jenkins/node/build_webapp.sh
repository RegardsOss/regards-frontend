#!/bin/bash -xe

cd /app_to_build

echo "Execute tests"
npm test --no-update-notifier

echo "Building app"
npm run build:production --no-update-notifier
