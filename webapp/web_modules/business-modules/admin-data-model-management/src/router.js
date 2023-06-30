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
export const listModelRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ModelListContainer = require('./containers/ModelListContainer')
      cb(null, {
        content: ModelListContainer.default,
      })
    })
  },
}

export const createModelRoute = {
  path: 'create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ModelFormContainer = require('./containers/ModelFormContainer')
      cb(null, {
        content: ModelFormContainer.default,
      })
    })
  },
}

export const editModelRoute = {
  path: ':modelName/:mode',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ModelFormContainer = require('./containers/ModelFormContainer')
      cb(null, {
        content: ModelFormContainer.default,
      })
    })
  },
}

const modelDataManagementRouter = {
  childRoutes: [
    listModelRoute,
    createModelRoute,
    editModelRoute,
  ],
}

export default modelDataManagementRouter
