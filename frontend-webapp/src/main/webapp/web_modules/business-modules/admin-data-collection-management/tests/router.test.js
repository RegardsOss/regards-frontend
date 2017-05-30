/**
 * LICENSE_PLACEHOLDER
 **/
import { assert, expect } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import Routes from '../src/router'
import CollectionFormContainer from '../src/containers/CollectionFormContainer'
import CollectionListContainer from '../src/containers/CollectionListContainer'
import CollectionEditLinksContainer from '../src/containers/CollectionEditLinksContainer'

describe('[ADMIN DATA COLLECTION MANAGEMENT] Testing router', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the correct value', () => {
    assert.isDefined(Routes)
    expect(Routes.childRoutes).to.have.length(4)
    expect(Routes.childRoutes[0].path).to.eq('list')
    expect(Routes.childRoutes[1].path).to.eq('create')
    expect(Routes.childRoutes[2].path).to.eq(':collectionId/links')
    expect(Routes.childRoutes[3].path).to.eq(':collectionId/:mode')
  })
  it('list should return CollectionListContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(CollectionListContainer)
      done()
    })
  })
  it('edit should return CollectionFormContainer', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(CollectionFormContainer)
      done()
    })
  })
  it('edit links should return CollectionEditLinksContainer', (done) => {
    Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(CollectionEditLinksContainer)
      done()
    })
  })
  it('create should return CollectionFormContainer', (done) => {
    Routes.childRoutes[3].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(CollectionFormContainer)
      done()
    })
  })
})
