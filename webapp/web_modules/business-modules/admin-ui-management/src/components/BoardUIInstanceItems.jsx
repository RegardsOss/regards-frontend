/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import ViewQuilt from 'mdi-material-ui/ViewQuilt'
import ViewLinesIcon from 'mdi-material-ui/ViewHeadline'
import AddIcon from 'mdi-material-ui/PlusCircle'

/**
 * Configuration file for UI-Configuration boards items.
 * @param project
 * @param intl
 * @author Sébastien binda
 */
export default (intl) => [
  {
    title: intl.formatMessage({ id: 'portal.layout.title' }),
    description: intl.formatMessage({ id: 'project.layout.description' }),
    advanced: false,
    actions: [{
      path: '/admin/ui/layout/portal',
      icon: <ViewQuilt />,
      tooltipMsg: intl.formatMessage({ id: 'project.layout.tooltip' }),
    }],
  },
  {
    title: intl.formatMessage({ id: 'portal.module.title' }),
    description: intl.formatMessage({ id: 'project.module.description' }),
    advanced: false,
    actions: [{
      path: '/admin/ui/module/portal/list',
      icon: <ViewLinesIcon />,
      tooltipMsg: intl.formatMessage({ id: 'action.list.tooltip' }),
    }, {
      path: '/admin/ui/module/portal/create',
      icon: <AddIcon />,
      tooltipMsg: intl.formatMessage({ id: 'action.add.tooltip' }),
    }],
  },
  {
    title: intl.formatMessage({ id: 'portal.theme.title' }),
    description: intl.formatMessage({ id: 'project.theme.description' }),
    advanced: false,
    actions: [{
      path: '/admin/ui/theme/list',
      icon: <ViewLinesIcon />,
      tooltipMsg: intl.formatMessage({ id: 'action.list.tooltip' }),
    }, {
      path: '/admin/ui/theme/create',
      icon: <AddIcon />,
      tooltipMsg: intl.formatMessage({ id: 'action.add.tooltip' }),
    }],
  },
]
