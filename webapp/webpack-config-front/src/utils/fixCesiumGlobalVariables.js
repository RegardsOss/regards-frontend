/**
 * HTMLCanvasElement mock class used in Cesium unit testing
 */
class HTMLCanvasElementMock {
  constructor() {}
}

/**
 * HTMLImageElement mock class used in Cesium unit testing
 */
class HTMLImageElementMock {
  constructor() {}
}

module.exports = function () {
  global.HTMLCanvasElement = HTMLCanvasElementMock
  global.HTMLImageElement = HTMLImageElementMock
}
