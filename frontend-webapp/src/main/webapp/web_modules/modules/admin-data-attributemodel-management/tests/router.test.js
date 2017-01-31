/**
 * LICENSE_PLACEHOLDER
 **/
import { assert, expect } from 'chai'
import Routes from '../src/router'
import AttributeModelFormContainer from '../src/containers/AttributeModelFormContainer'
import AttributeModelListContainer from '../src/containers/AttributeModelListContainer'

describe('[ADMIN DATA ATTRIBUTE MODEL MANAGEMENT] Testing router', () => {
  it('should return the correct value', () => {
    assert.isDefined(Routes)
    expect(Routes.childRoutes).to.have.length(3)
    expect(Routes.childRoutes[0].path).to.eq('list')
    expect(Routes.childRoutes[1].path).to.eq('create(/fragment/:fragment_id)')
    expect(Routes.childRoutes[2].path).to.eq(':attrModel_id/edit')
  })
  it('list should return AttributeModelListContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(AttributeModelListContainer)
      done()
    })
  })

  it('edit should return AttributeModelFormContainer', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(AttributeModelFormContainer)
      done()
    })
  })
  it('create should return AttributeModelFormContainer', (done) => {
    Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(AttributeModelFormContainer)
      done()
    })
  })
})
