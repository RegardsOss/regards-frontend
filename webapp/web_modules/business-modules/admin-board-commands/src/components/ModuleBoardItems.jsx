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
import ViewLinesIcon from 'mdi-material-ui/ViewHeadline'
import { orderDependencies } from '@regardsoss/admin-order-management'

/**
 * BoardItems configuration for command board
 * @param project
 * @param intl
 */
const items = (project, intl) => [
  // orders list card
  {
    title: intl.formatMessage({ id: 'commands.board.orders.title' }),
    description: intl.formatMessage({ id: 'commands.board.orders.description' }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/commands/history/list`,
      icon: <ViewLinesIcon />,
      className: 'selenium-ordersList',
      tooltipMsg: intl.formatMessage({ id: 'commands.board.tooltip.list' }),
      hateoasDependencies: orderDependencies.listDependencies,
    }],
  },
]

export default items
