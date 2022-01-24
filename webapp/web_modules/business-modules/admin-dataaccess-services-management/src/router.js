/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
export const listServiceRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ServiceListContainer = require('./containers/ServiceListContainer')
      cb(null, {
        content: ServiceListContainer.default,
      })
    })
  },
}

export const createServiceRoute = {
  path: 'create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ServiceFormContainer = require('./containers/ServiceFormContainer')
      cb(null, {
        content: ServiceFormContainer.default,
      })
    })
  },
}

export const editServiceRoute = {
  path: ':pluginId/:mode',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ServiceFormContainer = require('./containers/ServiceFormContainer')
      cb(null, {
        content: ServiceFormContainer.default,
      })
    })
  },
}

const servicesManagementRouter = {
  childRoutes: [
    listServiceRoute,
    createServiceRoute,
    editServiceRoute,
  ],
}

export default servicesManagementRouter
