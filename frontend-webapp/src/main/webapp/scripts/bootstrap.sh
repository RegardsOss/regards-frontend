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
npm link web_modules/data/client

# Tools
npm link web_modules/utils/adapters
npm link web_modules/utils/authentication-manager
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

# Common business components
npm link web_modules/business-common/attributes-common
npm link web_modules/business-common/entities-common
npm link web_modules/business-common/user-metadata-common
npm link web_modules/business-common/endpoint
npm link web_modules/business-common/global-system-error

# Administration modules
npm link web_modules/business-modules/admin-accessright-management
npm link web_modules/business-modules/admin-account-management
npm link web_modules/business-modules/admin-data-management
npm link web_modules/business-modules/admin-data-model-management
npm link web_modules/business-modules/admin-data-attributemodel-management
npm link web_modules/business-modules/admin-data-modelattribute-management
npm link web_modules/business-modules/admin-data-collection-management
npm link web_modules/business-modules/admin-data-connection-management
npm link web_modules/business-modules/admin-data-dataset-management
npm link web_modules/business-modules/admin-data-datasource-management
npm link web_modules/business-modules/admin-data-fragment-management
npm link web_modules/business-modules/admin-microservice-management
npm link web_modules/business-modules/admin-project-management
npm link web_modules/business-modules/admin-ui-management
npm link web_modules/business-modules/admin-ui-plugin-management
npm link web_modules/business-modules/admin-ui-layout-management
npm link web_modules/business-modules/admin-ui-theme-management
npm link web_modules/business-modules/admin-ui-module-management
npm link web_modules/business-modules/admin-ui-service-management
npm link web_modules/business-modules/admin-user-management
npm link web_modules/business-modules/admin-user-accessgroup-management
npm link web_modules/business-modules/admin-user-projectuser-management
npm link web_modules/business-modules/admin-user-role-resource-access-management
npm link web_modules/business-modules/admin-user-role-management

# Global modules
npm link web_modules/modules/authentication
npm link web_modules/modules/home-page
npm link web_modules/modules/licenses
npm link web_modules/modules/menu
npm link web_modules/modules/news
npm link web_modules/modules/projects-list
npm link web_modules/modules/search-facets
npm link web_modules/modules/search-form
npm link web_modules/modules/search-graph
npm link web_modules/modules/search-results
npm link web_modules/modules/archival-storage-aip-status
npm link web_modules/modules/archival-storage-plugins-monitoring

# Applications
npm link web_modules/business-modules/admin
npm link web_modules/business-modules/portal
npm link web_modules/business-modules/user

# Vendors
npm link web_modules/vendors
