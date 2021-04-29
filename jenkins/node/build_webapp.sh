#!/bin/bash -xe

cd /app_to_build

echo "Run linter"
npm run lint --no-update-notifier || true

echo "Execute tests"
npm run test:mocha --no-update-notifier

echo "Building app"
npm run build:production --no-update-notifier
