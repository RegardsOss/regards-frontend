#!/bin/bash -xe

cd /app_to_build

echo "Execute tests"
time npm run test:mocha --no-update-notifier

echo "Building app"
time npm run build:production --no-update-notifier
