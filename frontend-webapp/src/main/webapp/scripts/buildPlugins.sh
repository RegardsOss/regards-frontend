#./bin/bash

#
# LICENSE_PLACEHOLDER
#

# Script to compile all plugins
dev=0
while getopts "d" opt; do
    case "$opt" in
    d)  dev=1
    esac
done

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
        if [ ${dev} == 0 ] ; then
            echo "Run production compilation"
            npm run build
        else
            echo "Run dev compilation"
            npm run build:dev
        fi
        cd ${home}
        echo ""
        echo ""
        echo "-------------------------------------------"
        echo "Copying plugin ${f} to build directory ...."
        echo "-------------------------------------------"
        echo ""
        if [ ${dev} == 1 ] ; then
            mkdir -p dist/dev/plugins/criterion/${f}/ && cp plugins/criterion/${f}/target/build/plugin.js dist/dev/plugins/criterion/${f}/
        else
            mkdir -p dist/prod/plugins/criterion/${f}/ && cp plugins/criterion/${f}/target/build/plugin.js dist/prod/plugins/criterion/${f}/
        fi
    fi
  fi
done
