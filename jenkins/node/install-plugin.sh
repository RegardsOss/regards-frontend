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

cd /app_to_build/plugins/$1/$2

if [ -d "node_modules/@regardsoss" ]; then
  echo "> Clear previous dependencies to regards"
  rm -rf "node_modules/@regardsoss"
fi
pwd
# mdi-material-ui@"^4.28.0" expects material-ui@"^0.17.4 so we need to disable that check
npm install --prefer-offline --legacy-peer-deps --no-update-notifier