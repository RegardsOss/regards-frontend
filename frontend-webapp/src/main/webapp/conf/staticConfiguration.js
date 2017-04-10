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
GATEWAY_HOSTNAME='http://${regards.config.cloud.gateway.uri}:${regards.config.cloud.gateway.port}'

/**
 * Static configurations
 */
STATIC_CONFIGURATION= {
  // Available microservices from backend server.
  microservices: ['rs-admin','rs-catalog','rs-dam','rs-gateway','rs-access-project'],
  // Default driver used to create a project connection (see module admin-database-management)
  projectConnectionDriver: 'org.postgresql.Driver'
}

