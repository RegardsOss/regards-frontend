#!/bin/bash -xe

# The path to the plugin is required (ex: criterion/exemple)
typeset -r PLUGIN_PATH="$1"

echo "Plugin path from webapp: ${PLUGIN_PATH}"

cd /app_to_build/plugins/${PLUGIN_PATH}/

echo "Run tests"
npm test

echo "Compare dependencies"
../../../scripts/compareDependencies.js ../../../package.json ./package.json

echo "Bundle the plugin and copy it to the dist/prod "
npm run build:production
mkdir -p ../../../dist/prod/plugins/${PLUGIN_PATH}/
cp ./target/prod/plugin.js ../../../dist/prod/plugins/${PLUGIN_PATH}/
