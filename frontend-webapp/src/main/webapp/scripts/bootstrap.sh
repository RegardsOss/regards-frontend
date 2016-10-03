#!/usr/bin/env bash

## To enable auto reload we need to create symlink between the modules and the app
## Webpack compiles all these packages without that package depend on another package
# and uses the main webapp/node_modules to provides dependencies to these modules (fallback of webpack)

npm link web_modules/data/models

npm link web_modules/data/api

npm link web_modules/utils/authentication

npm link web_modules/utils/display-control

npm link web_modules/data/store

npm link web_modules/view/theme

npm link web_modules/view/components

npm link web_modules/utils/access-rights
npm link web_modules/view/i18n
npm link web_modules/view/injector
npm link web_modules/utils/some-pckg
npm link web_modules/utils/plugins
npm link web_modules/utils/store-utils

npm link web_modules/modules/admin
npm link web_modules/modules/admin-data-management
npm link web_modules/modules/admin-project-management


npm link web_modules/modules/portal
