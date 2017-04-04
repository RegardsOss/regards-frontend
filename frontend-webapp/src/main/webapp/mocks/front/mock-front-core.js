/**
 * LICENSE_PLACEHOLDER
 **/
const http = require('http')
const url = require('url')
const parseBody = require('parse-body')
const httpProxy = require('http-proxy')
const _ = require('lodash')
const { logMessage } = require('./mock-front-utils')


const proxy = httpProxy.createProxyServer({})

const proxyHandlerClosure = jsonMockURL => (request, response) =>
  logMessage('Pass through to JSON mock server') || proxy.web(request, response, { target: jsonMockURL })

const buildBasicHeaders = uiPort => ({
  'Access-Control-Allow-Origin': `http://10.11.1.1:${uiPort}`,
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
  'Access-Control-Allow-Credentials': true,
})

/**
 * Provides request handler (closure) for a given delegate
 * @param uiPort UI port for instance
 * @param timeBefore time before
 * @param entryDelegate URL entry delegate
 * @param query parsed query, as convenience to write delegates
 * @param pathParameters found parameters in URL path
 * @param bodyParameters body parameters
 * @param request -
 * @param response -
 */
const localHandlerClosure = (uiPort, timeBefore, entryDelegate, query = {}, pathParameters = {}, bodyParameters = {}) => (request, response) => {
  logMessage('Serving locally')

  // run delegate to get code and text
  const { content = '', code = 200, contentType } = entryDelegate(request, query, pathParameters, bodyParameters, response)
  // publish code
  const headers = Object.assign({}, buildBasicHeaders(uiPort), contentType ? { 'Content-Type': contentType } : {})
  response.writeHead(code, headers)

  // end answer with text (or stringified object)
  response.end(typeof content === 'object' ? JSON.stringify(content) : content)
  // log access info
  logMessage(`${request.method} ${request.url} ${code} ${new Date().getTime() - timeBefore}ms`)
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
      logMessage(`There are two conflicting path matching the path ${relativePath}, seleting the first`, true)
    }
    return matchingDelegationData[0]
  }
  return null
}

/**
 * Server request handling method closure provider
 */
const requestHandlerClosure = (urlStart, jsonMockURL, uiPort, entryDelegates) =>
  // Actual request handler: finds matching delegate or uses proxy
  (request, response) => {
    // computing service time
    const timeBefore = new Date().getTime()
    const methodDelegates = entryDelegates[request.method]

    const prepareRequest = (callback) => {
      // handler if directly handled
      let handler = proxyHandlerClosure(jsonMockURL)
      // replace proxy with local delegate?
      if (methodDelegates) {
        const parsedUrl = url.parse(request.url, true)
        // is that path handled in method?
        if (parsedUrl.path) {
          const relativePathWihtoutGateway = parsedUrl.pathname.replace(urlStart, '')
          // matching URL with possible parameters in URL (and parse URL parameters
          const delegationData = findMatchingDelegate(methodDelegates, relativePathWihtoutGateway)
          if (delegationData) {
            const localHandler = localHandlerClosure(uiPort, timeBefore, delegationData.delegate, parsedUrl.query, delegationData.pathParameters)
            if (['POST', 'PUT'].includes(request.method)) {
              // POST / PUT: parse body and run directly callback (asynchronous parsing) - inhibit default handler
              // catching empty body exceptions
              const emptyBodyHander = (err) => {
                logMessage('empty POST request body')
                callback(localHandler)
              }
              process.on('uncaughtException', emptyBodyHander)
              parseBody(request, 1e6, (error, bodyParameters) => {
                // remove empty body  handler
                process.removeListener('uncaughtException', emptyBodyHander)
                if (error) {
                  logMessage(`Failed parsing request body: ${error}`, error, true)
                }
                callback(localHandlerClosure(uiPort, timeBefore, delegationData.delegate, parsedUrl.query, delegationData.pathParameters, bodyParameters))
              })

              // remove default handler to prevent using callback on it
              handler = null
            } else {
              // use default local handler
              handler = localHandler
            }
          }
        }
      }
      if (handler) {
        callback(handler)
      }
    }
    const doRequestCallback = handler => handler(request, response)
    prepareRequest(doRequestCallback)
  }

module.exports = {
  /**
   * Starts server
   * @param urlStart Start URL for backend access
   * @param serverPort this mock server port
   * @param uiPort UI server port
   * @param jsonMockURL json server mock URL
   * @param entryDelegates entry delegates
   */
  startServer(urlStart, serverPort, uiPort, jsonMockURL, entryDelegates) {
    const server = http.createServer(requestHandlerClosure(urlStart, jsonMockURL, uiPort, entryDelegates))
    server.listen(serverPort, (err) => {
      if (err) {
        logMessage(`start failed ${err}`)
      } else {
        logMessage(`running on http://localhost:${serverPort}`)
        logMessage(`using JSON server at ${jsonMockURL}`)
      }
    })
  },
}

