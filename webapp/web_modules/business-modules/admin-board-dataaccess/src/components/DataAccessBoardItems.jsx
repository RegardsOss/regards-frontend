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
import ViewLinesIcon from 'mdi-material-ui/ViewHeadline'
import AddIcon from 'mdi-material-ui/PlusCircle'

import { servicesManagementDependencies } from '@regardsoss/admin-dataaccess-services-management'
import { searchEnginesDependencies } from '@regardsoss/admin-dataaccess-searchengines-management'

/**
 * BoardItems configuration for data access module
 * @param projectName
 * @param intl
 */
const items = (projectName, intl) => [
  {
    title: intl.formatMessage({ id: 'dataaccess.board.searchengines.title' }),
    description: intl.formatMessage({ id: 'dataaccess.board.searchengines.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/dataaccess/searchengines/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'dataaccess.board.action.list.tooltip' }),
        hateoasDependencies: searchEnginesDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/dataaccess/searchengines/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'dataaccess.board.action.add.tooltip' }),
        hateoasDependencies: searchEnginesDependencies.addDependencies,
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'dataaccess.board.services.title' }),
    description: intl.formatMessage({ id: 'dataaccess.board.services.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/dataaccess/services/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'dataaccess.board.action.list.tooltip' }),
        hateoasDependencies: servicesManagementDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/dataaccess/services/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'dataaccess.board.action.add.tooltip' }),
        hateoasDependencies: servicesManagementDependencies.addDependencies,
      },
    ],
  },
]

export default items
