/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * Mock service entry point: uses its entry points here or delegates onto json mock server
 */

const http = require('http')
const url = require('url')
const httpProxy = require('http-proxy')

// Definitions
const serverPort = 3000
const jsonMockURL = 'http://localhost:3001'
const proxy = httpProxy.createProxyServer({})
const urlStart = '/api/v1'

/**
 * Mock server entry point: provide here the delegate for a given URL and method
 * Note1 : delegate signature is (request, query) => {content:string (optional), code:int (optional)}
 * Note2 : you can get the parameters in request using query[paramName]
 *
 */
const entryDelegates = {
  GET: {
    // Entry delegate example:
    // GET http://localhost:3000/api/v1/test-url ==> 200
    // GET http://localhost:3000/api/v1/test-url?nok=whatiwant ==> 500
    '/test-url': (request, query) =>
      (query.nok ? { content: 'Everything is NOT OK ', code: 500 } : { content: 'Everything is OK ', code: 200 }),
  },
  PUT: {

  },
  POST: {

  },
  DELETE: {

  },
}

// proxy handler
const proxyHandler = (request, response) => {
  console.info('[Facade mock server]', 'Pass through to mock server')
  proxy.web(request, response, { target: jsonMockURL })
}

/**
 * Provides, for a given entry delegate
 * @param entryDelegate URL entry delegate
 * @param query parsed query, as convenience to write delegates
 */
const localHandler = (entryDelegate, query) => (request, response) => {
  console.info('[Facade mock server]', 'Serving locally')
  // computing service time
  const timeBefore = new Date().getTime()
  // run service
  const { content = '', code = 200 } = entryDelegate(request, query)
  response.writeHead(code)
  response.end(content)
  // computing service time
  const timeAfter = new Date().getTime()
  console.info(request.method, request.url, code, timeAfter - timeBefore, 'ms')
}

/**
 * Server request handling method
 * @param request request
 * @param response response
 */
const requestHandler = (request, response) => {
  const methodDelegates = entryDelegates[request.method]
  let handler = proxyHandler
  if (methodDelegates) {
    const parsedUrl = url.parse(request.url, true)
    // is that path handled in method?
    if (parsedUrl.path) {
      const relativePathWihtoutGateway = parsedUrl.pathname.replace(urlStart, '')
      const localDelegate = methodDelegates[relativePathWihtoutGateway]
      if (localDelegate) {
        // handler for delegate and parsed query
        handler = localHandler(localDelegate, parsedUrl.query)
      }
    }
  }
  handler(request, response)
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
