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
export const listSearchEngineConfigurationRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const SearchEngineConfigurationListContainer = require('./containers/configuration/SearchEngineConfigurationListContainer')
      cb(null, {
        content: SearchEngineConfigurationListContainer.default,
      })
    })
  },
}

export const createSearchEngineConfigurationRoute = {
  path: 'create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const SearchEngineConfigurationFormContainer = require('./containers/configuration/SearchEngineConfigurationFormContainer')
      cb(null, {
        content: SearchEngineConfigurationFormContainer.default,
      })
    })
  },
}

export const editSearchEngineConfigurationRoute = {
  path: ':confId/:mode',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const SearchEngineConfigurationFormContainer = require('./containers/configuration/SearchEngineConfigurationFormContainer')
      cb(null, {
        content: SearchEngineConfigurationFormContainer.default,
      })
    })
  },
}

const searchEnginesRouter = {
  childRoutes: [
    listSearchEngineConfigurationRoute,
    createSearchEngineConfigurationRoute,
    editSearchEngineConfigurationRoute,
  ],
}

export default searchEnginesRouter
