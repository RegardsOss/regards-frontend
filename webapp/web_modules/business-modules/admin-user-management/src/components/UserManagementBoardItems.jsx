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
import AddIcon from 'material-ui/svg-icons/content/add-circle'
import ViewLinesIcon from 'material-ui/svg-icons/action/view-headline'
import { projectUserDependencies } from '@regardsoss/admin-user-projectuser-management'
import { roleDependencies } from '@regardsoss/admin-user-role-management'
import { orderDependencies } from '@regardsoss/admin-order-management'
import UsersListWithCountIconContainer from '../containers/UsersListWithCountIconContainer'


/**
 * Configuration file for user management boards items.
 * @param project
 * @param intl
 */
export default (project, intl) => [
  // user list card
  {
    title: intl.formatMessage({ id: 'user.board.project-user.title' }),
    description: intl.formatMessage({ id: 'user.board.project-user.description' }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/user/project-user/list`,
      icon: <UsersListWithCountIconContainer />,
      className: 'selenium-userList',
      tooltipMsg: intl.formatMessage({ id: 'user.board.tooltip.list' }),
      hateoasDependencies: projectUserDependencies.listDependencies,
    }, {
      path: `/admin/${project}/user/project-user/create`,
      icon: <AddIcon />,
      className: 'selenium-userCreate',
      tooltipMsg: intl.formatMessage({ id: 'user.board.tooltip.add' }),
      hateoasDependencies: projectUserDependencies.addDependencies,
    }],
  },
  // role list card
  {
    title: intl.formatMessage({ id: 'user.board.role.title' }),
    description: intl.formatMessage({ id: 'user.board.role.description' }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/user/role/list`,
      icon: <ViewLinesIcon />,
      className: 'selenium-roleList',
      tooltipMsg: intl.formatMessage({ id: 'user.board.tooltip.list' }),
      hateoasDependencies: roleDependencies.listDependencies,
    }, {
      path: `/admin/${project}/user/role/create`,
      icon: <AddIcon />,
      className: 'selenium-roleCreate',
      tooltipMsg: intl.formatMessage({ id: 'user.board.tooltip.add' }),
      hateoasDependencies: roleDependencies.addDependencies,
    }],
  },
  // orders list card
  {
    title: intl.formatMessage({ id: 'user.board.orders.title' }),
    description: intl.formatMessage({ id: 'orders.board.orders.description' }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/user/order/list`,
      icon: <ViewLinesIcon />,
      className: 'selenium-ordersList',
      tooltipMsg: intl.formatMessage({ id: 'user.board.tooltip.list' }),
      hateoasDependencies: orderDependencies.listDependencies,
    }],
  },
]
