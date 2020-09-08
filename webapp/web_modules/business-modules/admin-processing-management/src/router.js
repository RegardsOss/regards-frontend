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
export const monitoringProcessingRoute = {
  path: 'monitoring',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProcessingMonitoringContainer = require('./containers/ProcessingMonitoringContainer')
      cb(null, {
        content: ProcessingMonitoringContainer.default,
      })
    })
  },
}

export const listProcessingRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProcessingListContainer = require('./containers/ProcessingListContainer')
      cb(null, {
        content: ProcessingListContainer.default,
      })
    })
  }
}

export const addProcessingRoute = {
  path: 'create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProcessingFormContainer = require('./containers/ProcessingFormContainer')
      cb(null, {
        content: ProcessingFormContainer.default,
      })
    })
  },
}

export const editProcessingRoute = {
  path: ':businessId/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProcessingFormContainer = require('./containers/ProcessingFormContainer')
      cb(null, {
        content: ProcessingFormContainer.default,
      })
    })
  },
}
  
export default {
  childRoutes: [
    monitoringProcessingRoute,
    listProcessingRoute,
    addProcessingRoute,
    editProcessingRoute,
  ],
}
  