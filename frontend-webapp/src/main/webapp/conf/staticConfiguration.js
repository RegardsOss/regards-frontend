/*
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
    // STORAGE: 'rs-archival-storage',
  },
  IMSERVICES: {
    ACCESS_INSTANCE: 'rs-access-instance',
  },
  // Default driver used to create a project connection (see module admin-database-management)
  projectConnectionDriver: 'org.postgresql.Driver',
  // Maximum number of entities retrieved by catalog service
  CATALOG_MAX_NUMBER_OF_ENTITIES: 10000,
  CATALOG_SEARCH_THRESHOLD: 10000,
}

