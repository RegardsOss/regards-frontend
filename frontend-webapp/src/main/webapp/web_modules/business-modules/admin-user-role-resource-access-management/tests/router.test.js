import { assert, expect } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import Routes from '../src/router'
import ResourceAccessFormContainer from '../src/containers/ResourceAccessFormContainer'

describe('[ADMIN USER ROLE RESOURCE ACCESS MANAGEMENT] Testing project router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isDefined(Routes)
    expect(Routes.childRoutes).to.have.length(1)
    expect(Routes.childRoutes[0].path).to.eq(':role_name/edit')
  })
  it('list should return ResourceAccessFormContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ResourceAccessFormContainer)
      done()
    })
  })
})
