#./bin/bash

#
# LICENSE_PLACEHOLDER
#

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
        if [ -d "node_modules/@regardsoss" ]; then
          rm -rf "node_modules/@regardsoss"
        fi
        npm install
        npm run build
        cd ${home}
        echo ""
        echo ""
        echo "-------------------------------------------"
        echo "Copying plugin ${f} to build directory ...."
        echo "-------------------------------------------"
        echo ""
        mkdir -p dist/prod/plugins/criterion/${f}/ && cp plugins/criterion/${f}/target/build/plugin.js dist/prod/plugins/criterion/${f}/
    fi
  fi
done
