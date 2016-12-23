/**
 * LICENSE_PLACEHOLDER
 **/
const { map } = require('lodash')
const jsonServer = require('json-server')

const server = jsonServer.create()
const router = jsonServer.router('mocks/mock.json')
const middlewares = jsonServer.defaults()

/**
 * Add pagination format to response list and HAteoas format to each elements
 * @param req
 * @param res
 */
router.render = function (req, res) {
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

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
