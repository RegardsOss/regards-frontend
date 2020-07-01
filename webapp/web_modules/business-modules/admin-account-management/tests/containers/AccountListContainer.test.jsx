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
import pickBy from 'lodash/pickBy'
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { AccountListContainer } from '../../src/containers/AccountListContainer'
import AccountListComponent from '../../src/components/AccountListComponent'

const allAccounts = {
  1: {
    content: {
      id: 1,
      lastName: 'last name',
      email: 'em@il.com',
      firstName: 'first icon',
      status: 'PENDING',
    },
  },
}
const waitingAccounts = pickBy(allAccounts, (account) => account.content.status === 'PENDING')

// Test a component rendering
describe('[ADMIN ACCOUNT MANAGEMENT] Testing account list container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccountListContainer)
  })

  it('should render self and subcomponents', () => {
    const props = {
      // from mapStateToProps
      allAccounts,
      waitingAccounts,
      isFetchingContent: false,
      // from mapDispatchToProps
      fetchAccountList: () => { },
      fetchWaitingAccountList: () => { },
      sendAcceptUser: () => { },
      sendRefuseUser: () => { },
      sendEnableUser: () => { },
      deleteAccount: () => { },
    }

    const enzymeWrapper = shallow(<AccountListContainer {...props} />)
    const subComponent = enzymeWrapper.find(AccountListComponent)
    expect(subComponent).to.have.length(1)
  })
})
