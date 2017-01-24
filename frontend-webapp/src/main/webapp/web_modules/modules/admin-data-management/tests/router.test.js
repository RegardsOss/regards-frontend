import { assert, expect } from 'chai'
import { attributeModelDataManagementRouter } from '@regardsoss/admin-data-attributemodel-management'
import { fragmentDataManagementRouter } from '@regardsoss/admin-data-fragment-management'
import { modelDataManagementRouter } from '@regardsoss/admin-data-model-management'
import { modelAttributeDataManagementRouter } from '@regardsoss/admin-data-modelattribute-management'
import Routes from '../src/router'
import ModuleContainer from '../src/components/ModuleContainer'

describe('[ADMIN DATA MANAGEMENT] Testing data board router', () => {
  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(5)
    expect(Routes.childRoutes[0].path).to.eq('board')
    expect(Routes.childRoutes[1].path).to.eq('model')
    expect(Routes.childRoutes[2].path).to.eq('model-attribute')
    expect(Routes.childRoutes[3].path).to.eq('attribute/model')
    expect(Routes.childRoutes[4].path).to.eq('fragment')
  })
  it('should return BoardContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ModuleContainer)
      done()
    })
  })
  it('should return modelDataManagementRouter', (done) => {
    Routes.childRoutes[1].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(modelDataManagementRouter)
      done()
    })
  })

  it('should return modelAttributeDataManagementRouter', (done) => {
    Routes.childRoutes[2].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(modelAttributeDataManagementRouter)
      done()
    })
  })
  it('should return dataManagementRouter', (done) => {
    Routes.childRoutes[3].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(attributeModelDataManagementRouter)
      done()
    })
  })
  it('should return fragmentDataManagementRouter', (done) => {
    Routes.childRoutes[4].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(fragmentDataManagementRouter)
      done()
    })
  })
})
