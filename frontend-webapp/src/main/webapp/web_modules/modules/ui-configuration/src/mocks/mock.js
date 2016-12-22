// server.js
const { map } = require('lodash')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('/home/sbinda/git/rs-frontend/frontend-webapp/src/main/webapp/web_modules/modules/ui-configuration/src/mocks/mock.json')
const middlewares = jsonServer.defaults()

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

middlewares.push((req, res, next) => {
  console.log(res.locals)
  next()
})

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
