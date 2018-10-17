/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
const messages = {
  'data.board.action.list.tooltip': 'List',
  'data.board.action.add.tooltip': 'Add',

  'ingest.board.title': 'Ingestion (SIP)',
  'ingest.board.description': 'Ingest data already in SIP (Submission Information Package) format. A SIP contains all information needed to describe the data and also physically locate data files.',
  'ingest.board.action.chain.list.tooltip': 'Configure ingestion chains',
  'ingest.board.action.monitor.tooltip': 'Monitor ingestion',
  'ingest.board.action.sumition.tooltip': 'Submit SIP',

  'data-provider.board.title': 'Data acquisition',
  'data-provider.board.description': 'Configure data acquisition chainsallowing to acquire new detected data (detection method is configurable). These processes generate Submission Information Package (SIP) to be provided to the system for ingestion.',
  'data-provider.board.action.chain.list.tooltip': 'Configure processing chains',
  'data-provider.board.action.monitoring.tooltip': 'Monitor processing chains activity',

  'ingest.board.external.datasources.title': 'Crawling',
  'ingest.board.external.datasources.description': 'This feature allows you to configure data crawling process. A data crawling process is the addition of adding datas throught external data sources.',
  'ingest.board.action.external.datasources.list.tooltip': 'Map data sources to internal models',
  'ingest.board.action.connection.list.tooltip': 'External datasources',
  'ingest.board.action.datasource.monitor.tooltip': 'Monitor data crawling',

  'data.board.document.title': 'Documents',
  'data.board.document.description': 'Visualize/add documents. Documents are directly accessible to be visualized or downloaded from the user interfaces.',

  'data.board.storage.title': 'Storage',
  'data.board.storage.description': 'Configure one or multiples data storage locations and also the strategy to define wich location system will use.',
  'data.board.action.storages.tooltip': 'Configure locations',
  'data.board.action.allocations.tooltip': 'Configure strategies',
  'data.board.action.monitoring.tooltip': 'Monitor data storages occupation',
  'data.board.action.security.tooltip': 'Configure archived files access rights',
  'data.board.action.aip-management.tooltip': 'Monitor AIPs',
}

export default messages
