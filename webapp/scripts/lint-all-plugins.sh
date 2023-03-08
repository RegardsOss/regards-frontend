#!/usr/bin/env bash

# Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

# 1 - Print command header
types=('all' 'criterion' 'services')
echo "------------------------------------------------"
echo "Linting all plugins (not auto fix):"
echo "Parameter #1 type: one of"
echo ${types[@]}
echo "------------------------------------------------"

# 2 - Determinate running parameters
function findOrDefault {
  paramArray=$1[@]
  searchArray=("${!paramArray}")
  searchElement=$2
  for i in ${searchArray[@]}; do
   if [ "${i}" = "${searchElement}" ]; then
    # Found value, return it
    echo ${i}
    return
   fi
  done
  echo ${searchArray[0]}
}

runningType=$(findOrDefault types $2)

# 2.2 - resolve folders to run
if [ "$runningType" = "criterion" ]; then
  buildFolders=('criterion')
elif [ "$runningType" = "services" ]; then
  buildFolders=('service')
else 
  buildFolders=('criterion' 'service')
fi

# 3 - For each plugin folder in build folders, build each folder with each build command
home=`pwd`
for rootFolder in "${buildFolders[@]}"; do
  echo ""
  echo "    -------------------------------------------"
  echo "    Searching folder ${rootFolder} ...."
  echo "    -------------------------------------------"
  echo ""
  # find all subfolders
  cd plugins/${rootFolder}
  pluginsInFolder=`find . -maxdepth 1 -type d `
  # Init: place at home (npm needs to be in current run folder)
  cd ${home}
  for pluginFolder in ${pluginsInFolder}; do
    if [ $pluginFolder != '.' ] && [ $pluginFolder != '..' ]; then
      if [ -d "plugins/criterion/${pluginFolder}" ]; then
          echo ""
          echo "        -------------------------------------"
          echo "        Lint plugin ${pluginFolder} ...."
          echo "        -------------------------------------"
          echo ""
          cd plugins/${rootFolder}/${pluginFolder}
          pwd
          yarn lint
          cd ${home}
      fi
    fi
  done
done


