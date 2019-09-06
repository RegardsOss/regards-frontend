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
import Build from 'material-ui/svg-icons/action/build'
import PieChart from 'material-ui/svg-icons/editor/pie-chart'
import PageView from 'material-ui/svg-icons/action/pageview'
import AddIcon from 'material-ui/svg-icons/content/add-circle'
import Security from 'material-ui/svg-icons/hardware/security'
import Details from 'material-ui/svg-icons/action/visibility'
import Database from 'mdi-material-ui/Database'
import Archive from 'mdi-material-ui/Archive'
import CallSplit from 'mdi-material-ui/CallSplit'

import { connectionDependencies } from '@regardsoss/admin-data-connection-management'
import { datasourceDependencies } from '@regardsoss/admin-data-datasource-management'
import { processingChainDependencies } from '@regardsoss/admin-ingest-processing-chain-management'
import { dataProviderDependencies } from '@regardsoss/admin-data-provider-management'
import { sipDependencies } from '@regardsoss/admin-ingest-sip-management'
import { storageManagementDependencies } from '@regardsoss/admin-storage-management'
import { oaisDependencies } from '../../../admin-oais-management'

/**
 * BoardItems configuration for ingest module
 * @param projectName
 * @param intl
 */
const items = (projectName, intl) => [
  {
    title: intl.formatMessage({ id: 'data-provider.board.title' }),
    description: intl.formatMessage({ id: 'data-provider.board.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/acquisition/dataprovider/monitoring/chains`,
        icon: <Build />,
        tooltipMsg: intl.formatMessage({ id: 'data-provider.board.action.monitoring.tooltip' }),
        hateoasDependencies: dataProviderDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/acquisition/dataprovider/sessions`,
        icon: <Details />,
        tooltipMsg: intl.formatMessage({ id: 'data-provider.board.action.sessions.tooltip' }),
        hateoasDependencies: dataProviderDependencies.listDependencies,
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.oais.title' }),
    description: intl.formatMessage({ id: 'data.board.oais.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/acquisition/chain/list`,
        icon: <Build />,
        tooltipMsg: intl.formatMessage({ id: 'ingest.board.action.chain.list.tooltip' }),
        hateoasDependencies: processingChainDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/acquisition/oais/sip/submission`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'ingest.board.action.sumition.tooltip' }),
        hateoasDependencies: sipDependencies.addDependencies,
      },
      {
        path: `/admin/${projectName}/data/acquisition/oais/sip/list`,
        icon: <Details />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.oais.tooltip.see' }),
        hateoasDependencies: oaisDependencies.listDependencies,
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'ingest.board.external.datasources.title' }),
    description: intl.formatMessage({ id: 'ingest.board.external.datasources.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/acquisition/connection/list`,
        icon: <Database />,
        tooltipMsg: intl.formatMessage({ id: 'ingest.board.action.connection.list.tooltip' }),
        hateoasDependencies: connectionDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/acquisition/datasource/list`,
        icon: <Build />,
        tooltipMsg: intl.formatMessage({ id: 'ingest.board.action.external.datasources.list.tooltip' }),
        hateoasDependencies: datasourceDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/acquisition/datasource/monitor`,
        icon: <PageView />,
        tooltipMsg: intl.formatMessage({ id: 'ingest.board.action.datasource.monitor.tooltip' }),
        hateoasDependencies: datasourceDependencies.crawlerDependencies,
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.storage.title' }),
    description: intl.formatMessage({ id: 'data.board.storage.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/acquisition/storage/storages`,
        icon: <Archive />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.storages.tooltip' }),
        hateoasDependencies: [
          ...storageManagementDependencies.listPluginDependencies,
          ...storageManagementDependencies.addPluginDependencies,
        ],
      },
      {
        path: `/admin/${projectName}/data/acquisition/storage/allocations`,
        icon: <CallSplit />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.allocations.tooltip' }),
        hateoasDependencies: [
          ...storageManagementDependencies.listPluginDependencies,
          ...storageManagementDependencies.addPluginDependencies,
        ],
      },
      {
        path: `/admin/${projectName}/data/acquisition/storage/storages/monitoring`,
        icon: <PieChart />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.monitoring.tooltip' }),
        hateoasDependencies: storageManagementDependencies.monitoringDependencies,
      },
      {
        path: `/admin/${projectName}/data/acquisition/storage/security`,
        icon: <Security />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.security.tooltip' }),
        hateoasDependencies: [
          ...storageManagementDependencies.listPluginDependencies,
          ...storageManagementDependencies.addPluginDependencies,
        ],
      },
    ],
  },
]

export default items
