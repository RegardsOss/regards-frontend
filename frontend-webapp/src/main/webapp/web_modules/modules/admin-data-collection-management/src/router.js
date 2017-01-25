/**
 * LICENSE_PLACEHOLDER
 **/
export const listCollectionRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const CollectionListContainer = require('./containers/CollectionListContainer')
      cb(null, {
        content: CollectionListContainer.default,
      })
    })
  },
}

export const createCollectionRoute = {
  path: 'create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const CollectionFormContainer = require('./containers/CollectionFormContainer')
      cb(null, {
        content: CollectionFormContainer.default,
      })
    })
  },
}

export const editCollectionRoute = {
  path: ':collectionId/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const CollectionFormContainer = require('./containers/CollectionFormContainer')
      cb(null, {
        content: CollectionFormContainer.default,
      })
    })
  },
}


const collectionDataManagementRouter = {
  childRoutes: [
    listCollectionRoute,
    createCollectionRoute,
    editCollectionRoute,
  ],
}

export default collectionDataManagementRouter
