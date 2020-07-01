/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import size from 'lodash/size'
import pickBy from 'lodash/pickBy'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { Table, TableRow } from 'material-ui/Table'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
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
  3: {
    content: {
      id: 2,
      firstName: 'first name',
      lastName: 'last name',
      email: 'em@il.com',
      status: 'INACTIVE',
    },
  },
}

const waitingAccounts = pickBy(allAccounts, (account) => account.content.status === 'PENDING')

const initialProps = {
  allAccounts: {},
  waitingAccounts: {},
  onAccept: () => { },
  onRefuse: () => { },
  onEnable: () => { },
  onEdit: () => { },
  onDelete: () => { },
  onBack: () => { },
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
    loadingDisplayers = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.equal(loadingDisplayers.length, 1, 'There should be a loading displayer')
    assert.isFalse(loadingDisplayers.at(0).props().isLoading, 'The loading displayer should not be visible after initial loading')
    tables = enzymeWrapper.find(Table)
    assert.equal(tables.length, 1, 'There should be the main table displayer, always!')
    tableRows = enzymeWrapper.find(TableRow)
    assert.equal(tableRows.length, 1 + size(waitingAccounts), 'There should be the header row plus one row for each waiting user')
    assert.equal(countDisabled('Connect(WithHateoasDisplayControl(IconButton))', enzymeWrapper), 1, 'All line options should be enabled except enable option')
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
    // expected disabled actions count:
    // 3 for active account (accept / refuse / active) +
    // 1 for pending account (enable) +
    // 2 for inactive account (accept / refuse) = 6
    assert.equal(countDisabled('Connect(WithHateoasDisplayControl(IconButton))', enzymeWrapper), 6, 'Accept and Refuse options should be disabled for accounts not in PENDING state')
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

    // 2.2 - change tab to show the waiting users
    enzymeWrapper.setState({ selectedTab: TABS.waiting })
    assert.equal(enzymeWrapper.find(TableRow).length, 1, 'There should be only the header row (no user)')
    assert.equal(enzymeWrapper.state('selectedTab'), TABS.waiting, 'The component should display waiting users tab after state change')
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

    // assertion all row actions (5 for each line) are disabled
    const actionsByRow = 5
    assert.equal(enzymeWrapper.state('selectedTab'), TABS.waiting, 'The component should display waiting users tab, as he was loaded with initial waiting users')
    assert.equal(countDisabled('Connect(WithHateoasDisplayControl(IconButton))', enzymeWrapper), size(waitingAccounts) * actionsByRow, 'The line actions should be disabled')

    // 2.2 - change tab to show all users and check the same
    enzymeWrapper.setState({ selectedTab: TABS.all })
    assert.equal(enzymeWrapper.state('selectedTab'), TABS.all, 'The component should display all users tab, as he was loaded without initial waiting users')
    assert.equal(countDisabled('Connect(WithHateoasDisplayControl(IconButton))', enzymeWrapper), size(allAccounts) * actionsByRow, 'The line actions should be disabled')
  })
})
