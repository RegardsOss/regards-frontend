#!/usr/bin/env bash

#
# LICENSE_PLACEHOLDER
#

## To enable auto reload we need to create symlink between the modules and the app
## Webpack compiles all these packages without that package depend on another package
# and uses the main webapp/node_modules to provides dependencies to these modules (fallback of webpack)

npm link web_modules/components

npm link web_modules/data/api
npm link web_modules/data/store
npm link web_modules/data/model

npm link web_modules/utils/form-utils
npm link web_modules/utils/i18n
npm link web_modules/utils/plugins
npm link web_modules/utils/store-utils
npm link web_modules/utils/theme
npm link web_modules/utils/authentication
npm link web_modules/utils/display-control
npm link web_modules/utils/tests-helpers
npm link web_modules/utils/modules-manager

npm link web_modules/modules/admin
npm link web_modules/modules/admin-data-management
npm link web_modules/modules/admin-data-model-management
npm link web_modules/modules/admin-data-attributemodel-management
npm link web_modules/modules/admin-project-management
npm link web_modules/modules/admin-user-management
npm link web_modules/modules/admin-user-projectuser-management
npm link web_modules/modules/admin-user-role-management
npm link web_modules/modules/admin-database-management
npm link web_modules/modules/admin-account-management
npm link web_modules/modules/news
npm link web_modules/modules/portal
npm link web_modules/modules/portal-menu
npm link web_modules/modules/portal-projects
