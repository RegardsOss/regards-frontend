#!/usr/bin/env bash

# Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

runningMode=$(findOrDefault modes $1)
runningType=$(findOrDefault types $2)

# 2.2 -resolve running mode as build commands
if [ "$runningMode" = "dev" ]; then
  if [ -z "$GATEWAY_PLUGINS" ]; then
    echo -e "[\033[0;31mERROR$(tput sgr0)] In dev environnment, $(tput bold)GATEWAY_PLUGINS$(tput sgr0) var must be set"
    echo "Syntax:"
    echo "GATEWAY_PLUGINS=https://validation-regards.cloud-espace.si.c-s.fr yarn build:plugins"
    exit 1
  fi
  buildCommands=('yarn build:dev')
  globalDist="${home}/dist/dev"
elif [ "$runningMode" = "prod" ]; then
  buildCommands=('yarn build:production')
  globalDist="${home}/dist/prod"
else 
  buildCommands=('yarn build:production' 'yarn build:dev')
  globalDist="${home}/dist/dev"
fi

# 2.3 - resolve folders to run
if [ "$runningType" = "criterion" ]; then
  buildFolders=('criterion')
elif [ "$runningType" = "services" ]; then
  buildFolders=('service')
else 
  buildFolders=('criterion' 'service')
fi

# 3 - For each plugin folder in build folders, build each folder with each build command
for rootFolder in "${buildFolders[@]}"; do
  echo ""
  echo "    -------------------------------------------"
  echo "    Searching folder ${rootFolder} ...."
  echo "    -------------------------------------------"
  echo ""
  # enter sub folder
  cd plugins/${rootFolder}
  # clear previous package-lock.json
  find . -name 'package-lock.json' -exec rm {} \;
  # find all subfolders
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
          pwd
          # run build commands as specified by the command user
          for buildCommand in "${buildCommands[@]}"; do
            ${buildCommand}
          done
          # copy built plugin to global dist directory
          echo ""
          echo "> Copying build file to global dist directory ${globalDist}"
          if [ -f "target/${runningMode}/plugin.js" ]; then
            mkdir -p "${globalDist}/plugins/${rootFolder}/${pluginFolder}"
            cp "target/${runningMode}/plugin.js" "${globalDist}/plugins/${rootFolder}/${pluginFolder}/plugin.js"
          fi
          cd ${home}
      fi
    fi
  done
done


