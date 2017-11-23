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
import Build from 'material-ui/svg-icons/action/build'
import PageView from 'material-ui/svg-icons/action/pageview'
import ViewLinesIcon from 'material-ui/svg-icons/action/view-headline'
import AddIcon from 'material-ui/svg-icons/content/add-circle'
import Database from 'mdi-material-ui/Database'

import { connectionDependencies } from '@regardsoss/admin-data-connection-management'
import { datasourceDependencies } from '@regardsoss/admin-data-datasource-management'
import { documentDependencies } from '@regardsoss/admin-data-document-management'
import { processingChainDependencies } from '@regardsoss/admin-ingest-processing-chain-management'
import { sipDependencies } from '@regardsoss/admin-ingest-sip-management'

/**
 * BoardItems configuration for ingest module
 * @param projectName
 * @param intl
 */
const items = (projectName, intl) => [
  {
    title: intl.formatMessage({ id: 'ingest.board.ois.title' }),
    description: intl.formatMessage({ id: 'ingest.board.ois.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/acquisition/chain/list`,
        icon: <Build />,
        tooltipMsg: intl.formatMessage({ id: 'ingest.board.action.chain.list.tooltip' }),
        hateoasDependencies: processingChainDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/acquisition/sip/session`,
        icon: <PageView />,
        tooltipMsg: intl.formatMessage({ id: 'ingest.board.action.monitor.tooltip' }),
        hateoasDependencies: sipDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/acquisition/sip/submition`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'ingest.board.action.sumition.tooltip' }),
        hateoasDependencies: sipDependencies.addDependencies,
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'ingest.board.external.datasources.title' }),
    description: intl.formatMessage({ id: 'ingest.board.external.datasources.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/acquisition/datasource/list`,
        icon: <Build />,
        tooltipMsg: intl.formatMessage({ id: 'ingest.board.action.external.datasources.list.tooltip' }),
        hateoasDependencies: datasourceDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/acquisition/connection/list`,
        icon: <Database />,
        tooltipMsg: intl.formatMessage({ id: 'ingest.board.action.connection.list.tooltip' }),
        hateoasDependencies: connectionDependencies.listDependencies,
      },
    ],
  },
  {
    title: intl.formatMessage({ id: 'data.board.document.title' }),
    description: intl.formatMessage({ id: 'data.board.document.description' }),
    advanced: false,
    actions: [
      {
        path: `/admin/${projectName}/data/acquisition/document/list`,
        icon: <ViewLinesIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.list.tooltip' }),
        hateoasDependencies: documentDependencies.listDependencies,
      },
      {
        path: `/admin/${projectName}/data/acquisition/document/create`,
        icon: <AddIcon />,
        tooltipMsg: intl.formatMessage({ id: 'data.board.action.add.tooltip' }),
        hateoasDependencies: documentDependencies.addDependencies,
      },
    ],
  },
]

export default items
