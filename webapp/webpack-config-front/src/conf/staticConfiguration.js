/*
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
 */

/**
 * All static configuration used by the application
 * @author Sébastien Binda
 */

/**
 * Server address, dynamic variables are replaced by the installer
 * @type {string}
 */
// eslint-disable-next-line no-template-curly-in-string
GATEWAY_HOSTNAME = '${regards.config.cloud.gateway.url}'

/**
 * Static configurations
 */
STATIC_CONF = {
  MSERVICES: {
    ACCESS_PROJECT: 'rs-access-project',
    ADMIN: 'rs-admin',
    AUTHENTICATION: 'rs-authentication',
    CATALOG: 'rs-catalog',
    DAM: 'rs-dam',
    DATA_PROVIDER: 'rs-dataprovider',
    DELIVERY: 'rs-delivery',
    ORDER: 'rs-order',
    STORAGE: 'rs-storage',
    INGEST: 'rs-ingest',
    FEM: 'rs-fem',
    NOTIFIER: 'rs-notifier',
    PROCESSING: 'rs-processing',
    WORKER_MANAGER: 'rs-worker-manager',
    LTA_MANAGER: 'rs-lta-manager',
  },
  // Public proxixied microservice to access secured microservices from user interface.
  // Only some endpoints of associated microservices are availables. Reffer to gateway mircoservice configuration.
  MSERVICES_PUBLIC: {
    ADMIN: 'rs-admin-public',
    ADMIN_INSTANCE: 'rs-admin-instance-public',
    DAM: 'rs-dam-public',
  },
  IMSERVICES: {
    ADMIN_INSTANCE: 'rs-admin-instance',
    ACCESS_INSTANCE: 'rs-access-instance',
  },
  // Default driver used to create a project connection (see module admin-database-management)
  projectConnectionDriver: 'org.postgresql.Driver',
  // Intervales in ms between two polls for Waiting user
  POLLING_TIMER_WAITING_USER: 120000,
  // Intervales in ms between two polls for Notifications
  POLLING_TIMER_NOTIFICATIONS: 60000,
  // Intervales in ms between two polls for a user quota information update
  POLLING_TIMER_QUOTA_UPDATES: 1000,
  // Specify the duration in ms used by the order screen to display the icon to symbolize that a command will soon expire.
  ORDER_EXPIRE_ICON_DISPLAY: 3600000,
  // Static configuration for entity description dialog
  ENTITY_DESCRIPTION: {
    TAGS: {
      // Do not display tags matching at least one the given model name regexp. Exemple /GRAPH_*/.
      MODEL_NAME_FILTERS: [],
    },
  },
  // files to open in new tab instead of download it
  OPEN_NEW_TAB_MIME_TYPES: ['application/pdf', 'application/xhtml+xml', 'text/html'],
  // required browsers and versions
  BROWSER_REQUIREMENTS: {
    chrome: '64.0',
    firefox: '58.0',
    ios: '11.3',
    safari: '11.1',
    edge: '16.0',
  },
  MAP: {
    PAGE_SIZE_MAP: 400,
    /**
     * When user clicks on a point feature, the distance in meter above the point
     */
    POINT_ZOOM_LEVEL: 100000,
  },
  TABLE: {
    PAGE_SIZE: 20,
  },
}
