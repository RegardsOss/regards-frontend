/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import values from 'lodash/values'

/**
 * order status related constants
 * @author Raphaël Mechali
 */

/**
 * Possible values for order status
 */
export const ORDER_STATUS_ENUM = {
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED',
  EXPIRED: 'EXPIRED',
  FAILED: 'FAILED',
  DONE_WITH_WARNING: 'DONE_WITH_WARNING',
  DONE: 'DONE',
  DELETED: 'DELETED',
  REMOVED: 'REMOVED',
}

/**
 * Order status as list
 */
export const ORDER_STATUS = values(ORDER_STATUS_ENUM)
