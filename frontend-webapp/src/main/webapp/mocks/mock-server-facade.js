/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Mock service entry point: uses its entry points here or delegates onto json mock server
 */

const http = require('http')
const url = require('url')
const httpProxy = require('http-proxy')
const parseBody = require('parse-body')
const _ = require('lodash')
const fs = require('fs')

// Definitions
const serverPort = 3000
const uiPort = 3333
const jsonMockURL = 'http://localhost:3001'
const proxy = httpProxy.createProxyServer({})
const urlStart = '/api/v1'
const responseHeaders = {
  'Access-Control-Allow-Origin': `http://localhost:${uiPort}`,
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
  'Access-Control-Allow-Credentials': true,
}

const validToken = '123456'


// TODO Raph : refactor to extract some as external components and keep the methods map first in this file
const processAccountPOSTRequest = (logSubheader, { accountEmail }, { originUrl, requestLink }) => {
  const failureMail = 'test@fail.com'
  console.info('[Facade mock server]', logSubheader, `use ${failureMail} to test failure case`)
  if (accountEmail === failureMail) {
    console.info('[Facade mock server]', logSubheader, 'Sending unknown mail')
    return { code: 404 }
  }
  console.info('[Facade mock server]', logSubheader, 'Simulate mail callback by clicking the link \n',
    `${requestLink}&token=${validToken}&account_email=${accountEmail}&origin_url=${encodeURI(originUrl)}`)
  return { code: 204 }
}


/**
 * Mock server entry point: provide here the delegate for a given URL and method
 * Note1 : delegate signature is:
 * (request, query, pathParameters, bodyParameters) => {content:string (optional), code:int (optional), contentType: string (optional)}
 * Note2 : you can get the parameters in request using query[paramName]. works the same way for body and path parameters
 * Note3 : see 2 examples in GET and POST
 */
const entryDelegates = {
  GET: {
    // EXAMPLE : GET http://localhost:3000/api/v1/test-url ==> 200 and [...]test-url?nok=whatiwant ==> 500
    '/test-url': (request, query) =>
      (query.nok ? { content: 'Everything is NOT OK ', code: 500 } : { content: 'Everything is OK ', code: 200, contentType: 'text/plain' }),
    // project license
    '/rs-admin/projects/{projectName}/license': () =>
      ({
        code: 200,
        contentType: 'text/markdown',
        content: {
          content: fs.readFileSync('./mocks/mock-license.md').toString(),
        },
      }),
  },
  DELETE: {
  },
  POST: {
    // EXAMPLE : using a dynamic parameter and body content, with implicit answer 200
    // exemple URL: POST http://localhost:3000/api/v1/test-url/myTest1/hop/444 (think about adding some encoded form data)
    '/test-url/{myParam1}/hop/{myParam2}': (request, query, pathParameters, bodyParameters) =>
      ({ content:
          `Et hop!
          \tPath parameter: ${_.keys(pathParameters).reduce((acc, key) => `${acc}\n\t\t-${key}:${pathParameters[key]}`, '')}
          \tBody parameters: ${_.keys(bodyParameters).reduce((acc, key) => `${acc}\n\t\t-${key}:${bodyParameters[key]}`, '')}
` }),

    // ask unlock account
    'accounts/{accountEmail}/unlockAccount': (request, query, pathParameters, bodyParameters) => {
      const notLockMail = 'admin@cnes.fr'
      console.info('[Facade mock server]', 'accounts/{accountEmail}/unlockAccount', `use ${notLockMail} to not locked case case`)
      if (pathParameters.accountEmail === notLockMail) {
        return { code: 403 }
      }
      return processAccountPOSTRequest('accounts/{accountEmail}/resetPassword', pathParameters, bodyParameters)
    },
    // ask reset password
    'accounts/{accountEmail}/resetPassword': (request, query, pathParameters, bodyParameters) =>
      processAccountPOSTRequest('accounts/{accountEmail}/resetPassword', pathParameters, bodyParameters),
  },
  PUT: {
    // complete unlock account
    '/accounts/{accountEmail}/unlockAccount': (request, query, { accountEmail }, { token }) => {
      console.info('[Facade mock server]', '[/accounts/{accountEmail}/unlockAccount]', '\n\tEmail', accountEmail, '\n\tToken', token)
      console.info('[Facade mock server]', '[/accounts/{accountEmail}/unlockAccount]', `Only valid token consider is ${validToken}`)
      return { code: token === validToken ? 204 : 403 }
    },
    // complete reset password
    '/accounts/{accountEmail}/resetPassword': (request, query, { accountEmail }, { token, newPassword }) => {
      console.info('[Facade mock server]', '[/accounts/{accountEmail}/resetPassword]', '\n\tEmail', accountEmail, '\n\tToken', token, '\n\tnewPassword', newPassword)
      console.info('[Facade mock server]', '[/accounts/{accountEmail}/resetPassword]', `Only valid token consider is ${validToken}`)
      return { code: token === validToken ? 204 : 403 }
    },
  },
}


// proxy handler
const proxyHandler = (request, response) => {
  console.info('[Facade mock server]', 'Pass through to mock server')
  proxy.web(request, response, { target: jsonMockURL })
}

/**
 * Provides, for a given entry delegate
 * @param timeBefore time befre
 * @param entryDelegate URL entry delegate
 * @param query parsed query, as convenience to write delegates
 * @param pathParameters found parameters in URL path
 * @param bodyParameters body parameters
 */
const localHandler = (timeBefore, entryDelegate, query, pathParameters, bodyParameters) => (request, response) => {
  console.info('[Facade mock server]', 'Serving locally')

// run delegate to get code and text
  const { content = '', code = 200, contentType } = entryDelegate(request, query, pathParameters, bodyParameters)
  // publish code
  const headers = Object.assign({ }, responseHeaders, contentType ? { 'Content-Type': contentType } : {})
  response.writeHead(code, headers)
  // end answer with text (or stringified object)
  response.end(typeof content === 'object' ? JSON.stringify(content) : content)
// log access info
  console.info('[Facade mock server]', request.method, request.url, code, new Date().getTime() - timeBefore, 'ms')
}

/**
 * Finds the matching delegate for relative path at parameter.
 * @param delegates
 * @param relativePath
 * @returns found delegation data with fields:
 * - delegate : delegate found
 * - pathParameters with each path parameter as field
 */
const findMatchingDelegate = (delegates, relativePath) => {
  // filter delegates: keep only matching URLs
  const matchingDelegationData = _.keys(delegates).reduce((acc, urlkey) => {
    // build Regexp to match URL with parameters
    const findParamExp = /\/{([a-zA-Z0-9_\-.]+)}/g
    // store each found parameters, replace them with a group expression allowing to
    // get there value from index
    const pathParametersDictionnary = []
    const matchURLText = urlkey.replace(findParamExp, (match, paramName) => {
      pathParametersDictionnary.push(paramName)
      return '/([a-zA-Z0-9\\-_.@]+)'
    })

    // match corresponding regexp againts current route
    const matchURLExp = new RegExp(matchURLText)
    const found = relativePath.match(matchURLExp)
    return found ?
      acc.concat([{
        delegate: delegates[urlkey],
          // Convert found result and parameters into object like { paramName: paramValue }
        pathParameters: pathParametersDictionnary.reduce((acc2, pathParam, index) => Object.assign({ [pathParam]: found[index + 1] }, acc2), {}),
      }]) :
      acc
  }, [])
  if (matchingDelegationData) {
    if (matchingDelegationData.length > 1) {
      console.warn('There are two conflicting path matching the path', relativePath, ', selecting the first...')
    }
    return matchingDelegationData[0]
  }
  return null
}

/**
 * Server request handling method
 * @param request request
 * @param response response
 */
const requestHandler = (request, response) => {
  // computing service time
  const timeBefore = new Date().getTime()

  const methodDelegates = entryDelegates[request.method]
  let handleRequest = false
  if (methodDelegates) {
    const parsedUrl = url.parse(request.url, true)
    // is that path handled in method?
    if (parsedUrl.path) {
      const relativePathWihtoutGateway = parsedUrl.pathname.replace(urlStart, '')
      // matching URL with possible parameters in URL (and parse URL parameters
      const delegationData = findMatchingDelegate(methodDelegates, relativePathWihtoutGateway)
      if (delegationData) {
        handleRequest = true
        // handler for delegate and parsed query
        // compute post parameters if required, then run request
        // parse body parameters if post or put
        if (['POST', 'PUT'].includes(request.method)) {
          // POST / PUT: parse body and run
          parseBody(request, 1e6, (err, bodyParameters = {}) => {
            if (err) {
              console.error('[Facade mock server]', 'Failed parsing body parameters with error:', err)
            }
            // run request, with our without body parameters
            localHandler(timeBefore, delegationData.delegate, parsedUrl.query, delegationData.pathParameters, bodyParameters)(request, response)
          })
        } else {
          // GET / delete / others... directly handle
          localHandler(timeBefore, delegationData.delegate, parsedUrl.query, delegationData.pathParameters)(request, response)
        }
      }
    }
  }
  if (!handleRequest) {
    // pass through to JSON server
    proxyHandler(request, response)
  }
}

const server = http.createServer(requestHandler)

server.listen(serverPort, (err) => {
  if (err) {
    console.error('[Facade mock server]', 'start failed', err)
  } else {
    console.info('[Facade mock server]', `running on http://localhost:${serverPort}`)
    console.info('[Facade mock server]', `using JSON server at ${jsonMockURL}`)
  }
})
