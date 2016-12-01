import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { RoleListContainer } from '../../src/containers/RoleListContainer'
import RoleListComponent from '../../src/components/RoleListComponent'

// Test a component rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing project list container', () => {
  it('should exists', () => {
    assert.isNotNull(RoleListContainer)
    assert.isNotNull(RoleListComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      // from mapStateToProps
      projectList: {
        'project name': {
          content: {
            id: '1',
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

    const enzymeWrapper = shallow(<RoleListContainer {...props} />)
    const subComponent = enzymeWrapper.find(RoleListComponent)
    expect(subComponent).to.have.length(1)
  })
})
