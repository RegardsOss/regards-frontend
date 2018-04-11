/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 */
export const listDocumentRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DocumentListContainer = require('./containers/DocumentListContainer')
      cb(null, {
        content: DocumentListContainer.default,
      })
    })
  },
}

export const createDocumentRoute = {
  path: 'create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DocumentFormContainer = require('./containers/DocumentFormContainer')
      cb(null, {
        content: DocumentFormContainer.default,
      })
    })
  },
}

export const editDocumentLinksRoute = {
  path: ':documentId/links',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DocumentEditLinksContainer = require('./containers/DocumentEditLinksContainer')
      cb(null, {
        content: DocumentEditLinksContainer.default,
      })
    })
  },
}

export const editDocumentFilesRoute = {
  path: ':documentId/files',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DocumentEditFilesContainer = require('./containers/DocumentEditFilesContainer')
      cb(null, {
        content: DocumentEditFilesContainer.default,
      })
    })
  },
}


export const editDocumentRoute = {
  path: ':documentId/:mode',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DocumentFormContainer = require('./containers/DocumentFormContainer')
      cb(null, {
        content: DocumentFormContainer.default,
      })
    })
  },
}


const documentDataManagementRouter = {
  childRoutes: [
    listDocumentRoute,
    createDocumentRoute,
    editDocumentFilesRoute,
    editDocumentLinksRoute,
    editDocumentRoute,
  ],
}

export default documentDataManagementRouter
