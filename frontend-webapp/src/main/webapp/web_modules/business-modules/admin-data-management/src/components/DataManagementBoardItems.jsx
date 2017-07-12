/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import ViewLinesIcon from 'material-ui/svg-icons/action/view-headline'
import AddIcon from 'material-ui/svg-icons/content/add-circle'
import { modelDependencies } from '@regardsoss/admin-data-model-management'
import { attributeModelDependencies } from '@regardsoss/admin-data-attributemodel-management'
import { collectionDependencies } from '@regardsoss/admin-data-collection-management'
import { fragmentDependencies } from '@regardsoss/admin-data-fragment-management'
import { connectionDependencies } from '@regardsoss/admin-data-connection-management'
import { datasetDependencies } from '@regardsoss/admin-data-dataset-management'
import { datasourceDependencies } from '@regardsoss/admin-data-datasource-management'


/**
 * BoardItems configuration for Datamanagement module
 * @param projectName
 * @param intl
 */
const items = (projectName, intl) => [
  {
    title: intl.formatMessage({ id: 'data.board.model.title' }),
    description: intl.formatMessage({ id: 'data.board.model.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/model/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
        hateoasDependencies: modelDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/model/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: modelDependencies.addDependencies,
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.attributemodel.title' }),
    description: intl.formatMessage({ id: 'data.board.attributemodel.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/attribute/model/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
        hateoasDependencies: attributeModelDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/attribute/model/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: attributeModelDependencies.addDependencies,
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.collection.title' }),
    description: intl.formatMessage({ id: 'data.board.collection.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/collection/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
        hateoasDependencies: collectionDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/collection/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: collectionDependencies.addDependencies,
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.fragment.title' }),
    description: intl.formatMessage({ id: 'data.board.fragment.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/fragment/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
        hateoasDependencies: fragmentDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/fragment/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: fragmentDependencies.addDependencies,
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.dataset.title' }),
    description: intl.formatMessage({ id: 'data.board.dataset.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/dataset/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
        hateoasDependencies: datasetDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/dataset/create/datasource`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: datasetDependencies.addDependencies,
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.datasource.title' }),
    description: intl.formatMessage({ id: 'data.board.datasource.description' }),
    advanced: true,
    actions: [
      {
        path: `/admin/${projectName}/data/datasource/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
        hateoasDependencies: datasourceDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/datasource/create/connection`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: datasourceDependencies.addDependencies,
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.connection.title' }),
    description: intl.formatMessage({ id: 'data.board.connection.description' }),
    advanced: true,
    actions: [
      {
        path: `/admin/${projectName}/data/connection/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
        hateoasDependencies: connectionDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/connection/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: connectionDependencies.addDependencies,
      },
    ],
  },
]

export default items
