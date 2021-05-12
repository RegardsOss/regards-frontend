#!/bin/bash -xe

cd /app_to_build

echo "Run linter"
time npm run lint --no-update-notifier
