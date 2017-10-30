/** Put here all the temporary controllers your development requires to be visible */
/**
 * List of mocked dependencies
 */
const MOCK_RESOURCES = [
  // mock backet deps
  {
    content: {
      controllerSimpleName: 'OrderServiceControllerOrder',
      defaultRole: 'PUBLIC',
      description: 'Order service basket controller - view content',
      id: 100000,
      microservice: 'rs-order',
      resource: '/order/basket',
      verb: 'GET',
    },
    links: [],
  },
  {
    content: {
      controllerSimpleName: 'OrderServiceBasketControllerAddSelection',
      defaultRole: 'PUBLIC',
      description: 'Order service basket controller - add selection',
      id: 100001,
      microservice: 'rs-order',
      resource: '/order/basket/selection',
      verb: 'POST',
    },
    links: [],
  },
  {
    content: {
      controllerSimpleName: 'OrderServiceControllerOrder',
      defaultRole: 'PUBLIC',
      description: 'Order service basket controller - clear basket selection',
      id: 100002,
      microservice: 'rs-order',
      resource: '/order/basket',
      verb: 'DELETE',
    },
    links: [],
  },
  {
    content: {
      controllerSimpleName: 'OrderServiceControllerOrder',
      defaultRole: 'PUBLIC',
      description: 'Order service basket controller - remove dataset selections',
      id: 100003,
      microservice: 'rs-order',
      resource: '/order/basket/dataset/{datasetSelectionId}',
      verb: 'DELETE',
    },
    links: [],
  },
  {
    content: {
      controllerSimpleName: 'OrderServiceControllerOrder',
      defaultRole: 'PUBLIC',
      description: 'Order service basket controller - remove dated item selection',
      id: 100004,
      microservice: 'rs-order',
      resource: '/order/basket/dataset/{datasetSelectionId}/{itemsSelectionDate}',
      verb: 'DELETE',
    },
    links: [],
  },
  {
    content: {
      controllerSimpleName: 'OrderServiceControllerOrder',
      defaultRole: 'PUBLIC',
      description: 'Order service controller - do order',
      id: 100005,
      microservice: 'rs-order',
      resource: '/user/orders',
      verb: 'POST',
    },
    links: [],
  },
  {
    content: {
      controllerSimpleName: 'StoragePluginsController',
      defaultRole: 'PUBLIC',
      description: 'Storage plugins list',
      id: 100006,
      microservice: 'rs-storage',
      resource: '/storage-plugins',
      verb: 'GET',
    },
    links: [],
  },
]

module.exports = {
  MOCK_RESOURCES,
}