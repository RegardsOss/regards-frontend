import { assert, expect } from 'chai'
import Routes from '../src/router'
import ModelFormContainer from '../src/containers/ModelFormContainer'
import ModelListContainer from '../src/containers/ModelListContainer'

describe('[ADMIN DATA MODEL MANAGEMENT] Testing model router', () => {
  it('should return the correct value', () => {
    assert.isDefined(Routes)
    expect(Routes.childRoutes).to.have.length(3)
    expect(Routes.childRoutes[0].path).to.eq('list')
    expect(Routes.childRoutes[1].path).to.eq('create')
    expect(Routes.childRoutes[2].path).to.eq(':model_id/edit')
  })
  it('list should return RoleListContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ModelListContainer)
      done()
    })
  })
  it('edit should return RoleFormContainer', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ModelFormContainer)
      done()
    })
  })
  it('create should return RoleFormContainer', (done) => {
    Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ModelFormContainer)
      done()
    })
  })
})
