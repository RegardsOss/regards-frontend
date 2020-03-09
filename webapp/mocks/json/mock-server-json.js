const url = require('url')

/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
const { map, split, filter, forEach, startsWith, replace, trim } = require('lodash')
const jsonServer = require('json-server')
const fs = require('fs-extra')

// definitions
const serverPort = 3001


const getAllLinks = () => [
  {
    rel: 'self',
    href: 'http://localhost:3333/unused',
  },
  {
    rel: 'delete',
    href: 'http://localhost:3333/unused',
  },
  {
    rel: 'update',
    href: 'http://localhost:3333/unused',
  },
  {
    rel: 'create',
    href: 'http://localhost:3333/unused',
  },
  {
    rel: 'list',
    href: 'http://localhost:3333/unused',
  },
]

/**
 * Add pagination format to response list and HAteoas format to each elements
 * @param req
 * @param res
 */
const PageMiddleWare = (req, res, postTreatment) => {
  let results = ''

  if (Array.isArray(res.locals.data)) {
    const datas = []
    map(res.locals.data, (elt, i) => {
      datas.push({
        content: elt,
        links: getAllLinks(),
      })
    })

    let meta = {
      number: res.locals.data.length,
      size: res.locals.data.length,
      totalElements: res.locals.data.length,
    }
    const links = getAllLinks()
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
      links: getAllLinks(),
    }
  }
  if (postTreatment) {
    results = postTreatment(results)
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
        links: getAllLinks(),
      })
    })
    res.jsonp(results)
  } else {
    res.jsonp({
      content: res.locals.data,
      links: getAllLinks(),
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

const facets = JSON.parse(fs.readFileSync('mocks/json/resources/facets-metadata.json', 'utf8') || this.logMessage('Failed reading file mocks/json/resources/facetsMetadata.json', true) || [])
const FacetsPageMiddleWare = (req, res) => {
  // post treatment on page data
  PageMiddleWare(req, res, jsResponse => Object.assign({}, jsResponse, req.url.includes('search') ? { facets } : {}))
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

  const accessProjectMicroServiceRouter = jsonServer.router('mocks/json/runtime/rs-access-project.temp.json')
  const accessInstanceMicroServiceRouter = jsonServer.router('mocks/json/runtime/rs-access-instance.temp.json')
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

  accessProjectMicroServiceRouter.render = PageMiddleWare
  accessInstanceMicroServiceRouter.render = PageMiddleWare
  adminMicroServiceRouter.render = RenderMiddleWare
  catalogMicroServiceRouter.render = FacetsPageMiddleWare
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
    '/api/v1/rs-access-project/applications/:application_id/modules/:module_id': '/api/v1/rs-access-project/modules/:module_id',
    '/api/v1/rs-access-instance/applications/:application_id/modules/:module_id': '/api/v1/rs-access-instance/modules/:module_id',
    '/api/v1/rs-access-project/plugins/:type': '/api/v1/rs-access-project/plugins?type=:type',
    '/api/v1/rs-access-project/plugins/definition/:id': '/api/v1/rs-access-project/plugin/:id',
    '/api/v1/rs-access-project/plugin/:id/config': '/api/v1/rs-access-project/plugin-configuration',
    '/api/v1/rs-access-project/plugin/:iddd/config/:id': '/api/v1/rs-access-project/plugin-configuration/:id',
    '/api/v1/rs-access-project/maintenances': '/api/v1/rs-access-project-signal/maintenances',
    '/api/v1/rs-access-project/maintenances/:project/activate': '/api/v1/rs-access-project-signal/activate',
    '/api/v1/rs-access-project/maintenances/:project/desactivate': '/api/v1/rs-access-project-signal/desactivate',
    '/api/v1/rs-access-project/layouts/user': '/api/v1/rs-access-project/layouts/0',
    '/api/v1/rs-access-instance/layouts/portal': '/api/v1/rs-access-instance/layouts/1',
    '/api/v1/rs-admin/projects/CDPP': '/api/v1/rs-admin/projects/1',
    '/api/v1/rs-admin/projects/:project/connections': '/api/v1/rs-admin/connections?projectName=:project&_start=0&_limit=10000',
    '/api/v1/rs-admin/projects/:project/connections/:id': '/api/v1/rs-admin/connections/:id',
    '/api/v1/rs-admin/maintenances': '/api/v1/rs-admin-signal/maintenances',
    '/api/v1/rs-admin/resources/controller/:microservice': '/api/v1/rs-dam-array/controller',
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
    '/api/v1/rs-dam/plugins/:pluginId/config': '/api/v1/rs-dam-list/configurations?pluginId=:pluginId',
    '/api/v1/rs-dam/plugins/:pluginId/config/:pluginConfigurationId': '/api/v1/rs-dam-list/configurations/:pluginConfigurationId',
    '/api/v1/rs-dam/plugins/configs': '/api/v1/rs-dam-list/configurations',
    '/api/v1/rs-dam/plugins': '/api/v1/rs-dam-list/plugins',
    '/api/v1/rs-dam/models': '/api/v1/rs-dam-list/models',
    '/api/v1/rs-dam-list/models/attributes': '/api/v1/rs-dam-list/attributes-models',
    '/api/v1/rs-dam-list/models/fragments': '/api/v1/rs-dam-list/models-fragments',
    '/api/v1/rs-dam-list/models/:modelid/attributes': '/api/v1/rs-dam-list/models-attributes?model.id=:modelid',
    '/api/v1/rs-dam-list/models/:modelid/attributes/:id': '/api/v1/rs-dam-list/models-attributes/:id?model.id=:modelid',
    '/api/v1/rs-dam-array/models/attributes/restrictions': '/api/v1/rs-dam-array/models-attributes-restrictions',
    '/api/v1/rs-dam-array/models/attributes/types': '/api/v1/rs-dam-array/models-attributes-types',
    '/api/v1/rs-dam/plugintypes': '/api/v1/rs-dam-array/plugintypes',
    '/api/v1/rs-dam/connections': '/api/v1/rs-dam-list/connections',
    '/api/v1/rs-catalog/dataobjects/search': '/api/v1/rs-catalog/search',
    '/api/v1/rs-catalog/dataobjects/datasets/search': '/api/v1/rs-catalog/search',
    '/api/v1/rs-access-project/dataobjects/search': '/api/v1/rs-catalog/search',
    '/api/v1/rs-access-project/datasets/search': '/api/v1/rs-catalog/search',
    '/api/v1/rs-access-project/dataobjects/datasets/search': '/api/v1/rs-catalog/search',
    '/oauth/token': '/tokens/1',
  }))

  // server.use('/api/v1/rs-gateway/', gatewayMicroServiceRouter)
  server.use('/api/v1/rs-access-project/', accessProjectMicroServiceRouter)
  server.use('/api/v1/rs-access-instance/', accessInstanceMicroServiceRouter)
  server.use('/api/v1/rs-access-project-signal/', accessMicroServiceSignalRouter)
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
fs.copy('./mocks/json/resources/rs-access-project-signal.json', 'mocks/json/runtime/rs-access-project-signal.temp.json', () => {
  fs.copy('./mocks/json/resources/rs-admin-signal.json', 'mocks/json/runtime/rs-admin-signal.temp.json', () => {
    fs.copy('./mocks/json/resources/rs-cloud-signal.json', 'mocks/json/runtime/rs-cloud-signal.temp.json', () => {
      fs.copy('./mocks/json/resources/rs-dam-signal.json', 'mocks/json/runtime/rs-dam-signal.temp.json', () => {
        fs.copy('./mocks/json/resources/rs-gateway-signal.json', 'mocks/json/runtime/rs-gateway-signal.temp.json', () => {
          fs.copy('./mocks/json/resources/rs-admin.json', 'mocks/json/runtime/rs-admin.temp.json', () => {
            fs.copy('./mocks/json/resources/rs-dam.json', 'mocks/json/runtime/rs-dam.temp.json', () => {
              fs.copy('./mocks/json/resources/rs-catalog.json', 'mocks/json/runtime/rs-catalog.temp.json', () => {
                fs.copy('./mocks/json/resources/rs-access-project.json', 'mocks/json/runtime/rs-access-project.temp.json', () => {
                  fs.copy('./mocks/json/resources/rs-access-instance.json', 'mocks/json/runtime/rs-access-instance.temp.json', () => {
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
})
