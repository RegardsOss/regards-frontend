/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Mock service entry point: uses its entry points here or delegates onto json mock server
 */
const _ = require('lodash')
const {JSON_CONTENT_TYPE} = require('./mock-front-utils')
const FacadeCore = require('./mock-front-core')
const MockUsers = require('./mock-users')
const MockCatalog = require('./mock-catalog')

const maintennceResultContent = {
  content : {
    project1: {
      active: false,
      lastUpdate: '2017-05-20T00:00:00.000Z'
    },
    cdpp: false,
  }
}

const maintennceActiveResultContent = {
  content : {
    project1: {
      active: true,
      lastUpdate: '2017-05-20T00:00:00.000Z'
    },
    cdpp: {
      active: true,
      lastUpdate: '2017-05-20T00:00:00.000Z'
    }
  }
}

/**
 * Mock server entry point: provide here the delegate for a given URL and method
 * Note1 : delegate signature is:
 * (request, query, pathParameters, bodyParameters, response) => {content:string (optional), code:int (optional), contentType: string (optional)}
 * Note2 : you can get the parameters in request using query[paramName]. works the same way for body and path parameters
 * Note3 : see 2 examples in GET and POST
 */
const entryDelegates = {
  GET: {
    // EXAMPLE : GET http://localhost:3000/api/v1/test-url ==> 200 and [...]test-url?nok=whatiwant ==> 500
    '/test-url': (request, query) =>
      (query.nok ? {content: 'Everything is NOT OK ', code: 500} : {
        content: 'Everything is OK ',
        code: 200,
        contentType: 'text/plain'
      }),
    // project license
    '/rs-admin/license/{projectName}': () => ({
      contentType: JSON_CONTENT_TYPE,
      content: {
        licenseLink: 'https://www.gnu.org/licenses/gpl.html', // or PDF: 'http://www.gchagnon.fr/cours/cours.pdf'
        accepted: false,
      },
    }),
    '/rs-gateway/info': () => ({
      contentType: JSON_CONTENT_TYPE,
      content: {},
    }),
    '/rs-gateway/maintenance': () => ({
      contentType: JSON_CONTENT_TYPE,
      content: maintennceResultContent,
    }),
    '/rs-dam/info': () => ({
      contentType: JSON_CONTENT_TYPE,
      content: {},
    }),
    '/rs-dam/maintenance': () => ({
      contentType: JSON_CONTENT_TYPE,
      content: maintennceResultContent,
    }),
    '/rs-catalog/info': () => ({
      contentType: JSON_CONTENT_TYPE,
      content: {},
    }),
    '/rs-catalog/maintenance': () => ({
      contentType: JSON_CONTENT_TYPE,
      content: maintennceResultContent,
    }),
    '/rs-admin/info': () => ({
      contentType: JSON_CONTENT_TYPE,
      content: {},
    }),
    '/rs-admin/maintenance': () => ({
      contentType: JSON_CONTENT_TYPE,
      content: maintennceResultContent,
    }),
    '/rs-access-project/info': () => ({
      contentType: JSON_CONTENT_TYPE,
      content: {},
    }),
    '/rs-access-project/maintenance': () => ({
      contentType: JSON_CONTENT_TYPE,
      content: maintennceResultContent,
    }),
    '/rs-access-instance/info': () => ({
      contentType: JSON_CONTENT_TYPE,
      content: {},
    }),
    '/rs-access-instance/maintenance': () => ({
      contentType: JSON_CONTENT_TYPE,
      content: maintennceResultContent,
    }),
    '/rs-authentication/info': () => ({
      contentType: JSON_CONTENT_TYPE,
      content: {},
    }),
    '/rs-authentication/maintenance': () => ({
      contentType: JSON_CONTENT_TYPE,
      content: maintennceActiveResultContent,
    }),
  },
  POST: {
    // EXAMPLE : using a dynamic parameter and body content, with implicit answer 200
    // exemple URL: POST http://localhost:3000/api/v1/test-url/myTest1/hop/444 (think about adding some encoded form data)
    '/test-url/{myParam1}/hop/{myParam2}': (request, query, pathParameters, bodyParameters) =>
      ({
        content: `Et hop!
          \tPath parameter: ${_.keys(pathParameters).reduce((acc, key) => `${acc}\n\t\t-${key}:${pathParameters[key]}`, '')}
          \tBody parameters: ${_.keys(bodyParameters).reduce((acc, key) => `${acc}\n\t\t-${key}:${bodyParameters[key]}`, '')}
`
      }),
  },
  PUT: {
    '/rs-admin/license/{projectName}': () => ({
      // does not store locally anything, just lets the customer end the operation
      contentType: JSON_CONTENT_TYPE,
      content: {
        licenseLink: 'https://www.gnu.org/licenses/gpl.html',
        accepted: true,
      },
    }),
  },
  DELETE: {},
}

// report mock authentication endpoints in entry points
const externalMockServices = [MockUsers, MockCatalog]
_.forEach(externalMockServices, service =>
  _.forEach(service, (methodEntries, method) =>
    _.forEach(methodEntries, (entryPoint) => {
      entryDelegates[method][entryPoint.url] = entryPoint.handler
    })))


// Definitions
const serverPort = 3000
const jsonMockPort = 3001
const jsonMockURL = `http://localhost:${jsonMockPort}`
const urlStart = '/api/v1'

FacadeCore.startServer(urlStart, serverPort, jsonMockURL, entryDelegates)

