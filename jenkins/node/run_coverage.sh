#!/bin/bash -xe

cd /app_to_build

echo "execute tests coverage"
npm run test:coverage

echo "Fix permissions"
chmod -R 0777 /app_to_build/report

echo "Success !"
exit 0
