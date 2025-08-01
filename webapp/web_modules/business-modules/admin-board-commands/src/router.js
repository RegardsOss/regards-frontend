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
export const boardRoute = {
  path: 'board',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const moduleContainer = require('./components/ModuleContainer')
      cb(null, { content: moduleContainer.default })
    })
  },
}

export const commandsManagementRouter = {
  path: 'history',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const orderManagement = require('@regardsoss/admin-order-management')
      cb(null, [orderManagement.orderRouter])
    })
  },
}

export const processingManagementRouter = {
  path: 'processing',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const processingManagement = require('@regardsoss/admin-processing-management')
      cb(null, [processingManagement.processingRouter])
    })
  },
}

const deliveryManagementRouter = {
  path: 'delivery',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const deliveryManagement = require('@regardsoss/admin-delivery-management')
      cb(null, [deliveryManagement.deliveryManagementRouter])
    })
  },
}

const commandsRouter = {
  childRoutes: [
    boardRoute,
    commandsManagementRouter,
    processingManagementRouter,
    deliveryManagementRouter,
  ],
}

export default commandsRouter
