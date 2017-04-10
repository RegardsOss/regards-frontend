#./bin/bash

#
# LICENSE_PLACEHOLDER
#

# Script to compile all plugins

home=`pwd`
cd plugins/criterion
plugins=`find . -maxdepth 1 -type d `
cd ${home}
for f in ${plugins}; do
  if [ $f != '.' ] && [ $f != '..' ]; then
    if [ -d "plugins/criterion/${f}" ]; then
        echo ""
        echo "-------------------------------------------"
        echo "Compiling plugin ${f} ...."
        echo "-------------------------------------------"
        echo ""
        cd plugins/criterion/${f}
        npm install
        npm run build
        cd ${home}
        echo ""
        echo ""
        echo "-------------------------------------------"
        echo "Copying plugin ${f} to build directory ...."
        echo "-------------------------------------------"
        echo ""
        mkdir -p dist/dev/plugins/criterion/${f}/ && cp plugins/criterion/${f}/target/build/plugin.js dist/dev/plugins/criterion/${f}/
    fi
  fi
done
