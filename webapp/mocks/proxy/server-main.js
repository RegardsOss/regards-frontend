const http = require('http')
const url = require('url')
const parseBody = require('parse-body')
const httpProxy = require('http-proxy')
const _ = require('lodash')
const { logMessage, JSON_CONTENT_TYPE } = require('./utils')

// Definitions
const serverPort = 3000
const urlStart = '/api/v1'

/**
 * Finds the matching local service for relative path at parameter.
 * @param methodServices local service for a given HTTP method
 * @param relativePath relative URL path
 * @returns null if no local service found, otherwise an object with fields:
 * - name: local service name
 * - url: local service url
 * - handler : local service handler found
 * - pathParameters with each path parameter as field
 */
function findMatchingLocalServices(methodServices, relativePath) {
  // filter delegates: keep only matching URLs
  const matchingDelegationData = _.reduce(methodServices, (acc, { url, handler }, name) => {
    // build Regexp to match URL with parameters
    const findParamExp = /\/{([a-zA-Z0-9_\-.]+)}/g
    // store each found parameters, replace them with a group expression allowing to
    // get there value from index
    const pathParametersDictionary = []
    const matchURLText = url.replace(findParamExp, (match, paramName) => {
      pathParametersDictionary.push(paramName)
      return '/([a-zA-Z0-9\\-_.:@]+)' // regexp to match parameter value
    })
    // match corresponding regexp againts current route
    const matchURLExp = new RegExp(`${matchURLText}$`)
    const found = relativePath.match(matchURLExp)
    return found ?
      acc.concat([{
        name,
        url,
        handler,
        // Convert found result and parameters into object like { paramName: paramValue }
        pathParameters: pathParametersDictionary.reduce((acc2, pathParam, index) => Object.assign({ [pathParam]: found[index + 1] }, acc2), {}),
      }]) :
      acc
  }, [])
  // return the most specific delegate (the one with more '/' )
  const found = matchingDelegationData.reduce((previous, current) => {
    if (previous !== null) {
      const prevPathSegments = (previous.url.match(/\//g) || []).length
      const currPathSegments = (current.url.match(/\//g) || []).length
      return prevPathSegments > currPathSegments ? previous : current
    }
    return current
  }, null)
  return found
}

/** Provides basic headers for local services */
function buildBasicHeaders(origin = 'local') {
  return {
    'access-control-allow-origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Access-Control-Allow-Credentials': true,
  }
}

/**
 * Starts sever
 * @param {*} gatewayURL real backend gateway URL
 */
function start(gatewayURL) {
  const { buildLocalServices } = require('./local-services')
  const localServices = buildLocalServices(gatewayURL)
  logMessage(`Stating proxy server on proxy gateway URL ${gatewayURL}`, false, 'Proxy server')

  //  A - Create proxy request handler
  const proxy = httpProxy.createProxyServer({ target: gatewayURL })
  const proxyHandler = (request, response) => {
    logMessage(`Passthrough to server [${request.method}] ${request.url}`, false, 'Proxy server')
    proxy.web(request, response)
  }

  // B - Create local services handler
  const localServiceHandlerClosure = (timeBefore, serviceHandler, pathParameters = {}, queryParameters = {}, bodyParameters = {}) =>
    function localServiceHandler(request, response) {
      // A - ON DONE callback
      function onResult({ content = '', code = 200, contentType = JSON_CONTENT_TYPE, binary = false, headers: responseHeaders }) {
        // 1 - publish code and headers
        const headers = Object.assign({},
          buildBasicHeaders(request.headers.origin || request.headers.Origin),
          { 'Content-Type': contentType }, responseHeaders)
        response.writeHead(code, headers)
        // 2 - send content with encoding (when not binayr)
        if (!binary) {
          // end answer with text (or stringified object)
          response.end(typeof content === 'object' ? JSON.stringify(content) : content)
        } else {
          // send content as binary
          response.end(content, 'binary')
        }
        logMessage(`Served ${request.method} ${request.url} ${code} in ${new Date().getTime() - timeBefore}ms`, false, 'Proxy server')
      }

      // B - handler product treatment
      const handlerProduct = serviceHandler(request, response, pathParameters, queryParameters, bodyParameters)
      if (handlerProduct instanceof Promise) {
        logMessage(`Serving ${request.method} ${request.url} through delayed promise`)
        handlerProduct.then((result) => onResult(result)).catch(() => onResult({ code: 500 })) // resolve then return, handle error
      } else {
        logMessage(`Serving ${request.method} ${request.url} through immediate results`)
        onResult(handlerProduct) // immediately resoved
      }

    }


  // C - Create generic request handler: routes to local service when defined or to proxy service otherwise
  function handleRequest(request, response) {
    // computing service time
    const timeBefore = new Date().getTime()
    // resolve handler as a promise (required as POST / PUT method needs the body parameters)
    const getRequestHandlerPromise = () => new Promise((resolve, reject) => {
      // find handler
      let handler = proxyHandler
      const methodServices = localServices[request.method]
      if (methodServices) {
        const parsedUrl = url.parse(request.url, true)
        // is that path handled in method?
        if (parsedUrl.path) {
          const relativePathWihtoutGateway = parsedUrl.pathname.replace(urlStart, '')
          // matching URL with possible parameters in URL (and parse URL parameters)
          const localServiceData = findMatchingLocalServices(methodServices, relativePathWihtoutGateway)
          if (localServiceData) {
            logMessage(`Local service "${localServiceData.name}" [${request.method}] ${request.url}`, false, 'Proxy server')
            const localHandler = localServiceHandlerClosure(timeBefore, localServiceData.handler, localServiceData.pathParameters, parsedUrl.query)
            if (['POST', 'PUT'].includes(request.method)) {
              // POST / PUT: parse body and run directly callback (asynchronous parsing) - inhibit default handler
              // catching empty body exceptions
              const emptyBodyHandler = (err) => {
                logMessage('Empty POST request body', true, 'Server proy')
                resolve(localHandler) // resolved without the body parameters
              }
              process.on('uncaughtException', emptyBodyHandler)
              parseBody(request, 1e6, (error, bodyParameters) => {
                // remove empty body handler
                process.removeListener('uncaughtException', emptyBodyHandler)
                if (error) {
                  logMessage(`Failed parsing request body: ${error}`, error, true)
                }
                // resolve with body parameters
                resolve(localServiceHandlerClosure(timeBefore, localServiceData.handler, localServiceData.pathParameters, parsedUrl.query, bodyParameters))
              })
              handler = null   // remove default handler (the promise should resolve after parsing body)
            } else {
              handler = localHandler   // use local handler as request handler
            }
          }
        }
      }
      if (handler) {
        resolve(handler) // else: will be resolved after parsing body
      }
    })
    // resolve handler then serve request using it
    getRequestHandlerPromise().then(handler => handler(request, response)).catch(e => logMessage(`Failed handling request ${e}`, true, 'Proxy server'))
  }

  // server handler
  const server = http.createServer(handleRequest)
  server.listen(serverPort, (err) => {
    if (err) {
      logMessage(`start failed ${err}`)
    } else {
      logMessage(`Running on http://localhost:${serverPort}`, false, 'Proxy Server')
    }
  })

}

module.exports = {
  // starts server, requires URL as parameter
  start,
}
