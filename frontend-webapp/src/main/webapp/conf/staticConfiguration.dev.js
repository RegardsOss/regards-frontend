/*
 * LICENSE_PLACEHOLDER
 */

/**
 * All static configuration used by the application
 * @author Sébastien Binda
 */

/**
 * Static configurations
 */
STATIC_CONF = {
  // Available microservices from backend server.
  MSERVICES: {
    ACCESS_PROJECT: 'rs-access-project',
    ADMIN: 'rs-admin',
    AUTHENTICATION: 'rs-authentication',
    CATALOG: 'rs-catalog',
    DAM: 'rs-dam',
  },
  IMSERVICES: {
    ACCESS_INSTANCE: 'rs-access-instance',
  },
  // Default driver used to create a project connection (see module admin-database-management)
  projectConnectionDriver: 'org.postgresql.Driver',
  // Maximum number of entities retrieved by catalog service
  CATALOG_MAX_NUMBER_OF_ENTITIES: 10000
}

