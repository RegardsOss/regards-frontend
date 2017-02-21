const url = require('url')

/**
 * LICENSE_PLACEHOLDER
 **/
const { map, split, filter, forEach, startsWith, replace, trim } = require('lodash')
const jsonServer = require('json-server')
const fs = require('fs-extra')

// definitions
const serverPort = 3001

/**
 * Add pagination format to response list and HAteoas format to each elements
 * @param req
 * @param res
 */
const PageMiddleWare = (req, res) => {
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
    // eslint-disable-next-line no-underscore-dangle
    const parsedUrl = req._parsedUrl
    if (parsedUrl.query) {
      const params = split(parsedUrl.query, '&')
      let index = filter(params, param => startsWith(param, '_start'))
      if (index) {
        index = replace(index[0], '_start=', '')
      }
      let limit = filter(params, param => startsWith(param, '_limit'))
      if (limit) {
        limit = replace(limit[0], '_limit=', '')
      }

      // eslint-disable-next-line no-underscore-dangle
      const headers = res._headers
      if (index && limit) {
        meta = {
          number: Number(index),
          size: Number(limit),
          totalElements: Number(headers['x-total-count'].value()),
        }

        if (headers.link) {
          const reslinks = split(headers.link, ',')
          forEach(reslinks, (clink, idx) => {
            const elements = split(clink, ';')
            let localURL = replace(elements[0], '<', '')
            localURL = trim(replace(localURL, '>', ''))

            let rel = replace(elements[1], 'rel=', '')
            rel = replace(rel, '"', '')
            rel = trim(replace(rel, '"', ''))
            const link = {
              rel,
              localURL,
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
 * Add response list with HAteoas to each element
 * @param req
 * @param res
 */
const ListMiddleWare = (req, res) => {
  if (Array.isArray(res.locals.data)) {
    const results = []
    map(res.locals.data, (elt, i) => {
      results.push({
        content: elt,
        links: [],
      })
    })
    res.jsonp(results)
  } else {
    res.jsonp({
      content: res.locals.data,
      links: [],
    })
  }
}

const RenderMiddleWare = (req, res) => {
  const parsedUrl = url.parse(req.url, true)
  // eslint-disable-next-line no-underscore-dangle
  return typeof parsedUrl.query._start !== 'undefined' && typeof parsedUrl.query._limit !== 'undefined'
    ? PageMiddleWare(req, res)
    : ListMiddleWare(req, res)
}

/**
 * Add response array
 * @param req
 * @param res
 */
const ArrayMiddleWare = (req, res) => {
  res.jsonp(Array.isArray(res.locals.data) ? res.locals.data : [])
}

/**
 * Run json server
 */
const runServer = () => {
  const server = jsonServer.create()
  const middlewares = jsonServer.defaults()

  // const accessMicroServiceRewriter = jsonServer.rewriter('mocks/rs-access.rewriter.json')
  // const accessMicroServiceRewriter = jsonServer.rewriter('mocks/rs-access.rewriter.json')
  const accessMicroServiceRouter = jsonServer.router('mocks/json/runtime/rs-access.temp.json')
  const accessMicroServiceSignalRouter = jsonServer.router('mocks/json/runtime/rs-access-signal.temp.json')
  const adminMicroServiceRouter = jsonServer.router('mocks/json/runtime/rs-admin.temp.json')
  const adminMicroServiceSignalRouter = jsonServer.router('mocks/json/runtime/rs-admin-signal.temp.json')
  const archivalStoragePluginsMonitoringRouter = jsonServer.router('mocks/json/runtime/rs-archival-storage.temp.json')
  const catalogMicroServiceRouter = jsonServer.router('mocks/json/runtime/rs-catalog.temp.json')
  const cloudMicroServiceSignalRouter = jsonServer.router('mocks/json/runtime/rs-cloud-signal.temp.json')
  const damMicroServiceRouter = jsonServer.router('mocks/json/runtime/rs-dam.temp.json')
  const damMicroServiceRouterList = jsonServer.router('mocks/json/runtime/rs-dam-list.temp.json')
  const damMicroServiceRouterArray = jsonServer.router('mocks/json/runtime/rs-dam-array.temp.json')
  const damMicroServiceSignalRouter = jsonServer.router('mocks/json/runtime/rs-dam-signal.temp.json')
  const gatewayMicroServiceRouter = jsonServer.router('mocks/json/runtime/rs-gateway.temp.json')
  const gatewayMicroServiceSignalRouter = jsonServer.router('mocks/json/runtime/rs-gateway-signal.temp.json')

  accessMicroServiceRouter.render = PageMiddleWare
  adminMicroServiceRouter.render = RenderMiddleWare
  catalogMicroServiceRouter.render = RenderMiddleWare
  archivalStoragePluginsMonitoringRouter.render = RenderMiddleWare // ListMiddleWare
  damMicroServiceRouter.render = PageMiddleWare
  damMicroServiceRouterList.render = RenderMiddleWare
  damMicroServiceRouterArray.render = ArrayMiddleWare
  // gatewayMicroServiceRouter.render = PageMiddleWare

  server.use(middlewares)
  server.use(jsonServer.bodyParser)
  server.use((req, res, next) => {
    if (req.method === 'POST' && req.originalUrl.startsWith('/oauth/token?grant_type=password&username=admin@cnes.fr&password=admin&scope=')) {
      // eslint-disable-next-line no-param-reassign
      req.method = 'GET'
      console.log('[JSon Mock server]', 'done')
    }
    // Continue to JSON Server router
    next()
  })

  // Rewriters
  server.use(jsonServer.rewriter({
    '/api/v1/rs-access/applications/:application_id/modules/:module_id': '/api/v1/rs-access/modules/:module_id',
    '/api/v1/rs-access/plugins/:type': '/api/v1/rs-access/plugins?type=:type',
    '/api/v1/rs-access/maintenances': '/api/v1/rs-access-signal/maintenances',
    '/api/v1/rs-access/maintenances/:project/activate': '/api/v1/rs-access-signal/activate',
    '/api/v1/rs-access/maintenances/:project/desactivate': '/api/v1/rs-access-signal/desactivate',
    '/api/v1/rs-admin/maintenances': '/api/v1/rs-admin-signal/maintenances',
    '/api/v1/rs-admin/maintenances/:project/activate': '/api/v1/rs-admin-signal/activate',
    '/api/v1/rs-admin/maintenances/:project/desactivate': '/api/v1/rs-admin-signal/desactivate',
    '/api/v1/rs-cloud/maintenances': '/api/v1/rs-cloud-signal/maintenances',
    '/api/v1/rs-cloud/maintenances/:project/activate': '/api/v1/rs-cloud-signal/activate',
    '/api/v1/rs-cloud/maintenances/:project/desactivate': '/api/v1/rs-cloud-signal/desactivate',
    '/api/v1/rs-dam/maintenances': '/api/v1/rs-dam-signal/maintenances',
    '/api/v1/rs-dam/maintenances/:project/activate': '/api/v1/rs-dam-signal/activate',
    '/api/v1/rs-dam/maintenances/:project/desactivate': '/api/v1/rs-dam-signal/desactivate',
    '/api/v1/rs-gateway/maintenances': '/api/v1/rs-gateway-signal/maintenances',
    '/api/v1/rs-gateway/maintenances/:project/activate': '/api/v1/rs-gateway-signal/activate',
    '/api/v1/rs-gateway/maintenances/:project/desactivate': '/api/v1/rs-gateway-signal/desactivate',
    '/api/v1/rs-dam/plugins/:pluginId/config': '/api/v1/rs-dam/configurations?pluginId=:pluginId',
    '/api/v1/rs-dam/plugins/:pluginId/config/:pluginConfigurationId': '/api/v1/rs-dam/configurations/:pluginConfigurationId',
    '/api/v1/rs-dam/plugins/configs': '/api/v1/rs-dam/configurations',
    '/api/v1/rs-dam-list/models/attributes': '/api/v1/rs-dam-list/attributes-models',
    '/api/v1/rs-dam-list/models/fragments': '/api/v1/rs-dam-list/models-fragments',
    '/api/v1/rs-dam-list/models/:modelid/attributes': '/api/v1/rs-dam-list/models-attributes?model.id=:modelid',
    '/api/v1/rs-dam-list/models/:modelid/attributes/:id': '/api/v1/rs-dam-list/models-attributes/:id?model.id=:modelid',
    '/api/v1/rs-dam-array/models/attributes/restrictions': '/api/v1/rs-dam-array/models-attributes-restrictions',
    '/api/v1/rs-dam-array/models/attributes/types': '/api/v1/rs-dam-array/models-attributes-types',
    '/api/v1/rs-dam/plugintypes': '/api/v1/rs-dam-array/plugintypes',
    '/oauth/token': '/tokens/1',
  }))

  // server.use('/api/v1/rs-gateway/', gatewayMicroServiceRouter)
  server.use('/api/v1/rs-access/', accessMicroServiceRouter)
  server.use('/api/v1/rs-access-signal/', accessMicroServiceSignalRouter)
  server.use('/api/v1/rs-admin/', adminMicroServiceRouter)
  server.use('/api/v1/rs-admin-signal/', adminMicroServiceSignalRouter)
  server.use('/api/v1/rs-catalog/', catalogMicroServiceRouter)
  server.use('/api/v1/rs-cloud-signal/', cloudMicroServiceSignalRouter)
  server.use('/api/v1/rs-dam/', damMicroServiceRouter)
  server.use('/api/v1/rs-dam-list/', damMicroServiceRouterList)
  server.use('/api/v1/rs-dam-array/', damMicroServiceRouterArray)
  server.use('/api/v1/rs-dam-signal/', damMicroServiceSignalRouter)
  server.use('/api/v1/rs-archival-storage', archivalStoragePluginsMonitoringRouter)
  // server.use('/api/v1/rs-gateway/', gatewayMicroServiceRouter)
  server.use('/api/v1/rs-gateway-signal/', gatewayMicroServiceSignalRouter)
  server.use(gatewayMicroServiceRouter)

  server.listen(serverPort, () => {
    console.log('[JSon Mock server]', `running on http://localhost:${serverPort}/`)
  })
}

/**
 * Copy mock json database to temp file for trash use during mock usage
 */
fs.copy('./mocks/json/resources/rs-access-signal.json', 'mocks/json/runtime/rs-access-signal.temp.json', () => {
  fs.copy('./mocks/json/resources/rs-admin-signal.json', 'mocks/json/runtime/rs-admin-signal.temp.json', () => {
    fs.copy('./mocks/json/resources/rs-cloud-signal.json', 'mocks/json/runtime/rs-cloud-signal.temp.json', () => {
      fs.copy('./mocks/json/resources/rs-dam-signal.json', 'mocks/json/runtime/rs-dam-signal.temp.json', () => {
        fs.copy('./mocks/json/resources/rs-gateway-signal.json', 'mocks/json/runtime/rs-gateway-signal.temp.json', () => {
          fs.copy('./mocks/json/resources/rs-admin.json', 'mocks/json/runtime/rs-admin.temp.json', () => {
            fs.copy('./mocks/json/resources/rs-dam.json', 'mocks/json/runtime/rs-dam.temp.json', () => {
              fs.copy('./mocks/json/resources/rs-catalog.json', 'mocks/json/runtime/rs-catalog.temp.json', () => {
                fs.copy('./mocks/json/resources/rs-access.json', 'mocks/json/runtime/rs-access.temp.json', () => {
                  fs.copy('./mocks/json/resources/rs-archival-storage.json', 'mocks/json/runtime/rs-archival-storage.temp.json', () => {
                    fs.copy('./mocks/json/resources/rs-gateway.json', 'mocks/json/runtime/rs-gateway.temp.json', () => {
                      fs.copy('./mocks/json/resources/rs-dam-list.json', 'mocks/json/runtime/rs-dam-list.temp.json', () => {
                        fs.copy('./mocks/json/resources/rs-dam-array.json', 'mocks/json/runtime/rs-dam-array.temp.json', runServer)
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })
})
