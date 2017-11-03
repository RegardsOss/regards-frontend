/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { OrderClient } from '@regardsoss/client'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { createOrderActions } from './client/CreateOrderClient'

/**
 * Module hateoas depencies
 * @author Raphaël Mechali
 */

const orderBasketActions = new OrderClient.OrderBasketActions()

/**
 * Mandatory Dependencies to display module in user interface
 * @type {Array}
 */
const user = [
  // dependencies to show and manage basket
  ...orderBasketActions.getDependencies(RequestVerbEnum.GET),
  ...orderBasketActions.getDependencies(RequestVerbEnum.POST),
  ...orderBasketActions.getDependencies(RequestVerbEnum.DELETE),
  // dependency to handle start order
  createOrderActions.getDependency(RequestVerbEnum.POST),
]

/**
 * Mandatory Dependencies to display module in admin interface
 * @type {Array}
 */
const admin = []

export default {
  user,
  admin,
}