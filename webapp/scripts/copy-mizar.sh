#!/usr/bin/env bash

# Copyright 2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
set -e

# 1 - Print hello world
echo "------------------------------------------------"
echo "Copying mizar to dist/dev and dist/prod folders "

rm -rf ./dist/dev/MizarWidget/
rm -rf ./dist/prod/MizarWidget/

cp -R node_modules/MizarWidget/ dist/prod/
cp -R node_modules/mizar/* dist/prod/MizarWidget/external/Mizar
cp -R node_modules/jquery/ dist/prod/MizarWidget/node_modules/
cp -R node_modules/jquery-datetimepicker/ dist/prod/MizarWidget/node_modules/
cp -R node_modules/jquery-mousewheel/ dist/prod/MizarWidget/node_modules/
cp -R node_modules/jquery-ui-dist/ dist/prod/MizarWidget/node_modules/
cp -R node_modules/jquery-ui-timepicker-addon/ dist/prod/MizarWidget/node_modules/
cp -R node_modules/php-date-formatter/ dist/prod/MizarWidget/node_modules/
cp -R node_modules/moment/ dist/prod/MizarWidget/node_modules/
cp -R node_modules/requirejs/ dist/prod/MizarWidget/node_modules/
cp -R node_modules/requirejs-plugins/ dist/prod/MizarWidget/node_modules/
cp -R node_modules/string/ dist/prod/MizarWidget/node_modules/
cp -R node_modules/underscore/ dist/prod/MizarWidget/node_modules/
cp -R node_modules/wms-capabilities/ dist/prod/MizarWidget/node_modules/
cp -R node_modules/xmltojson/ dist/prod/MizarWidget/node_modules/

cp -R dist/prod/MizarWidget/ dist/dev/MizarWidget/

echo "Copying mizar succeed                           "
echo "------------------------------------------------"