#!/bin/bash -xe

# The path to the plugin is required (ex: criterion/exemple)
typeset -r PLUGIN_PATH="$1"

echo "Plugin path from webapp: ${PLUGIN_PATH}"

# First install npm links of the main app
cd /app_to_build
echo "Setup npm links"
npm run bootstrap

cd ./plugins/${PLUGIN_PATH}/
npm run install
npm run test
npm run build
