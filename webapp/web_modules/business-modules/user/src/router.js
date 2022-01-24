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

/**
 * Main route to access UI-Confiuration module fonctionalities
 * @author Sébastien binda
 * @author Léo Mieulet
 */
export const dynamicModuleRoot = {
  path: 'modules/:moduleId',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const DynamicContentContainer = require('./containers/DynamicContentContainer')
      cb(null, {
        content: DynamicContentContainer.default,
      })
    })
  },
}

export const redirectModuleRoute = {
  path: 'redirect',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const RedirectContainer = require('./containers/RedirectContainer')
      cb(null, {
        content: RedirectContainer.default,
      })
    })
  },
}

const userRouter = {
  path: 'user/:project',
  childRoutes: [
    dynamicModuleRoot,
    redirectModuleRoute,
  ],
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const UserApp = require('./containers/UserApp')
      cb(null, UserApp.default)
    })
  },
}

export default userRouter
