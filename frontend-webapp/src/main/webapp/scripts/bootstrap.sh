#!/usr/bin/env bash

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

## To enable auto reload we need to create symlink between the modules and the app
## Webpack compiles all these packages without that package depend on another package
## and uses the main webapp/node_modules to provides dependencies to these modules (fallback of webpack)

set -e

SCRIPT_DIR=`dirname "${BASH_SOURCE[0]}"`

# Clean directories
if [ -d "${SCRIPT_DIR}/../node_modules/.cache" ]; then
  echo "Clean babel cache directory : ${SCRIPT_DIR}/../node_modules/.cache"
  rm -rf "${SCRIPT_DIR}/../node_modules/.cache"
fi

if [ -d "${SCRIPT_DIR}/../node_modules/@regardsoss" ]; then
  echo "Clean regardsoss modules : ${SCRIPT_DIR}/../node_modules/@regardsoss"
  rm -rf "${SCRIPT_DIR}/../node_modules/@regardsoss"
fi

if [ -d "${SCRIPT_DIR}/../node_modules/@regardsoss-modules" ]; then
  echo "Clean regardsoss modules : ${SCRIPT_DIR}/../node_modules/@regardsoss-modules"
  rm -rf "${SCRIPT_DIR}/../node_modules/@regardsoss-modules"
fi

# Lint
npm install eslint-config-es6-rules

# Webpack REGARDS conf
npm install webpack-config-front

# Data
npm link web_modules/data/api
npm link web_modules/data/store
npm link web_modules/data/shape
npm link web_modules/data/domain
npm link web_modules/data/client

# Tools
npm link web_modules/utils/adapters
npm link web_modules/utils/authentication-manager
npm link web_modules/utils/display-control
npm link web_modules/utils/form-utils
npm link web_modules/utils/i18n
npm link web_modules/utils/i18n-ui
npm link web_modules/utils/layout
npm link web_modules/utils/mime-types
npm link web_modules/utils/modules
npm link web_modules/utils/modules-api
npm link web_modules/utils/plugins
npm link web_modules/utils/plugins-api
npm link web_modules/utils/redux
npm link web_modules/utils/store-utils
npm link web_modules/utils/tests-helpers
npm link web_modules/utils/theme
npm link web_modules/utils/theme-ui
npm link web_modules/utils/units

# Common components
npm link web_modules/components

# Common business components
npm link web_modules/business-common/admin-data-entities-attributes-management
npm link web_modules/business-common/attributes-common
npm link web_modules/business-common/endpoints-common
npm link web_modules/business-common/entities-common
npm link web_modules/business-common/global-system-error
npm link web_modules/business-common/microservice-plugin-configurator
npm link web_modules/business-common/order-common
npm link web_modules/business-common/project-handler
npm link web_modules/business-common/user-metadata-common

# Administration modules
npm link web_modules/business-modules/admin-board-acquisition
npm link web_modules/business-modules/admin-board-collections
npm link web_modules/business-modules/admin-board-models
npm link web_modules/business-modules/admin-accessright-management
npm link web_modules/business-modules/admin-accessright-accessgroup-management
npm link web_modules/business-modules/admin-accessright-dataaccess-management
npm link web_modules/business-modules/admin-account-management
npm link web_modules/business-modules/admin-data-model-management
npm link web_modules/business-modules/admin-data-attributemodel-management
npm link web_modules/business-modules/admin-data-modelattribute-management
npm link web_modules/business-modules/admin-data-collection-management
npm link web_modules/business-modules/admin-data-connection-management
npm link web_modules/business-modules/admin-data-dataset-management
npm link web_modules/business-modules/admin-data-datasource-management
npm link web_modules/business-modules/admin-data-document-management
npm link web_modules/business-modules/admin-data-fragment-management
npm link web_modules/business-modules/admin-data-provider-management
npm link web_modules/business-modules/admin-ingest-processing-chain-management
npm link web_modules/business-modules/admin-ingest-sip-management
npm link web_modules/business-modules/admin-microservice-management
npm link web_modules/business-modules/admin-order-management
npm link web_modules/business-modules/admin-project-management
npm link web_modules/business-modules/admin-storage-management
npm link web_modules/business-modules/admin-ui-management
npm link web_modules/business-modules/admin-ui-plugin-management
npm link web_modules/business-modules/admin-ui-layout-management
npm link web_modules/business-modules/admin-ui-theme-management
npm link web_modules/business-modules/admin-ui-module-management
npm link web_modules/business-modules/admin-ui-service-management
npm link web_modules/business-modules/admin-user-management
npm link web_modules/business-modules/admin-user-projectuser-management
npm link web_modules/business-modules/admin-user-role-resource-access-management
npm link web_modules/business-modules/admin-user-role-management

# Global modules
npm link web_modules/modules/authentication
npm link web_modules/modules/embedded-html
npm link web_modules/modules/licenses
npm link web_modules/modules/menu
npm link web_modules/modules/news
npm link web_modules/modules/order-cart
npm link web_modules/modules/order-history
npm link web_modules/modules/project-about-page
npm link web_modules/modules/projects-list
npm link web_modules/modules/search-form
npm link web_modules/modules/search-graph
npm link web_modules/modules/search-results
npm link web_modules/modules/storage-monitoring

# Applications
npm link web_modules/business-modules/admin
npm link web_modules/business-modules/portal
npm link web_modules/business-modules/user

# Vendors
npm link web_modules/vendors
