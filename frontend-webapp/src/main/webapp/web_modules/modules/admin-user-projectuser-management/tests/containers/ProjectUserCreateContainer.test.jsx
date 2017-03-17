/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { ProjectUserCreateContainer } from '../../src/containers/ProjectUserCreateContainer'
import ProjectUserCreateComponent from '../../src/components/ProjectUserCreateComponent'

// Test a component rendering
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing projectuser form container', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => { throw new Error(warning) })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(ProjectUserCreateContainer)
    assert.isDefined(ProjectUserCreateComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
       // from mapStateToProps
      roleList: {
        PUBLIC: {
          content: {
            id: 1,
            name: 'PUBLIC',
            permissions: [],
            authorizedAddresses: [],
            isCorsRequestsAuthorized: true,
            isDefault: true,
            isNative: true,
          },
          links: [],
        },
      },
      groupList: {
        AG1: {
          content: {
            id: 1,
            name: 'AG1',
            users: [{ email: 'florian.philippot@facholand.fr' }, { email: 'mon@adresse.em' }],
            accessRights: [],
            isPrivate: true,
          },
          links: [],
        },
        AG2: {
          content: { id: 2, name: 'AG2', users: [], accessRights: [], isPrivate: true },
          links: [],
        },
      },

      user: {
        content: {
          id: 1,
          email: 'mon@adresse.em',
          lastUpdate: {
            date: { year: '2017', month: '1', day: '9' },
            time: { hour: '15', minute: '46', second: '12', nano: '453000000' },
          },
          status: 'WAITING_ACCESS',
          metaData: [],
          role: { name: 'REGISTERED_USER' },
          permissions: [],
        },
        links: [],
      },
      isFetching: false,
      // from router
      params: {
        project: 'project-1',
        user_id: '1',
      },
      // from mapDispatchToProps
      createProjectUser: () => {},
      updateProjectUser: () => {},
      fetchRoleList: () => {},
      fetchGroupList: () => {},
      assignGroup: () => {},
    }

    const enzymeWrapper = shallow(<ProjectUserCreateContainer {...props} />)
    const subComponent = enzymeWrapper.find(ProjectUserCreateComponent)
    expect(subComponent).to.have.length(1)
  })
})
