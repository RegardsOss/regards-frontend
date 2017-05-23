/**
 * LICENSE_PLACEHOLDER
 **/
import size from 'lodash/size'
import filter from 'lodash/filter'
import pickBy from 'lodash/pickBy'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { Table, TableRow } from 'material-ui/Table'
import { NoContentMessageInfo } from '@regardsoss/components'
import { LoadableContentDisplayDecorator, HateoasIconAction } from '@regardsoss/display-control'
import { ProjectUserListComponent, TABS, canAcceptUser, canDenyUser } from '../../src/components/ProjectUserListComponent'


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

const waitingAccessUsers = pickBy(users, user => user.content.status === 'WAITING_ACCESS')

const initialProps = {
  users: {},
  waitingAccessUsers: {},
  onAccept: () => { },
  onEdit: () => { },
  onDelete: () => { },
  onValidate: () => { },
  onValidateAll: () => { },
  onDeny: () => { },
  createUrl: 'url/create',
  backUrl: 'url/back',
  initialFecthing: true,
  isFetchingActions: false,
}

const countDisabled = (Type, wrapper) => {
  const allOfTypes = wrapper.find(Type)
  let disabledCount = 0
  for (let i = 0; i < allOfTypes.length; i += 1) {
    const action = allOfTypes.at(i)
    if (action.props().disabled) {
      disabledCount += 1
    }
  }
  return disabledCount
}

const context = buildTestContext()

// Test a component rendering
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing project user list component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectUserListComponent)
  })
  it('should render self after loading, opening the waitin tab if there is any waiting request', () => {
    // 1 - loading
    const enzymeWrapper = shallow(<ProjectUserListComponent {...initialProps} />, { context })
    let noContentDisplayers = enzymeWrapper.find(NoContentMessageInfo)
    assert.equal(noContentDisplayers.length, 1, 'There should be a no content displayer')
    assert.isFalse(noContentDisplayers.at(0).props().noContent, 'The no content displayer should not be visible at initial loading')
    let loadingDisplayers = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.equal(loadingDisplayers.length, 1, 'There should be a loading displayer')
    assert.isTrue(loadingDisplayers.at(0).props().isLoading, 'The loading displayer should be visible at initial loading')
    let tables = enzymeWrapper.find(Table)
    assert.equal(tables.length, 1, 'There should be the main table displayer, always!')
    let tableRows = enzymeWrapper.find(TableRow)
    assert.equal(tableRows.length, 1, 'There should be only the header row at loading')

    // 2 - After loading, render with waiting users
    const afterLoadingProps = {
      ...initialProps,
      initialFecthing: false,
      users,
      waitingAccessUsers,
    }
    enzymeWrapper.setProps(afterLoadingProps)
    assert.equal(enzymeWrapper.state('selectedTab'), TABS.waiting, 'The component should display waiting tab, as he was loaded with initial waiting users')
    noContentDisplayers = enzymeWrapper.find(NoContentMessageInfo)
    assert.equal(noContentDisplayers.length, 1, 'There should be a no content displayer')
    assert.isFalse(noContentDisplayers.at(0).props().noContent, 'The no content displayer should not be visible when there is content')
    loadingDisplayers = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.equal(loadingDisplayers.length, 1, 'There should be a loading displayer')
    assert.isFalse(loadingDisplayers.at(0).props().isLoading, 'The loading displayer should not be visible after initial loading')
    tables = enzymeWrapper.find(Table)
    assert.equal(tables.length, 1, 'There should be the main table displayer, always!')
    tableRows = enzymeWrapper.find(TableRow)
    assert.equal(tableRows.length, 1 + size(waitingAccessUsers), 'There should be the header row plus one row for each waiting user')
    assert.equal(countDisabled(HateoasIconAction, enzymeWrapper), 0, 'All line options should be available in waiting users tab while not processing anything')
  })
  it('should render self after loading, opening all users tab there is no waiting user', () => {
    // 1 - loading (render already tested in previous test)
    const enzymeWrapper = shallow(<ProjectUserListComponent {...initialProps} />, { context })
    // 2 - After loading, render without waiting users
    const afterLoadingProps = {
      ...initialProps,
      initialFecthing: false,
      users,
      waitingAccessUsers: {},
    }
    enzymeWrapper.setProps(afterLoadingProps)
    assert.equal(enzymeWrapper.state('selectedTab'), TABS.all, 'The component should display all users tab, as he was loaded without initial waiting users')
    const tableRows = enzymeWrapper.find(TableRow)
    assert.equal(tableRows.length, 1 + size(users), 'There should be the header row plus one row for each application user')

    // disabled actions : count actions to disable for users and actions
    const disabledCount = filter(users, u => !canAcceptUser(u)).length + filter(users, u => !canDenyUser(u)).length
    assert.equal(countDisabled(HateoasIconAction, enzymeWrapper), disabledCount, 'Options should be disabled for users that are not matching conditions')
    // other elements: tested in previous tests
  })
  it('should show no content for each tab if there is no users for that tab', () => {
    // 1 - loading, already tests in previous test
    const enzymeWrapper = shallow(<ProjectUserListComponent {...initialProps} />, { context })

    // 2.1 - After loading, render without any user
    const afterLoadingProps = {
      ...initialProps,
      initialFecthing: false,
      users: {},
      waitingAccessUsers: {},
    }
    enzymeWrapper.setProps(afterLoadingProps)
    assert.equal(enzymeWrapper.state('selectedTab'), TABS.all, 'The component should display all users tab, as he was loaded without initial waiting users')
    assert.equal(enzymeWrapper.find(TableRow).length, 1, 'There should be only the header row (no user)')
    assert.isTrue(enzymeWrapper.find(NoContentMessageInfo).at(0).props().noContent, 'The no content displayer should be visible as there is no user')

    // 2.2 - change tab to show the waiting users
    enzymeWrapper.setState({ selectedTab: TABS.waiting })
    assert.equal(enzymeWrapper.find(TableRow).length, 1, 'There should be only the header row (no user)')
    assert.equal(enzymeWrapper.state('selectedTab'), TABS.waiting, 'The component should display waiting users tab after state change')
    assert.isTrue(enzymeWrapper.find(NoContentMessageInfo).at(0).props().noContent, 'The no content displayer should be visible as there is no waiting user')
  })
  it('should disable signal actions when already processing', () => {
    // 1 - loading, already tests in previous test
    const enzymeWrapper = shallow(<ProjectUserListComponent {...initialProps} />, { context })
    // 2 - After loading (there are waiting users, so falling into waiting state, as tested before)
    const afterLoadingProps = {
      ...initialProps,
      initialFecthing: false,
      isFetchingActions: true,
      users,
      waitingAccessUsers,
    }
    enzymeWrapper.setProps(afterLoadingProps)

    // assertion all row actions (3 for each line) are disabled
    const actionsByRow = 4
    assert.equal(enzymeWrapper.state('selectedTab'), TABS.waiting, 'The component should display waiting users tab, as he was loaded with initial waiting users')
    assert.equal(countDisabled(HateoasIconAction, enzymeWrapper), size(waitingAccessUsers) * actionsByRow, 'The line actions should be disabled')

    // 2.2 - change tab to show all users and check the same
    enzymeWrapper.setState({ selectedTab: TABS.all })
    assert.equal(enzymeWrapper.state('selectedTab'), TABS.all, 'The component should display all users tab, as he was loaded without initial waiting users')
    assert.equal(countDisabled(HateoasIconAction, enzymeWrapper), size(users) * actionsByRow, 'The line actions should be disabled')
  })
})
