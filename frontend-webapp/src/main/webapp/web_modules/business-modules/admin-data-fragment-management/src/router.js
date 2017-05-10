export const listFragmentRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const FragmentListContainer = require('./containers/FragmentListContainer')
      cb(null, {
        content: FragmentListContainer.default,
      })
    })
  },
}

export const createFragmentRoute = {
  path: 'create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const FragmentFormContainer = require('./containers/FragmentFormContainer')
      cb(null, {
        content: FragmentFormContainer.default,
      })
    })
  },
}

export const editFragmentRoute = {
  path: ':fragment_id/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const FragmentFormContainer = require('./containers/FragmentFormContainer')
      cb(null, {
        content: FragmentFormContainer.default,
      })
    })
  },
}


const fragmentDataManagementRouter = {
  childRoutes: [
    listFragmentRoute,
    createFragmentRoute,
    editFragmentRoute,
  ],
}

export default fragmentDataManagementRouter
