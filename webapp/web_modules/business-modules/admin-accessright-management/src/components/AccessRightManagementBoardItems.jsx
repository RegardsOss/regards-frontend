/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { listDependencies as GroupEditDep, addDependencies as GroupAddDep } from '@regardsoss/admin-accessright-accessgroup-management/src/dependencies'

/**
 * Configuration file for user management boards items.
 * @param project
 * @param intl
 */
export default (project, intl) => [
  {
    title: intl.formatMessage({ id: 'accessright.board.accessgroup.title' }),
    description: intl.formatMessage({ id: 'accessright.board.accessgroup.description' }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/data/access-right/access-group/list`,
      icon: <ViewLinesIcon />,
      className: 'selenium-accessgroupList',
      tooltipMsg: intl.formatMessage({ id: 'accessright.board.tooltip.list' }),
      hateoasDependencies: GroupEditDep,
    }, {
      path: `/admin/${project}/data/access-right/access-group/create`,
      icon: <AddIcon />,
      className: 'selenium-accessgroupCreate',
      tooltipMsg: intl.formatMessage({ id: 'accessright.board.tooltip.add' }),
      hateoasDependencies: GroupAddDep,
    }],
  },
]
