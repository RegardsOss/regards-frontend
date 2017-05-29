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
GATEWAY_HOSTNAME='http://172.26.47.52:9000'

/**
 * Static configurations
 */
STATIC_CONFIGURATION= {
  // Available microservices from backend server.
  microservices: ['rs-access-project','rs-admin','rs-authentication','rs-catalog','rs-dam'],
  // Default driver used to create a project connection (see module admin-database-management)
  projectConnectionDriver: 'org.postgresql.Driver'
}

