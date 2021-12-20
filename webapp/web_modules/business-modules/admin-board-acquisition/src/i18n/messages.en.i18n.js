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

  'data.board.dashboard.title': 'Dashboard',
  'data.board.dashboard.description': 'Dashboard allows to centralize information about all referenced products and all running processes about products. You can here oversee all informations about products dispatched by product sources and sessions.',
  'data.board.action.dashboard.tooltip': 'Display dashboard',

  'data-provider.board.title': 'Data acquisition',
  'data-provider.board.description': 'Configure data acquisition chains allowing to acquire new detected data (detection method is configurable). These processes generate Submission Information Package (SIP) to be provided to the system for ingestion.',
  'data-provider.board.action.configure.tooltip': 'Acquisition chains',
  'data-provider.board.action.sessions.tooltip': 'Acquisition sessions',

  'data.board.oais.title': 'Products Manager (OAIS)',
  'data.board.oais.description': 'Products Manager (OAIS) allows you to manage products referenced by the Ingest service through the OAIS format. A product is the package associating a SIP (Submission Information Package) and an AIP (Archive Information Package).',
  'data.board.oais.tooltip.see': 'Show products',
  'data.board.oais.tooltip.settings': 'Settings',
  'data.board.oais.tooltip.configure': 'Configure',
  'data.board.oais.tooltip.submition': 'Submit products',

  'data.board.featuremanager.title': 'Products Manager (GeoJson)',
  'data.board.featuremanager.description': 'Products Manager (GeoJson) allows to manage products referenced by the FeatureManager service through the standard GeoJson format. A product is a GeoJson package containing metadata and optionally associated physical files.',
  'data.board.action.featuremanager.tooltip': 'Show products',

  'ingest.board.external.datasources.title': 'Crawling',
  'ingest.board.external.datasources.description': 'Allows you to build the data catalog that will be exposed to all users. This feature is mandatory to expose products handled by Products Manager OAIS and GoJson or accessible from an external database or even from an accessible web service.',
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

  'data.board.action.featuremanager.settings.tooltip': 'Settings',

  'data.board.datapreparation.title': 'Data Preparation',
  'data.board.datapreparation.description': 'Allows to view, monitor and manage list of recorded requests on WorkerManager microservice.',
  'data.board.action.datapreparation.tooltip': 'Show requests',
  'data.board.action.datapreparation.settings.tooltip': 'Settings',
}

export default messages
