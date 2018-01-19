/** Put here all the temporary controllers your development requires to be visible */
/**
 * List of mocked dependencies
 */
const MOCK_RESOURCES = [
  {
    content: {
      controllerSimpleName: 'StoragePluginsController',
      defaultRole: 'PUBLIC',
      description: 'Storage plugins list',
      id: 100000,
      microservice: 'rs-storage',
      resource: '/storages/monitoring',
      verb: 'GET',
    },
    links: [],
  },
]

module.exports = {
  MOCK_RESOURCES,
}