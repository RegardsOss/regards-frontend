#!/bin/bash -xe

echo "Fix permissions"
find /app_to_build/ -type f | xargs -r ls -lah
chmod -R 0777 /app_to_build/
find /app_to_build/ -type f | xargs -r ls -lah