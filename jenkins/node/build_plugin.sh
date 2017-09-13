#!/bin/bash -xe

# The path to the plugin is required (ex: criterion/exemple)
typeset -r PLUGIN_PATH="$1"

echo "Plugin path from webapp: ${PLUGIN_PATH}"

# First install npm links of the main app

cd /app_to_build/plugins/${PLUGIN_PATH}/
npm install

echo "Fix permissions"
chmod -R 0777 /app_to_build/plugins/${PLUGIN_PATH}/

npm test

npm run build

echo "Fix permissions"
chmod -R 0777 /app_to_build/plugins/${PLUGIN_PATH}/target