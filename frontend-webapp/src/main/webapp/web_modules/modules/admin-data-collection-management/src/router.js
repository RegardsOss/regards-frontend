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

export const editCollectionLinksRoute = {
  path: ':collectionId/links',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const CollectionEditLinksContainer = require('./containers/CollectionEditLinksContainer')
      cb(null, {
        content: CollectionEditLinksContainer.default,
      })
    })
  },
}


export const editCollectionRoute = {
  path: ':collectionId/:mode',
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
    editCollectionLinksRoute,
    editCollectionRoute,
  ],
}

export default collectionDataManagementRouter
