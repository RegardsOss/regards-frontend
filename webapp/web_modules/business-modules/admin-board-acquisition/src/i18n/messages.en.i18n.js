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
const messages = {
  'data.board.action.list.tooltip': 'List',
  'data.board.action.add.tooltip': 'Add',

  'ingest.board.title': 'Ingestion (SIP)',
  'ingest.board.description': 'Ingest data already in SIP (Submission Information Package) format. A SIP contains all information needed to describe the data and also physically locate data files.',
  'ingest.board.action.chain.list.tooltip': 'Configure ingestion chains',
  'ingest.board.action.monitor.tooltip': 'Monitor ingestion',
  'ingest.board.action.sumition.tooltip': 'Submit SIP',

  'data-provider.board.title': 'Data acquisition',
  'data-provider.board.description': 'Configure data acquisition chains allowing to acquire new detected data (detection method is configurable). These processes generate Submission Information Package (SIP) to be provided to the system for ingestion.',
  'data-provider.board.action.configure.tooltip': 'Configure acquisition chains',
  'data-provider.board.action.sessions.tooltip': 'Monitor aquisition sessions',

  'ingest.board.external.datasources.title': 'Crawling',
  'ingest.board.external.datasources.description': 'This feature allows you to configure data crawling process. A data crawling process is the addition of adding data through external data sources.',
  'ingest.board.action.external.datasources.list.tooltip': 'Map data sources to internal models',
  'ingest.board.action.connection.list.tooltip': 'External datasources',
  'ingest.board.action.datasource.monitor.tooltip': 'Monitor data crawling',

  'data.board.storage.title': 'Storage',
  'data.board.storage.description': 'Configure one or multiples data storage locations.',
  'data.board.action.storages.tooltip': 'Configure locations',

  'data.board.oais.title': 'Package Manager (OAIS)',
  'data.board.oais.description': 'Package Manager (OAIS) allows you to manage SIP (Submission Information Package) and AIP (Archive Information Package).',
  'data.board.oais.tooltip.see': 'Show ingest and storage',

  'data.board.index.delete': 'Reset data catalog',
  'data.board.index.delete.confirm': 'Warning : If you reset the data catalog index, then all data will be deleted and re-indexed thanks to configured data crawlers.',
  'data.board.index.delete.error.message': 'Error occured during catalog reset action.',

}

export default messages
