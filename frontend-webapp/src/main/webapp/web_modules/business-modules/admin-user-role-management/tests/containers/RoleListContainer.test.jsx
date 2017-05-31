/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { RoleListContainer } from '../../src/containers/RoleListContainer'
import RoleListComponent from '../../src/components/RoleListComponent'

// Test a component rendering
describe('[ADMIN USER ROLE MANAGEMENT] Testing project list container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RoleListContainer)
    assert.isDefined(RoleListComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      params: {
        project: 'project1',
      },
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
      fetchRoleList: () => {},
      deleteRole: () => {},
      onLogout: () => {},
    }

    const enzymeWrapper = shallow(<RoleListContainer {...props} />)
    const subComponent = enzymeWrapper.find(RoleListComponent)
    expect(subComponent).to.have.length(1)
  })
})
