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
export const listCollectionRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const CollectionListContainer = require('./containers/CollectionListContainer')
      cb(null, {
        content: CollectionListContainer.default,
      })
    })
  },
}

export const createCollectionRoute = {
  path: 'create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const CollectionFormContainer = require('./containers/CollectionFormContainer')
      cb(null, {
        content: CollectionFormContainer.default,
      })
    })
  },
}

export const editCollectionLinksRoute = {
  path: ':collectionId/links',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const CollectionEditLinksContainer = require('./containers/CollectionEditLinksContainer')
      cb(null, {
        content: CollectionEditLinksContainer.default,
      })
    })
  },
}

export const editCollectionFilesRoute = {
  path: ':collectionId/files',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const CollectionEditLinksContainer = require('./containers/CollectionEditFilesContainer')
      cb(null, {
        content: CollectionEditLinksContainer.default,
      })
    })
  },
}

export const editCollectionRoute = {
  path: ':collectionId/:mode',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const CollectionFormContainer = require('./containers/CollectionFormContainer')
      cb(null, {
        content: CollectionFormContainer.default,
      })
    })
  },
}

const collectionDataManagementRouter = {
  childRoutes: [
    listCollectionRoute,
    createCollectionRoute,
    editCollectionLinksRoute,
    editCollectionFilesRoute,
    editCollectionRoute,
  ],
}

export default collectionDataManagementRouter
