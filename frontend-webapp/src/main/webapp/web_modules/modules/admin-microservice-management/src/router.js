/*
 * LICENSE_PLACEHOLDER
 */

/**
 * Route to the board listing all configurable microservices.
 *
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const microserviceBoardRoute = {
  path: 'board',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const microserviceBoardContainer = require('./containers/MicroserviceBoardContainer')
      cb(null, {
        content: microserviceBoardContainer,
      })
    })
  },
}

const microserviceManagementRouter = {
  childRoutes: [
    microserviceBoardRoute,
  ],
}

export default microserviceManagementRouter
