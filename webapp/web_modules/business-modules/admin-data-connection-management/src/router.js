/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
export const listConnectionRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ConnectionListContainer = require('./containers/ConnectionListContainer')
      cb(null, {
        content: ConnectionListContainer.default,
      })
    })
  },
}

export const createConnectionRoute = {
  path: 'create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ConnectionFormContainer = require('./containers/ConnectionFormContainer')
      cb(null, {
        content: ConnectionFormContainer.default,
      })
    })
  },
}

export const editConnectionRoute = {
  path: ':connectionId/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ConnectionFormContainer = require('./containers/ConnectionFormContainer')
      cb(null, {
        content: ConnectionFormContainer.default,
      })
    })
  },
}

const connectionDataManagementRouter = {
  childRoutes: [
    listConnectionRoute,
    createConnectionRoute,
    editConnectionRoute,
  ],
}

export default connectionDataManagementRouter
