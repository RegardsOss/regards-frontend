/*
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ProjectFormContainer } from '../../../src/containers/project/ProjectFormContainer'
import ProjectFormComponent from '../../../src/components/project/ProjectFormComponent'

// Test a component rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing form container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectFormContainer)
    assert.isDefined(ProjectFormComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      params: {
        project_name: 'project name',
      },
      // from mapStateToProps
      project: {
        content: {
          id: 1,
          name: 'project name',
          description: 'project desc',
          icon: 'http://localhost:1888/yeah.gif',
          isPublic: true,
        },
      },
      isFetching: false,
      // from mapDispatchToProps
      createProject: () => { },
      fetchProject: () => { },
      updateProject: () => { },
    }

    const enzymeWrapper = shallow(<ProjectFormContainer {...props} />)
    const subComponent = enzymeWrapper.find(ProjectFormComponent)
    expect(subComponent).to.have.length(1)
  })
})
