/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { RoleFormContainer } from '../../src/containers/RoleFormContainer'
import RoleFormComponent from '../../src/components/RoleFormComponent'

// Test a component rendering
describe('[ADMIN USER ROLE MANAGEMENT] Testing form container', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    sinon.stub(console, 'error', (warning) => { throw new Error(warning) })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(RoleFormContainer)
    assert.isDefined(RoleFormComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      params: {
        project_name: 'project name',
      },
      // from mapStateToProps
      role: {
        content: {
          id: 1,
          name: 'project name',
          parent_role_id: 'project desc',
          is_default: true,
          is_native: true,
        },
      },
      isFetching: false,
      // from mapDispatchToProps
      createProject: () => {},
      fetchProject: () => {},
      updateProject: () => {},
    }

    const enzymeWrapper = shallow(<RoleFormContainer {...props} />)
    const subComponent = enzymeWrapper.find(RoleFormComponent)
    expect(subComponent).to.have.length(1)
  })
})
