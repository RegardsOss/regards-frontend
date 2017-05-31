/**
 * LICENSE_PLACEHOLDER
 **/
import { assert, expect } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import Routes from '../src/router'
import ModelAttributeFormContainer from '../src/containers/ModelAttributeFormContainer'

describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isDefined(Routes)
    expect(Routes.childRoutes).to.have.length(1)
    expect(Routes.childRoutes[0].path).to.eq(':model_id/edit')
  })
  it('list should return ModelAttributeFormContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ModelAttributeFormContainer)
      done()
    })
  })
})
