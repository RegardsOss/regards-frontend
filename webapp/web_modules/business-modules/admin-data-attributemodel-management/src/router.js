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
export const listAttributeModelRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const AttributeModelListContainer = require('./containers/AttributeModelListContainer')
      cb(null, {
        content: AttributeModelListContainer.default,
      })
    })
  },
}

export const createAttributeModelRoute = {
  path: 'create(/fragment/:fragment_name)',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const AttributeModelFormContainer = require('./containers/AttributeModelFormContainer')
      cb(null, {
        content: AttributeModelFormContainer.default,
      })
    })
  },
}

export const editAttributeModelRoute = {
  path: ':attrModel_id/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const AttributeModelFormContainer = require('./containers/AttributeModelFormContainer')
      cb(null, {
        content: AttributeModelFormContainer.default,
      })
    })
  },
}

const modelDataManagementRouter = {
  childRoutes: [
    listAttributeModelRoute,
    createAttributeModelRoute,
    editAttributeModelRoute,
  ],
}

export default modelDataManagementRouter
