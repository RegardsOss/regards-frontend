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
import AddIcon from 'mdi-material-ui/PlusCircle'
import ViewLinesIcon from 'mdi-material-ui/ViewHeadline'
import SettingsIcon from 'mdi-material-ui/Cog'
import { projectUserDependencies } from '@regardsoss/admin-user-projectuser-management'
import { roleDependencies } from '@regardsoss/admin-user-role-management'
import { accessGroupDependencies } from '@regardsoss/admin-accessright-accessgroup-management'
import { authenticationPluginManagementDependencies } from '@regardsoss/admin-user-authentication-plugins-management'
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
      path: `/admin/${project}/user/project-user/settings`,
      icon: <SettingsIcon />,
      tooltipMsg: intl.formatMessage({ id: 'user.board.settings.tooltip' }),
      hateoasDependencies: projectUserDependencies.settingsDependencies,
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
  {
    title: intl.formatMessage({ id: 'accessright.board.accessgroup.title' }),
    description: intl.formatMessage({ id: 'accessright.board.accessgroup.description' }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/user/access-group/list`,
      icon: <ViewLinesIcon />,
      className: 'selenium-accessgroupList',
      tooltipMsg: intl.formatMessage({ id: 'accessright.board.tooltip.list' }),
      hateoasDependencies: accessGroupDependencies.listDependencies,
    }, {
      path: `/admin/${project}/user/access-group/create`,
      icon: <AddIcon />,
      className: 'selenium-accessgroupCreate',
      tooltipMsg: intl.formatMessage({ id: 'accessright.board.tooltip.add' }),
      hateoasDependencies: accessGroupDependencies.addDependencies,
    }],
  },
  {
    title: intl.formatMessage({ id: 'user.board.authentication-plugins.title' }),
    description: intl.formatMessage({ id: 'user.board.authentication-plugins.description' }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/user/authenticationplugins/list`,
      icon: <ViewLinesIcon />,
      className: 'selenium-authenticationpluginsList',
      tooltipMsg: intl.formatMessage({ id: 'user.board.tooltip.list' }),
      hateoasDependencies: [
        ...authenticationPluginManagementDependencies.listDependencies,
        ...authenticationPluginManagementDependencies.addDependencies,
      ],
    }],
  },
]
