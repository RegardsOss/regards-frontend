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
import { OrderDomain } from '@regardsoss/domain'
import { dataFileFields } from '../rs-dam/DataFile'

/**
 * Order file definitions
 * @author Raphaël Mechali
 */

/** Default shape */
export const OrderFile = PropTypes.shape({
  // specific to order files
  id: PropTypes.number.isRequired,
  orderId: PropTypes.number.isRequired,
  state: PropTypes.oneOf(OrderDomain.ORDER_FILE_STATUS),
  source: PropTypes.string,
  // common to all data files
  ...dataFileFields,
})

/** As returned by server (content / links) */
export const OrderFileWithContent = PropTypes.shape({
  content: OrderFile,
})

/** As reduced in pages  */
export const OrderFilesList = PropTypes.objectOf(OrderFileWithContent)
