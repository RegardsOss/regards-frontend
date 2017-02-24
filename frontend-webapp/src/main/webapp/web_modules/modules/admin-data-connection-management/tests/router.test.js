/**
 * LICENSE_PLACEHOLDER
 **/
import { assert, expect } from 'chai'
import Routes from '../src/router'
import ConnectionFormContainer from '../src/containers/ConnectionFormContainer'
import ConnectionListContainer from '../src/containers/ConnectionListContainer'


describe('[ADMIN DATA CONNECTION MANAGEMENT] Testing router', () => {
  it('should return the correct value', () => {
    assert.isDefined(Routes)
    expect(Routes.childRoutes).to.have.length(3)
    expect(Routes.childRoutes[0].path).to.eq('list')
    expect(Routes.childRoutes[1].path).to.eq('create')
    expect(Routes.childRoutes[2].path).to.eq(':connectionId/edit')
  })
  it('list should return ConnectionListContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ConnectionListContainer)
      done()
    })
  })
  it('edit should return ConnectionFormContainer', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ConnectionFormContainer)
      done()
    })
  })
  it('create should return ConnectionFormContainer', (done) => {
    Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ConnectionFormContainer)
      done()
    })
  })
})
