#!/usr/bin/env bash

#
# LICENSE_PLACEHOLDER
#

## To enable auto reload we need to create symlink between the modules and the app
## Webpack compiles all these packages without that package depend on another package
# and uses the main webapp/node_modules to provides dependencies to these modules (fallback of webpack)

# Data
npm link web_modules/data/api
npm link web_modules/data/store
npm link web_modules/data/model

# Tools
npm link web_modules/utils/authentication-manager
npm link web_modules/utils/charts
npm link web_modules/utils/form-utils
npm link web_modules/utils/i18n
npm link web_modules/utils/plugins
npm link web_modules/utils/store-utils
npm link web_modules/utils/theme
npm link web_modules/utils/display-control
npm link web_modules/utils/tests-helpers
npm link web_modules/utils/redux
npm link web_modules/utils/modules
npm link web_modules/utils/layout

# Common components
npm link web_modules/components

# Administration modules
npm link web_modules/modules/admin-data-management
npm link web_modules/modules/admin-data-model-management
npm link web_modules/modules/admin-data-attributemodel-management
npm link web_modules/modules/admin-data-modelattribute-management
npm link web_modules/modules/admin-data-collection-management
npm link web_modules/modules/admin-data-fragment-management
npm link web_modules/modules/admin-microservice-management
npm link web_modules/modules/admin-project-management
npm link web_modules/modules/admin-user-management
npm link web_modules/modules/admin-user-projectuser-management
npm link web_modules/modules/admin-user-role-resource-access-management
npm link web_modules/modules/admin-user-role-management
npm link web_modules/modules/admin-database-management
npm link web_modules/modules/admin-account-management
npm link web_modules/modules/admin-ui-configuration
npm link web_modules/modules/admin-ui-plugins-management
npm link web_modules/modules/archival-storage-aip-status
npm link web_modules/modules/archival-storage-plugins-monitoring

# Global modules
npm link web_modules/modules/authentication
npm link web_modules/modules/news
npm link web_modules/modules/menu
npm link web_modules/modules/projects-list
npm link web_modules/modules/global-system-error
npm link web_modules/modules/form
npm link web_modules/modules/endpoint

# Applications
npm link web_modules/modules/admin
npm link web_modules/modules/user
npm link web_modules/modules/portal

# Vendors
npm link web_modules/vendors
