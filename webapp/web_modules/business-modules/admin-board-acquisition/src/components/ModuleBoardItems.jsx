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
import Build from 'mdi-material-ui/Wrench'
import PageView from 'mdi-material-ui/CardSearch'
import AddIcon from 'mdi-material-ui/PlusCircle'
import DeleteIcon from 'mdi-material-ui/Delete'
import Database from 'mdi-material-ui/Database'
import Archive from 'mdi-material-ui/Archive'
import SettingsIcon from 'mdi-material-ui/Cog'

import { RequestVerbEnum } from '@regardsoss/store-utils'
import { connectionDependencies } from '@regardsoss/admin-data-connection-management'
import { datasourceDependencies } from '@regardsoss/admin-data-datasource-management'
import { processingChainDependencies } from '@regardsoss/admin-ingest-processing-chain-management'
import { dataProviderDependencies } from '@regardsoss/admin-data-provider-management'
import { storageManagementDependencies } from '@regardsoss/admin-storage-management'
import { featureManagementDependencies } from '@regardsoss/admin-feature-management'
import { dashboardManagementDependencies } from '@regardsoss/admin-dashboard-management'
import { dataPreparationManagementDependencies } from '@regardsoss/admin-datapreparation-management'
import { ltaManagementDependencies } from '@regardsoss/admin-lta-management'
import { oaisDependencies } from '@regardsoss/admin-oais-management'
import { indexActions, RESET_INDEX_ACTION } from '../clients/IndexClient'

/**
 * BoardItems configuration for ingest module
 * @param projectName
 * @param intl
 */
const items = (projectName, intl, onResetIndex) => [
  {
    title: intl.formatMessage({ id: 'data.board.dashboard.title' }),
    description: intl.formatMessage({ id: 'data.board.dashboard.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/acquisition/dashboard/monitor`,
        icon: <PageView />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.dashboard.tooltip' }),
        hateoasDependencies: [
          ...dashboardManagementDependencies.listDependencies,
        ],
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data-provider.board.title' }),
    description: intl.formatMessage({ id: 'data-provider.board.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/acquisition/dataprovider/chains`,
        icon: <Build />,
        tooltipMsg: intl.formatMessage({ id: 'data-provider.board.action.configure.tooltip' }),
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
        tooltipMsg: intl.formatMessage({ id: 'data.board.oais.tooltip.configure' }),
        hateoasDependencies: processingChainDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/acquisition/oais/sip/submission`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.oais.tooltip.submition' }),
        hateoasDependencies: oaisDependencies.addDependencies,
      },
      {
        path: `/admin/${projectName}/data/acquisition/oais/featureManager`,
        icon: <PageView />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.oais.tooltip.see' }),
        hateoasDependencies: oaisDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/acquisition/oais/settings`,
        icon: <SettingsIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.oais.tooltip.settings' }),
        hateoasDependencies: oaisDependencies.settingDependencies,
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.featuremanager.title' }),
    description: intl.formatMessage({ id: 'data.board.featuremanager.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/acquisition/featuremanager/monitor`,
        icon: <PageView />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.featuremanager.tooltip' }),
        hateoasDependencies: [
          ...featureManagementDependencies.listDependencies,
        ],
      },
      {
        path: `/admin/${projectName}/data/acquisition/featuremanager/settings`,
        icon: <SettingsIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.featuremanager.settings.tooltip' }),
        hateoasDependencies: featureManagementDependencies.settingDependencies,
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
      {
        icon: <DeleteIcon />,
        tooltipMsg: intl.formatMessage({ id: 'ingest.board.index.delete' }),
        confirmMessage: intl.formatMessage({ id: 'ingest.board.index.delete.confirm' }),
        errorMessage: intl.formatMessage({ id: 'ingest.board.index.delete.error.message' }),
        touchTapAction: onResetIndex,
        hateoasDependencies: [
          indexActions.getSubAction(RESET_INDEX_ACTION).getDependency(RequestVerbEnum.DELETE),
        ],
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
          ...storageManagementDependencies.listDependencies,
        ],
      },
      {
        path: `/admin/${projectName}/data/acquisition/storage/settings`,
        icon: <SettingsIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.storages.settings.tooltip' }),
        hateoasDependencies: [
          ...storageManagementDependencies.settingsDependencies,
        ],
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.datapreparation.title' }),
    description: intl.formatMessage({ id: 'data.board.datapreparation.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/acquisition/datapreparation/requests`,
        icon: <PageView />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.datapreparation.tooltip' }),
        hateoasDependencies: [
          ...dataPreparationManagementDependencies.listDependencies,
        ],
      },
      {
        path: `/admin/${projectName}/data/acquisition/datapreparation/settings`,
        icon: <SettingsIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.datapreparation.settings.tooltip' }),
        hateoasDependencies: [
          ...dataPreparationManagementDependencies.settingsDependencies,
        ],
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.ltamanagement.title' }),
    description: intl.formatMessage({ id: 'data.board.ltamanagement.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/acquisition/ltamanagement/requests`,
        icon: <PageView />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.ltamanagement.tooltip' }),
        hateoasDependencies: [],
      },
      {
        path: `/admin/${projectName}/data/acquisition/ltamanagement/settings`,
        icon: <SettingsIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.ltamanagement.settings.tooltip' }),
        hateoasDependencies: [
          ...ltaManagementDependencies.settingsDependencies,
        ],
      },
    ],
  },
]

export default items
