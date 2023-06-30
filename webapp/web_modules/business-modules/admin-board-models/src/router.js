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
export const boardRoute = {
  path: 'board',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const moduleContainer = require('./components/ModuleContainer')
      cb(null, {
        content: moduleContainer.default,
      })
    })
  },
}

export const modelManagementRouter = {
  path: 'model',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const adminDataModelManagement = require('@regardsoss/admin-data-model-management')
      cb(null, [adminDataModelManagement.modelDataManagementRouter])
    })
  },
}

export const modelAttributeManagementRouter = {
  path: 'model-attribute',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const adminDataModelAttributeManagement = require('@regardsoss/admin-data-modelattribute-management')
      cb(null, [adminDataModelAttributeManagement.modelAttributeDataManagementRouter])
    })
  },
}

export const attributeModelManagementRouter = {
  path: 'attribute/model',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const adminDataAttrModelManagement = require('@regardsoss/admin-data-attributemodel-management')
      cb(null, [adminDataAttrModelManagement.attributeModelDataManagementRouter])
    })
  },
}

export const fragmentModelManagementRouter = {
  path: 'fragment',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const adminDataFragmentManagement = require('@regardsoss/admin-data-fragment-management')
      cb(null, [adminDataFragmentManagement.fragmentDataManagementRouter])
    })
  },
}

export const attributePluginsRouter = {
  path: 'calculationplugins',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const adminDataAttrPluginsManagement = require('@regardsoss/admin-data-attribute-plugins-management')
      cb(null, [adminDataAttrPluginsManagement.attributePluginDataManagementRouter])
    })
  },
}

const modelsRouter = {
  childRoutes: [
    boardRoute,
    modelManagementRouter,
    modelAttributeManagementRouter,
    attributeModelManagementRouter,
    fragmentModelManagementRouter,
    attributePluginsRouter,
  ],
}

export default modelsRouter
