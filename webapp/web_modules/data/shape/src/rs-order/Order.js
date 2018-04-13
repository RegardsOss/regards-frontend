/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/**
 * Order shapes
 * @author Raphaël Mechali
 */

/** An order dataset */
const DatasetTask = PropTypes.shape({
  id: PropTypes.number.isRequired,
  datasetLabel: PropTypes.string.isRequired,
  objectsCount: PropTypes.number.isRequired,
  filesCount: PropTypes.number.isRequired,
  filesSize: PropTypes.number.isRequired,
})

/** An order */
const Order = PropTypes.shape({
  id: PropTypes.number.isRequired,
  owner: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
  expirationDate: PropTypes.string.isRequired,
  percentCompleted: PropTypes.number.isRequired,
  filesInErrorCount: PropTypes.number,
  status: PropTypes.oneOf(OrderDomain.ORDER_STATUS).isRequired,
  waitingForUser: PropTypes.bool.isRequired,
  statusDate: PropTypes.string.isRequired,
  availableFilesCount: PropTypes.number.isRequired,
  datasetTasks: PropTypes.arrayOf(DatasetTask).isRequired,
})

/** An order with both content and links */
const OrderWithContent = PropTypes.shape({
  content: Order,
})

const OrderList = PropTypes.objectOf(OrderWithContent).isRequired

module.exports = {
  DatasetTask,
  Order,
  OrderWithContent,
  OrderList,
}
