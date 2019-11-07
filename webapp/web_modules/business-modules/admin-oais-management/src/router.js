/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

export const aipFullListRoute = {
  path: 'aip/list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/aip/AIPListContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

export const aipFileListRoute = {
  path: 'aip/:aipId/file',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/file/AIPFileListContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

export const sipFullListRoute = {
  path: 'sip/list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/sip/SIPListContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

export const sipHistoryListRoute = {
  path: 'sip/:sip/history',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/sip/SIPListContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

export const sipSumitionRoute = {
  path: 'sip/submission',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/sip/SIPSubmissionFormContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

export const sipSumitionSummaryRoute = {
  path: 'sip/submission-summary',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/sip/SIPSubmissionSummaryContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

export const oaisFeatureManagerRoute = {
  path: 'featureManager',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('../src/containers/OAISFeatureManagerContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

const aipManagementRouter = {
  childRoutes: [
    aipFullListRoute,
    aipFileListRoute,
    sipFullListRoute,
    sipHistoryListRoute,
    sipSumitionRoute,
    sipSumitionSummaryRoute,
    oaisFeatureManagerRoute,
  ],
}

export default aipManagementRouter
