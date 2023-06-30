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

/**
 * Routers for ingest processing chain management module
 * @author Sébastien Binda
 */
export const createIngestProcessingChainRoute = {
  path: 'create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const formContainer = require('./containers/IngestProcessingChainFormContainer')
      cb(null, {
        content: formContainer.default,
      })
    })
  },
}

export const editIngestProcessingChainRoute = {
  path: ':chain_name/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const formContainer = require('./containers/IngestProcessingChainFormContainer')
      cb(null, {
        content: formContainer.default,
      })
    })
  },
}

export const listIngestProcessingChainRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const listContainer = require('./containers/IngestProcessingChainListContainer')
      cb(null, {
        content: listContainer.default,
      })
    })
  },
}

const processingChainManagementRouter = {
  childRoutes: [
    listIngestProcessingChainRoute,
    createIngestProcessingChainRoute,
    editIngestProcessingChainRoute,
  ],
}

export default processingChainManagementRouter
