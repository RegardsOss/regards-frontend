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
const messages = {
  'data.board.action.list.tooltip': 'List',
  'data.board.action.add.tooltip': 'Add',

  'data-provider.board.title': 'Data acquisition',
  'data-provider.board.description': 'Configure data acquisition chains allowing to acquire new detected data (detection method is configurable). These processes generate Submission Information Package (SIP) to be provided to the system for ingestion.',
  'data-provider.board.action.configure.tooltip': 'Acquisition chains',
  'data-provider.board.action.sessions.tooltip': 'Acquisition sessions',

  'data.board.oais.title': 'Products Manager (OAIS)',
  'data.board.oais.description': 'Products Manager (OAIS) allows you to manage products. A product is the package associating a SIP (Submission Information Package) and an AIP (Archive Information Package).',
  'data.board.oais.tooltip.see': 'Show products',
  'data.board.oais.tooltip.settings': 'Settings',
  'data.board.oais.tooltip.configure': 'Configure',
  'data.board.oais.tooltip.submition': 'Submit products',

  'ingest.board.external.datasources.title': 'Crawling',
  'ingest.board.external.datasources.description': 'This feature allows you to configure data crawling process. A data crawling process is the addition of adding data through external data sources.',
  'ingest.board.action.external.datasources.list.tooltip': 'Map data sources to internal models',
  'ingest.board.action.connection.list.tooltip': 'Configure connection to external databases',
  'ingest.board.action.datasource.monitor.tooltip': 'Monitor data crawling',
  'ingest.board.index.delete': 'Reset data catalog',
  'ingest.board.index.delete.confirm': 'Warning : If you reset the data catalog index, then all data will be deleted and re-indexed thanks to configured data crawlers.',
  'ingest.board.index.delete.error.message': 'Error occured during catalog reset action.',

  'data.board.storage.title': 'Storage',
  'data.board.storage.description': 'Configure one or multiples data storage locations.',
  'data.board.action.storages.tooltip': 'Configure locations',
  'data.board.action.storages.settings.tooltip': 'Settings',

  'data.board.dashboard.title': 'Tableau de bord',
  'data.board.dashboard.description': 'Allows you to view, by source and by session, a summary of the status of requests and to access the feature management screen.',
  'data.board.action.dashboard.tooltip': 'Tableau de bord',

  'data.board.featuremanager.title': 'Feature Manager',
  'data.board.featuremanager.description': 'A consultation, relaunch and deletion screen, dedicated to requests.',
  'data.board.action.featuremanager.tooltip': 'Feature Manager',
  'data.board.action.featuremanager.settings.tooltip': 'Settings',
}

export default messages
