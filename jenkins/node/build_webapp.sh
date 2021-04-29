#!/bin/bash -xe

cd /app_to_build

echo "Run linter"
time npm run lint --no-update-notifier || true

echo "Execute tests"
time npm run test:mocha --no-update-notifier

echo "Building app"
time npm run build:production --no-update-notifier
