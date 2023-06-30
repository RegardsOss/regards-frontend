/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/

export const editAccountRoute = {
  path: ':account_id/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const AccountFormContainer = require('./containers/AccountFormContainer')
      cb(null, {
        content: AccountFormContainer.default,
      })
    })
  },
}

export const listAccountRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const AccountListContainer = require('./containers/AccountListContainer')
      cb(null, {
        content: AccountListContainer.default,
      })
    })
  },
}

export const settingsAccountRoute = {
  path: 'settings',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const AccountsSettingsContainer = require('./containers/AccountsSettingsContainer')
      cb(null, {
        content: AccountsSettingsContainer.default,
      })
    })
  },
}

const accountManagementRouter = {
  childRoutes: [
    editAccountRoute,
    listAccountRoute,
    settingsAccountRoute,
  ],
}

export default accountManagementRouter
