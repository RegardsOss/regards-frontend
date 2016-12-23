/**
 * LICENSE_PLACEHOLDER
 **/
const {map} = require('lodash')
const jsonServer = require('json-server')
const fs = require('fs-extra');

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
    results = {
      content: datas,
      meta: {},
      links: [],
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
  const accessMicroServiceRewriter = jsonServer.rewriter('mocks/rs-access.rewriter.json')
  const middlewares = jsonServer.defaults()

  accessMicroServiceRouter.render = PageAndHateoasMiddleWare

  server.use(middlewares)

  server.use(jsonServer.bodyParser)
  server.use(function (req, res, next) {
    if (req.method === 'POST' && req.originalUrl == '/oauth/token?grant_type=password&username=admin@cnes.fr&password=admin&scope=cdpp') {
      req.method = 'GET'
      console.log("done")
    }
    // Continue to JSON Server router
    next()
  })

  server.use(jsonServer.rewriter({
    '/api/v1/rs-access/applications/:application_id/modules/:module_id': '/api/v1/rs-access/modules/:module_id',
    '/oauth/token' :'/tokens/1'
  }))
  server.use('/api/v1/rs-access/', accessMicroServiceRouter)
  server.use(gatewayMicroServiceRouter)

  server.listen(3000, () => {
    console.log('JSON Server is running')
  })

}

/**
 * Copy mock json database to temp file for trash use during mock usage
 */
fs.copy('./mocks/rs-access.json', 'mocks/rs-access.temp.json', ()=> {
  fs.copy('./mocks/rs-gateway.json', 'mocks/rs-gateway.temp.json', runServer)
});

