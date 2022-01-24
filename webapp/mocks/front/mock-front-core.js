/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
const http = require('http')
const url = require('url')
const parseBody = require('parse-body')
const httpProxy = require('http-proxy')
const _ = require('lodash')
const { logMessage } = require('./mock-front-utils')


const proxy = httpProxy.createProxyServer({})

const proxyHandlerClosure = jsonMockURL => (request, response) => {
  request.url = request.url.replace('offset=', '_start=')
  request.url = request.url.replace('size=', '_limit=')
  return logMessage('Pass through to JSON mock server') || proxy.web(request, response, { target: jsonMockURL })
}

const buildBasicHeaders = (origin) => ({
  'Access-Control-Allow-Origin': origin,
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
  'Access-Control-Allow-Credentials': true,
})

/**
 * Provides request handler (closure) for a given delegate
 * @param timeBefore time before
 * @param entryDelegate URL entry delegate
 * @param query parsed query, as convenience to write delegates
 * @param pathParameters found parameters in URL path
 * @param bodyParameters body parameters
 * @param request -
 * @param response -
 */
const localHandlerClosure = (timeBefore, entryDelegate, query = {}, pathParameters = {}, bodyParameters = {}) => (request, response) => {
  // run delegate to get code and text
  const { content = '', code = 200, contentType, binary = false } = entryDelegate(request, query, pathParameters, bodyParameters, response)
  // publish code
  const headers = Object.assign({}, buildBasicHeaders(request.headers.origin || request.headers.Origin), contentType ? { 'Content-Type': contentType } : {})
  response.writeHead(code, headers)

  if (!binary) {
    // end answer with text (or stringified object)
    response.end(typeof content === 'object' ? JSON.stringify(content) : content)
  } else {
    // send text as binary
    response.end(content, 'binary')
  }
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
    const pathParametersDictionary = []
    const matchURLText = urlkey.replace(findParamExp, (match, paramName) => {
      pathParametersDictionary.push(paramName)
      return '/([a-zA-Z0-9\\-_.:@]+)' // regexp to match parameter value
    })
    // match corresponding regexp againts current route
    const matchURLExp = new RegExp(matchURLText)
    const found = relativePath.match(matchURLExp)
    return found ?
      acc.concat([{
        urlkey,
        delegate: delegates[urlkey],
        // Convert found result and parameters into object like { paramName: paramValue }
        pathParameters: pathParametersDictionary.reduce((acc2, pathParam, index) => Object.assign({ [pathParam]: found[index + 1] }, acc2), {}),
      }]) :
      acc
  }, [])
  // return the most specific delegate (the one with more '/' )
  const found = matchingDelegationData.reduce((previous, current) => {
    if (previous !== null) {
      const prevPathSegments = (previous.urlkey.match(/\//g) || []).length
      const currPathSegments = (current.urlkey.match(/\//g) || []).length
      return prevPathSegments > currPathSegments ? previous : current
    }
    return current
  }, null)
  if (found) {
    logMessage(`Serving with delegate ${found.urlkey}`, false)
  }
  return found
}

/**
 * Server request handling method closure provider
 */
const requestHandlerClosure = (urlStart, jsonMockURL, entryDelegates) =>
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
            const localHandler = localHandlerClosure(timeBefore, delegationData.delegate, parsedUrl.query, delegationData.pathParameters)
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
                callback(localHandlerClosure(timeBefore, delegationData.delegate, parsedUrl.query, delegationData.pathParameters, bodyParameters))
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
   * @param jsonMockURL json server mock URL
   * @param entryDelegates entry delegates
   */
  startServer(urlStart, serverPort, jsonMockURL, entryDelegates) {
    const server = http.createServer(requestHandlerClosure(urlStart, jsonMockURL, entryDelegates))
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

