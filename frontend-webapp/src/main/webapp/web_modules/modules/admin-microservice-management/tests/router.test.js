import { assert } from 'chai'
import Routes from '../src/router'

describe('[ADMIN MICROSERVICE MANAGEMENT] Testing data board router', () => {
  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    //expect(Routes.childRoutes).to.have.length(4) TODO
    //expect(Routes.childRoutes[0].path).to.eq('board') TODO
    //expect(Routes.childRoutes[1].path).to.eq('model') TODO
  })
  it('[sub-route should return [ThatContainer]', (done) => {
    /*
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ModuleContainer)
      done()
    })
    */
  })
})
