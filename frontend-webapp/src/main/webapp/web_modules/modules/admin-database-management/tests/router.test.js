import { assert, expect } from 'chai'
import Routes from '../src/router'
import ProjectConnectionListContainer from '../src/containers/ProjectConnectionListContainer'
import ProjectConnectionEditContainer from '../src/containers/ProjectConnectionEditContainer'

describe('[ADMIN DATABASE MANAGEMENT] Testing router', () => {
  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(3)
    expect(Routes.childRoutes[0].path).to.eq('list')
    expect(Routes.childRoutes[1].path).to.eq(':project_connection_id/edit')
    expect(Routes.childRoutes[2].path).to.eq('guided')
  })
  it('list should return ProjectConnectionListContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ProjectConnectionListContainer)
      done()
    })
  })
  it('edit should return ProjectConnectionEditContainer', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ProjectConnectionEditContainer)
      done()
    })
  })
})
