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

export const sipSumitionRoute = {
  path: 'sip/submission',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/submission/SIPSubmissionFormContainer')
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
      const container = require('./containers/submission/SIPSubmissionSummaryContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

export const oaisFeatureManagerRouteType = {
  path: 'featureManager/:type',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/OAISFeatureManagerContainer')
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
      const container = require('./containers/OAISFeatureManagerContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

export const oaisSettingsRoute = {
  path: 'settings',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/OAISSettingsContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

const aipManagementRouter = {
  childRoutes: [
    sipSumitionRoute,
    sipSumitionSummaryRoute,
    oaisFeatureManagerRouteType,
    oaisFeatureManagerRoute,
    oaisSettingsRoute,
  ],
}

export default aipManagementRouter
