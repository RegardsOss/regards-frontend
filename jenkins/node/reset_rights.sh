#!/bin/bash -xe

echo "Fix permissions"
chmod -R 0777 /app_to_build/
chown -R $1:$2 /app_to_build/
