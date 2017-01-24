import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { ProjectListContainer } from '../../src/containers/ProjectListContainer'
import ProjectListComponent from '../../src/components/ProjectListComponent'

// Test a components rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing project list container', () => {
  it('should exists', () => {
    assert.isNotNull(ProjectListContainer)
    assert.isNotNull(ProjectListComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      // from mapStateToProps
      projectList: {
        'project name': {
          content: {
            id: 1,
            name: 'project name',
            description: 'project desc',
            icon: 'project icon',
            isPublic: true,
          },
        },
      },
      // from mapDispatchToProps
      fetchProjectList: () => {},
      deleteProject: () => {},
      onLogout: () => {},
    }

    const enzymeWrapper = shallow(<ProjectListContainer {...props} />)
    const subComponent = enzymeWrapper.find(ProjectListComponent)
    expect(subComponent).to.have.length(1)
  })
})
