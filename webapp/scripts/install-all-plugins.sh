#!/usr/bin/env bash

# Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

home=`pwd`

# 1 - Print command header
modes=('all' 'dev' 'prod')
types=('all' 'criterion' 'services')
echo "------------------------------------------------"
echo "Compiling all plugins:                          "
echo "Parameter #1 mode: one of"
echo ${modes[@]}
echo "Parameter #2 type: one of"
echo ${types[@]}
echo "------------------------------------------------"

buildFolders=('criterion' 'service')

# 3 - For each plugin folder in build folders, build each folder with each build command
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
      if [ -d "plugins/${rootFolder}/${pluginFolder}" ]; then
          echo ""
          echo "        -------------------------------------"
          echo "        Compiling plugin ${pluginFolder} ...."
          echo "        -------------------------------------"
          echo ""
          cd plugins/${rootFolder}/${pluginFolder}
          if [ -d "node_modules/@regardsoss" ]; then
            echo "> Clear previous dependencies to regards"
            rm -rf "node_modules/@regardsoss"
          fi
          pwd
          npm install --prefer-offline
          cd ${home}
      fi
    fi
  done
done


