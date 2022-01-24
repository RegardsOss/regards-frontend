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
import { modelDependencies } from '@regardsoss/admin-data-model-management'
import { attributeModelDependencies } from '@regardsoss/admin-data-attributemodel-management'
import { fragmentDependencies } from '@regardsoss/admin-data-fragment-management'
import { attributePluginDependencies } from '@regardsoss/admin-data-attribute-plugins-management'

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
        path: `/admin/${projectName}/data/models/model/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
        hateoasDependencies: modelDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/models/model/create`,
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
        path: `/admin/${projectName}/data/models/attribute/model/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
        hateoasDependencies: attributeModelDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/models/attribute/model/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: attributeModelDependencies.addDependencies,
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.fragment.title' }),
    description: intl.formatMessage({ id: 'data.board.fragment.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/models/fragment/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
        hateoasDependencies: fragmentDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/models/fragment/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: fragmentDependencies.addDependencies,
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.calculation.plugins.title' }),
    description: intl.formatMessage({ id: 'data.board.calculation.plugins.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/models/calculationplugins/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
        hateoasDependencies: attributePluginDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/models/calculationplugins/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: attributePluginDependencies.addDependencies,
      },
    ],
  },
]

export default items
