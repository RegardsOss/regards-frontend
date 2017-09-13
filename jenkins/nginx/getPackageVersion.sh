#!/bin/bash -e

# Path to package.json is retrieved from argument or taken equal "." if no argument provided
PACKAGE_JSON_PATH=${1:-.}

# Version key/value should be on his own line
PACKAGE_VERSION=$(cat "$PACKAGE_JSON_PATH"/package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

echo $PACKAGE_VERSION