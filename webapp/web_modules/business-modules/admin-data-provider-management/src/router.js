/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * @author Sébastien Binda
 */
export const AcquisitionProcessingChainRoute = {
  path: 'chain/list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/configuration/AcquisitionProcessingChainListContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

export const AcquisitionProcessingChainCreateRoute = {
  path: 'chain/create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/configuration/AcquisitionProcessingChainFormContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

export const AcquisitionProcessingChainEditOrDuplicateRoute = {
  path: 'chain/:chainId/:mode',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/configuration/AcquisitionProcessingChainFormContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

export const AcquisitionProcessingChainMonitoringRoute = {
  path: 'monitoring/chains',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/monitoring/AcquisitionProcessingChainMonitorListContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

export const ProductRoute = {
  path: 'monitoring/chains/:chainId/products',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/monitoring/ProductListContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

export const ProductFilesRoute = {
  path: 'monitoring/chains/:chainId/products/:productId/files',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/monitoring/AcquisitionFileListContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

export const AcquisitionFileRoute = {
  path: 'monitoring/chains/:chainId/files',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/monitoring/AcquisitionFileListContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

export const SessionRoute = {
  path: 'sessions',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/session/SessionsMonitoringContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

const dataProviderManagementRouter = {
  childRoutes: [
    AcquisitionProcessingChainRoute,
    AcquisitionProcessingChainCreateRoute,
    AcquisitionProcessingChainEditOrDuplicateRoute,
    AcquisitionProcessingChainMonitoringRoute,
    ProductRoute,
    ProductFilesRoute,
    AcquisitionFileRoute,
    SessionRoute,
  ],
}

export default dataProviderManagementRouter
