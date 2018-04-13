/*
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
    ORDER: 'rs-order',
    STORAGE: 'rs-storage',
    INGEST: 'rs-ingest',
  },
  IMSERVICES: {
    ADMIN_INSTANCE: 'rs-admin-instance',
    ACCESS_INSTANCE: 'rs-access-instance',
  },
  // Default driver used to create a project connection (see module admin-database-management)
  projectConnectionDriver: 'org.postgresql.Driver',
  CATALOG_SEARCH_THRESHOLD: 10000,
  // Intervales in ms between two polls for Waiting user
  POLLING_TIMER_WAITING_USER: 5000,
  // Intervales in ms between two polls for Notifications
  POLLING_TIMER_NOTIFICATIONS: 5000,
  // Static configuration for entity description dialog
  ENTITY_DESCRIPTION: {
    TAGS: {
      // Do not display tags matching at least one the given model name regexp. Exemple /GRAPH_*/.
      MODEL_NAME_FILTERS: [],
    },
  },
}

