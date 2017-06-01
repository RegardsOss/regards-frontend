/*
 * LICENSE_PLACEHOLDER
 */

/**
 * All static configuration used by the application
 * @author Sébastien Binda
 */

/**
 * Server address
 * @type {string}
 */
GATEWAY_HOSTNAME = 'http://${regards.config.cloud.gateway.uri}:${regards.config.cloud.gateway.port}'

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
}

