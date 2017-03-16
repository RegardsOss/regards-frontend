import { pickBy } from 'lodash'
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { ProjectUserListContainer } from '../../src/containers/ProjectUserListContainer'
import ProjectUserListComponent from '../../src/components/ProjectUserListComponent'

const users = {
  1: {
    content: {
      id: 1,
      email: 'admin@cnes.fr',
      lastUpdate: '2017-02-20T11:55:05.012',
      lastConnection: '2023-04-30T18:20:02.012',
      role: { id: 2, name: 'REGISTERED_USER' },
      status: 'ACCESS_GRANTED',
      permissions: [],
    },
    links: [],
  },
  2: {
    content: {
      id: 2,
      email: 'testUWaitingAccess@cnes.fr',
      lastUpdate: '2017-02-20T11:55:05.015',
      lastConnection: '2023-04-30T18:20:02.012',
      role: {
        id: 2,
        name: 'REGISTERED_USER',
      },
      status: 'WAITING_ACCESS',
      permissions: [],
    },
    links: [],
  },
  3: {
    content: {
      id: 3,
      email: 'testUWaitingAccess2@cnes.fr',
      lastUpdate: '2017-02-20T11:55:05.012',
      lastConnection: '2023-04-30T18:20:02.012',
      role: {
        id: 2,
        name: 'REGISTERED_USER',
      },
      status: 'WAITING_ACCESS',
      permissions: [],
    },
    links: [],
  },
}

const waitingUsers = pickBy(users, user => user.content.status === 'WAITING_ACCESS')

// Test a component rendering
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing project user list container', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(ProjectUserListContainer)
  })
  it('should render self and subcomponents', () => {
    const props = {
      params: { project: 'any' },
      // from mapStateToProps
      users,
      waitingAccessUsers: waitingUsers,
      isFetchingContent: false,
      // from mapDispatchToProps
      fetchUsers: () => { },
      fetchWaitingAccessUsers: () => { },
      denyProjectUser: () => { },
      validateProjectUser: () => { },
      deleteAccount: () => { },
    }

    const enzymeWrapper = shallow(<ProjectUserListContainer {...props} />)
    const subComponent = enzymeWrapper.find(ProjectUserListComponent)
    expect(subComponent).to.have.length(1)
  })
})
