/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import PageView from 'mdi-material-ui/CardSearch'
import SettingsIcon from 'mdi-material-ui/Cog'
import { orderDependencies } from '@regardsoss/admin-order-management'
import { deliveryManagementDependencies } from '@regardsoss/admin-delivery-management'
import { processingDependencies } from '@regardsoss/admin-processing-management'

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
      tooltipMsg: intl.formatMessage({ id: 'commands.board.tooltip.list' }),
      hateoasDependencies: orderDependencies.listDependencies,
    }, {
      path: `/admin/${project}/commands/history/settings`,
      icon: <SettingsIcon />,
      tooltipMsg: intl.formatMessage({ id: 'commands.board.tooltip.settings' }),
      hateoasDependencies: orderDependencies.settingDependencies,
    }],
  },
  // processing card
  {
    title: intl.formatMessage({ id: 'commands.board.processing.title' }),
    description: intl.formatMessage({ id: 'commands.board.processing.description' }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/commands/processing/monitoring`,
      icon: <PageView />,
      tooltipMsg: intl.formatMessage({ id: 'commands.board.processing.tooltip.monitoring' }),
      hateoasDependencies: processingDependencies.listMonitoringDependencies,
    }, {
      path: `/admin/${project}/commands/processing/list`,
      icon: <ViewLinesIcon />,
      tooltipMsg: intl.formatMessage({ id: 'commands.board.processing.tooltip.list' }),
      hateoasDependencies: processingDependencies.listProcessingDependencies,
    },
    {
      path: `/admin/${project}/commands/processing/create`,
      icon: <AddIcon />,
      tooltipMsg: intl.formatMessage({ id: 'commands.board.processing.tooltip.add' }),
      hateoasDependencies: processingDependencies.addProcessingDependencies,
    }],
  },
  // delivery card
  {
    title: intl.formatMessage({ id: 'commands.board.delivery.title' }),
    description: intl.formatMessage({ id: 'commands.board.delivery.description' }),
    advanced: false,
    actions: [{
      path: `/admin/${project}/commands/delivery/settings`,
      icon: <SettingsIcon />,
      tooltipMsg: intl.formatMessage({ id: 'commands.board.delivery.settings' }),
      hateoasDependencies: deliveryManagementDependencies.settingDependencies,
    }],
  },
]

export default items
