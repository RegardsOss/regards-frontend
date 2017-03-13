#./bin/bash

#
# LICENSE_PLACEHOLDER
#

# Script to copy plugins to build directory

home=`pwd`
cd plugins/criterion
plugins=`find . -maxdepth 1 -type d `
cd ${home}
for f in ${plugins}; do
  if [ -d "plugins/criterion/${f}/target/build/" ]; then
    if [ -f "plugins/criterion/${f}/target/build/plugin.js" ]; then
      mkdir -p build/plugins/criterion/${f}/ && cp plugins/criterion/${f}/target/build/plugin.js build/plugins/criterion/${f}/
    fi
  fi
done
