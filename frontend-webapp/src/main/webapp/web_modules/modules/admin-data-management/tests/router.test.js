import { assert, expect } from 'chai'
import { attributeModelDataManagementRouter } from '@regardsoss/admin-data-attributemodel-management'
import Routes from '../src/router'
import BoardContainer from '../src/containers/BoardContainer'

describe('[ADMIN DATA MANAGEMENT] Testing data board router', () => {
  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(3)
    expect(Routes.childRoutes[0].path).to.eq('board')
    expect(Routes.childRoutes[1].path).to.eq('model')
    expect(Routes.childRoutes[2].path).to.eq('attribute/model')
  })
  it('list should return BoardContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(BoardContainer)
      done()
    })
  })
  it('create should return dataManagementRouter', (done) => {
    Routes.childRoutes[2].getChildRoutes(undefined, (smth, component) => {
      expect(component[0]).to.eq(attributeModelDataManagementRouter)
      done()
    })
  })
})
