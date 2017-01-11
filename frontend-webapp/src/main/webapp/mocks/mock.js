/**
 * LICENSE_PLACEHOLDER
 **/
const { map, split, filter, forEach, startsWith, replace, trim } = require('lodash')
const jsonServer = require('json-server')
const fs = require('fs-extra')

// gateway service is handled separately as its route does not work exactly the same
const gatewayService = 'rs-gateway'
/**
 * Controls the mocked service files and corresponding json services.
 * Add the service name it to get it deployed as mock service
 */
const mockServiceNames = ['rs-access', 'rs-admin', 'rs-archival-storage', 'rs-catalog', 'rs-dam', gatewayService]
/** Rewriter configurations  */
const mockRewriters = ['rs-access.rewriter']

/**
 * Add pagination format to response list and HAteoas format to each elements
 * @param req
 * @param res
 */
const PageAndHateoasMiddleWare = (req, res) => {
  let results = ''
  if (Array.isArray(res.locals.data)) {
    const datas = []
    map(res.locals.data, (elt, i) => {
      datas.push({
        content: elt,
        links: [],
      })
    })

    let meta = {
      number: res.locals.data.length,
      size: res.locals.data.length,
      totalElements: res.locals.data.length,
    }
    const links = []
    if (req._parsedUrl.query) {
      const params = split(req._parsedUrl.query, '&')
      let index = filter(params, param => startsWith(param, '_start'))
      if (index) {
        index = replace(index[0], '_start=', '')
      }
      let limit = filter(params, param => startsWith(param, '_limit'))
      if (limit) {
        limit = replace(limit[0], '_limit=', '')
      }

      if (index && limit) {
        meta = {
          number: index,
          size: limit,
          totalElements: res._headers['x-total-count'].value(),
        }

        if (res._headers.link) {
          const reslinks = split(res._headers.link, ',')
          forEach(reslinks, (clink, idx) => {
            const elements = split(clink, ';')
            let url = replace(elements[0], '<', '')
            url = trim(replace(url, '>', ''))

            let rel = replace(elements[1], 'rel=', '')
            rel = replace(rel, '"', '')
            rel = trim(replace(rel, '"', ''))
            const link = {
              rel,
              url,
            }
            links.push(link)
          })
        }
      }
    }

    results = {
      content: datas,
      metadata: meta,
      links,
    }
  } else {
    results = {
      content: res.locals.data,
      links: [],
    }
  }

  res.jsonp(results)
}

/**
 * Run json server
 */
const runServer = () => {
  const server = jsonServer.create()

  // declare all routes, store router references
  const serviceRoutersByName = mockServiceNames.map((serviceName) => {
    const serviceRouter = jsonServer.router(`mocks/${serviceName}.json`)
    serviceRouter.render = PageAndHateoasMiddleWare // TODO check if still working (render was initially configured after middlewares)
    return {
      serviceName,
      serviceRouter,
    }
  })

  // declare all rewriters
  mockRewriters.forEach((rewriterName) => {
    jsonServer.rewriter(`mocks/${rewriterName}.json`)
  })

  server.use(jsonServer.defaults())

  server.use(jsonServer.bodyParser)
  server.use((req, res, next) => {
    if (req.method === 'POST' &&
      req.originalUrl.startsWith('/oauth/token?grant_type=password&username=admin@cnes.fr&password=admin&scope=')) {
      req.method = 'GET'
      console.log('done')
    }
    // Continue to JSON Server router
    next()
  })

  server.use(jsonServer.rewriter({
    '/api/v1/rs-access/applications/:application_id/modules/:module_id': '/api/v1/rs-access/modules/:module_id',
    '/api/v1/rs-access/plugins/:type': '/api/v1/rs-access/plugins?type=:type',
    '/oauth/token': '/tokens/1',
  }))

  serviceRoutersByName.forEach(({ serviceName, serviceRouter }) => {
    // rs-gateway is handled as a specific case here
    if (serviceName === gatewayService) {
      // always in use
      server.use(serviceRouter)
    } else {
      server.use(`api/v1/${serviceName}/`, serviceRouter)
    }
  })

  server.listen(3000, () => {
    console.log('JSON Server is running')
  })
}

function copyAllMocks([headMockName, ...mockNames]) {
  const sourceMockFIle = `./mocks/${headMockName}.json`
  const targetMockPath = `mocks/${headMockName}.temp.json`
  fs.copy(sourceMockFIle, targetMockPath, () => {
    // iter on next files if any
    if (mockNames.length) {
      copyAllMocks(mockNames)
    }
  })
}
copyAllMocks(mockServiceNames)

