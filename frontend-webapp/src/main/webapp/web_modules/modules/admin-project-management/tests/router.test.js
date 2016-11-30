import { assert, expect } from 'chai'
import Routes from '../src/routes'
import ProjectFormContainer from '../src/containers/ProjectFormContainer'
import ProjectListContainer from '../src/containers/ProjectListContainer'

describe('[ADMIN PROJECT MANAGEMENT] Testing project router', () => {
  it('should return the correct value', () => {
    assert.isNotNull(Routes)
    expect(Routes.childRoutes).to.have.length(3)
    expect(Routes.childRoutes[0].path).to.eq('list')
    expect(Routes.childRoutes[1].path).to.eq(':project_name/edit')
    expect(Routes.childRoutes[2].path).to.eq('create')
  })
  it('list should return ProjectListContainer', (done) => {
    Routes.childRoutes[0].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ProjectListContainer)
      done()
    })
  })
  it('edit should return ProjectFormContainer', (done) => {
    Routes.childRoutes[1].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ProjectFormContainer)
      done()
    })
  })
  it('create should return ProjectFormContainer', (done) => {
    Routes.childRoutes[2].getComponents(undefined, (smth, component) => {
      expect(component.content).to.eq(ProjectFormContainer)
      done()
    })
  })
})
