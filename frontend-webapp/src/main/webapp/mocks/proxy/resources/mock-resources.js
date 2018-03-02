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
      id: 700000,
      microservice: 'rs-storage',
      resource: '/storages/prioritized-datastorages',
      verb: 'GET',
    },
    links: [],
  },
  {
    content: {
      controllerSimpleName: 'StoragePluginsController',
      defaultRole: 'PUBLIC',
      description: 'Storage plugins list',
      id: 700001,
      microservice: 'rs-storage',
      resource: '/storages/prioritized-datastorages',
      verb: 'POST',
    },
    links: [],
  },
  {
    content: {
      controllerSimpleName: 'StoragePluginsController',
      defaultRole: 'PUBLIC',
      description: 'Storage plugins list',
      id: 700002,
      microservice: 'rs-storage',
      resource: '/storages/prioritized-datastorages/{id}',
      verb: 'PUT',
    },
    links: [],
  },
]

module.exports = {
  MOCK_RESOURCES,
}