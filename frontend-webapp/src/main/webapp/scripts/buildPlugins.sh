#./bin/bash

# Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
#
# This file is part of REGARDS.
#
# REGARDS is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# REGARDS is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with REGARDS. If not, see <http://www.gnu.org/licenses/>.

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
        npm prune
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
