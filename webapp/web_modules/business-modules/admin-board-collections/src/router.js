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

export const collectionManagementRouter = {
  path: 'collection',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const adminDataCollectionManagement = require('@regardsoss/admin-data-collection-management')
      cb(null, [adminDataCollectionManagement.collectionDataManagementRouter])
    })
  },
}

export const datasetManagementRouter = {
  path: 'dataset',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const adminDataDatasetManagement = require('@regardsoss/admin-data-dataset-management')
      cb(null, [adminDataDatasetManagement.datasetDataManagementRouter])
    })
  },
}

const collectionsRouter = {
  childRoutes: [
    boardRoute,
    collectionManagementRouter,
    datasetManagementRouter,
  ],
}

export default collectionsRouter
