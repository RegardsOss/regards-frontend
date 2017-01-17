/**
 * LICENSE_PLACEHOLDER
 **/
const { map, split, filter, forEach, startsWith, replace, trim } = require('lodash')
const jsonServer = require('json-server')
const fs = require('fs-extra')

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
  const accessMicroServiceRouter = jsonServer.router('mocks/rs-access.temp.json')
  const gatewayMicroServiceRouter = jsonServer.router('mocks/rs-gateway.temp.json')
  const adminMicroServiceRouter = jsonServer.router('mocks/rs-admin.temp.json')
  const catalogMicroServiceRouter = jsonServer.router('mocks/rs-catalog.temp.json')
  const damMicroServiceRouter = jsonServer.router('mocks/rs-dam.temp.json')
  const accessMicroServiceRewriter = jsonServer.rewriter('mocks/rs-access.rewriter.json')
  const middlewares = jsonServer.defaults()

  accessMicroServiceRouter.render = PageAndHateoasMiddleWare
  adminMicroServiceRouter.render = PageAndHateoasMiddleWare
  catalogMicroServiceRouter.render = PageAndHateoasMiddleWare
  damMicroServiceRouter.render = PageAndHateoasMiddleWare
  //gatewayMicroServiceRouter.render = PageAndHateoasMiddleWare

  server.use(middlewares)

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
    '/api/v1/rs-dam/plugins/:pluginId/config': '/api/v1/rs-dam/configurations?pluginId=:pluginId',
  }))
  server.use('/api/v1/rs-access/', accessMicroServiceRouter)
  server.use('/api/v1/rs-catalog/', catalogMicroServiceRouter)
  server.use('/api/v1/rs-dam/', damMicroServiceRouter)
  server.use('/api/v1/rs-admin/', adminMicroServiceRouter)
  //server.use('/api/v1/rs-gateway/', gatewayMicroServiceRouter)
  server.use(gatewayMicroServiceRouter)

  server.listen(3000, () => {
    console.log('JSON Server is running')
  })
}

/**
 * Copy mock json database to temp file for trash use during mock usage
 */
fs.copy('./mocks/rs-admin.json', 'mocks/rs-admin.temp.json', () => {
  fs.copy('./mocks/rs-dam.json', 'mocks/rs-dam.temp.json', () => {
    fs.copy('./mocks/rs-catalog.json', 'mocks/rs-catalog.temp.json', () => {
      fs.copy('./mocks/rs-access.json', 'mocks/rs-access.temp.json', () => {
        fs.copy('./mocks/rs-gateway.json', 'mocks/rs-gateway.temp.json', runServer)
      })
    })
  })
})

