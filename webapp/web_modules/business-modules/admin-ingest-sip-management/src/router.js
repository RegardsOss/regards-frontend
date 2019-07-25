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

export const sipSessionRoute = {
  path: 'session',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/SIPSessionListContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

export const sipListRoute = {
  path: ':session/list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/SIPListContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

export const sipHistoryListRoute = {
  path: ':session/:sip/history',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/SIPListContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

export const sipSumitionRoute = {
  path: 'submission',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/SIPSubmissionFormContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

export const sipSumitionSummaryRoute = {
  path: 'submission-summary',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/SIPSubmissionSummaryContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}


const sipManagementRouter = {
  childRoutes: [
    sipSessionRoute,
    sipListRoute,
    sipHistoryListRoute,
    sipSumitionRoute,
    sipSumitionSummaryRoute,
  ],
}

export default sipManagementRouter
