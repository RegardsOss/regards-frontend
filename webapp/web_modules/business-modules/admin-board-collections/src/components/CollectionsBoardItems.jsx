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
import ViewLinesIcon from 'mdi-material-ui/ViewHeadline'
import AddIcon from 'mdi-material-ui/PlusCircle'
import { datasetDependencies } from '@regardsoss/admin-data-dataset-management'
import { collectionDependencies } from '@regardsoss/admin-data-collection-management'

/**
 * BoardItems configuration for Datamanagement module
 * @param projectName
 * @param intl
 */
const items = (projectName, intl) => [
  {
    title: intl.formatMessage({ id: 'data.board.collection.title' }),
    description: intl.formatMessage({ id: 'data.board.collection.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/collections/collection/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
        hateoasDependencies: collectionDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/collections/collection/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: collectionDependencies.addDependencies,
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.dataset.title' }),
    description: intl.formatMessage({ id: 'data.board.dataset.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/collections/dataset/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
        hateoasDependencies: datasetDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/collections/dataset/create/datasource`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: datasetDependencies.addDependencies,
      },
    ],
  },
]

export default items
