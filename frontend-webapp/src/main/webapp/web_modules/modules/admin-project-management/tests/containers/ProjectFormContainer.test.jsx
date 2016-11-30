import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { ProjectFormContainer } from '../../src/containers/ProjectFormContainer'
import ProjectFormComponent from '../../src/components/ProjectFormComponent'

// Test a component rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing form container', () => {
  it('should exists', () => {
    assert.isNotNull(ProjectFormContainer)
    assert.isNotNull(ProjectFormComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      params: {
        project_name: 'project name',
      },
      // from mapStateToProps
      project: {
        content: {
          id: '1',
          name: 'project name',
          description: 'project desc',
          icon: 'project icon',
          isPublic: true,
        },
      },
      isFetching: false,
      // from mapDispatchToProps
      createProject: () => {},
      fetchProject: () => {},
      updateProject: () => {},
    }

    const enzymeWrapper = shallow(<ProjectFormContainer {...props} />)
    const subComponent = enzymeWrapper.find(ProjectFormComponent)
    expect(subComponent).to.have.length(1)
  })
})
