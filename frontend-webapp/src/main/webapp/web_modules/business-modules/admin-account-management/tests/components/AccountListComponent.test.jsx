import size from 'lodash/size'
import reject from 'lodash/reject'
import pickBy from 'lodash/pickBy'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { Table, TableRow } from 'material-ui/Table'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { NoContentMessageInfo } from '@regardsoss/components'
import { LoadableContentDisplayDecorator, HateoasIconAction } from '@regardsoss/display-control'
import { AccountListComponent, TABS } from '../../src/components/AccountListComponent'

const allAccounts = {
  1: {
    content: {
      id: 1,
      firstName: 'first name',
      lastName: 'last name',
      email: 'em@il.com',
      status: 'PENDING',
    },
  },
  2: {
    content: {
      id: 2,
      firstName: 'first name',
      lastName: 'last name',
      email: 'em@il.com',
      status: 'ACTIVE',
    },
  },
}


const waitingAccounts = pickBy(allAccounts, account => account.content.status === 'PENDING')

const initialProps = {
  allAccounts: {},
  waitingAccounts: {},
  onAccept: () => { },
  onRefuse: () => { },
  onEdit: () => { },
  onDelete: () => { },
  initialFecthing: true,
  isFetchingActions: false,
}

const options = {
  context: buildTestContext(),
}

const countDisabled = (Type, wrapper) => {
  const allOfTypes = wrapper.find(Type)
  let disabledCount = 0
  for (let i = 0; i < allOfTypes.length; i += 1) {
    const iconButton = allOfTypes.at(i)
    if (iconButton.props().disabled) {
      disabledCount += 1
    }
  }
  return disabledCount
}

// Test a component rendering
describe('[ADMIN ACCOUNT MANAGEMENT] Testing account list component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccountListComponent)
  })
  it('should render self after loading, opening the waitin tab if there is any waiting request', () => {
    // 1 - loading
    const enzymeWrapper = shallow(<AccountListComponent {...initialProps} />, options)
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

    // 2 - After loading, render WITH waiting users
    const afterLoadingProps = {
      ...initialProps,
      initialFecthing: false,
      allAccounts,
      waitingAccounts,
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
    assert.equal(tableRows.length, 1 + size(waitingAccounts), 'There should be the header row plus one row for each waiting user')
    assert.equal(countDisabled(HateoasIconAction, enzymeWrapper), 0, 'All line options should be available in waiting users tab while not processing anything')
  })
  it('should render self after loading, opening all users tab there is no waiting user', () => {
    // 1 - loading (render already tested in previous test)
    const enzymeWrapper = shallow(<AccountListComponent {...initialProps} />, options)
    // 1 - loading, already tests in previous test
    // 2 - After loading, render without waiting users
    const afterLoadingProps = {
      ...initialProps,
      initialFecthing: false,
      allAccounts,
      waitingAccounts: {},
    }
    enzymeWrapper.setProps(afterLoadingProps)
    assert.equal(enzymeWrapper.state('selectedTab'), TABS.all, 'The component should display all users tab, as he was loaded without initial waiting users')
    const tableRows = enzymeWrapper.find(TableRow)
    assert.equal(tableRows.length, 1 + size(allAccounts), 'There should be the header row plus one row for each application user')
    assert.equal(countDisabled(HateoasIconAction, enzymeWrapper), 2 * reject(allAccounts, account => account.content.status === 'PENDING').length, 'Accept and Refuse options should be disabled for accounts not in PENDING state')
    // other elements: tested in previous tests
  })
  it('should show no content for each tab if there is no users for that tab', () => {
    // 1 - loading, already tests in previous test
    const enzymeWrapper = shallow(<AccountListComponent {...initialProps} />, options)

    // 2.1 - After loading, render without any user
    const afterLoadingProps = {
      ...initialProps,
      initialFecthing: false,
      allAccounts: {},
      waitingAccounts: {},
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
    const enzymeWrapper = shallow(<AccountListComponent {...initialProps} />, options)
    // 2 - After loading (there are waiting users, so falling into waiting state, as tested before)
    const afterLoadingProps = {
      ...initialProps,
      initialFecthing: false,
      isFetchingActions: true,
      allAccounts,
      waitingAccounts,
    }
    enzymeWrapper.setProps(afterLoadingProps)

    // assertion all row actions (4 for each line) are disabled
    const actionsByRow = 4
    assert.equal(enzymeWrapper.state('selectedTab'), TABS.waiting, 'The component should display waiting users tab, as he was loaded with initial waiting users')
    assert.equal(countDisabled(HateoasIconAction, enzymeWrapper), size(waitingAccounts) * actionsByRow, 'The line actions should be disabled')

    // 2.2 - change tab to show all users and check the same
    enzymeWrapper.setState({ selectedTab: TABS.all })
    assert.equal(enzymeWrapper.state('selectedTab'), TABS.all, 'The component should display all users tab, as he was loaded without initial waiting users')
    assert.equal(countDisabled(HateoasIconAction, enzymeWrapper), size(allAccounts) * actionsByRow, 'The line actions should be disabled')
  })
})
