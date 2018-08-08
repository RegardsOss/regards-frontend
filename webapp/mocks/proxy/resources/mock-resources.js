/** Put here all the temporary controllers your development requires to be visible */
/**
 * List of mocked dependencies
 */
const MOCK_RESOURCES = [
  {
    content: {
      controllerSimpleName: 'SearchEngineConfigurationController',
      defaultRole: 'PROJECT_ADMIN',
      description: 'Configure search engines',
      id: 699998,
      microservice: 'rs-catalog',
      resource: '/enginesconfig',
      verb: 'GET',
    },
    links: [],
  },
  {
    content: {
      controllerSimpleName: 'SearchEngineConfigurationController',
      defaultRole: 'PROJECT_ADMIN',
      description: 'Configure search engines',
      id: 699999,
      microservice: 'rs-catalog',
      resource: '/enginesconfig',
      verb: 'POST',
    },
    links: [],
  },
]

module.exports = {
  MOCK_RESOURCES,
}
