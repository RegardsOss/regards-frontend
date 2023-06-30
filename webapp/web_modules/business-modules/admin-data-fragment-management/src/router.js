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
export const listFragmentRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const FragmentListContainer = require('./containers/FragmentListContainer')
      cb(null, {
        content: FragmentListContainer.default,
      })
    })
  },
}

export const createFragmentRoute = {
  path: 'create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const FragmentFormContainer = require('./containers/FragmentFormContainer')
      cb(null, {
        content: FragmentFormContainer.default,
      })
    })
  },
}

export const editFragmentRoute = {
  path: ':fragment_id/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const FragmentFormContainer = require('./containers/FragmentFormContainer')
      cb(null, {
        content: FragmentFormContainer.default,
      })
    })
  },
}

const fragmentDataManagementRouter = {
  childRoutes: [
    listFragmentRoute,
    createFragmentRoute,
    editFragmentRoute,
  ],
}

export default fragmentDataManagementRouter
