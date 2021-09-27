/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import { accountActions, accountSelectors } from '../../src/clients/AccountClient'
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
      origin: 'Origin1',
      project: 'Project1',
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
      allAccounts,
      waitingAccounts,
      isFetching: false,
      pageMeta: {
        number: 1,
        size: 20,
        totalElements: 20,
      },
      origins: [],
      projects: {},
      // from mapDispatchToProps
      fetchAccountList: () => { },
      fetchWaitingAccountList: () => { },
      sendAcceptUser: () => { },
      sendRefuseUser: () => { },
      sendEnableUser: () => { },
      deleteAccount: () => { },
      clearSelection: () => { },
      fetchOrigins: () => { },
      throwError: () => { },
      fetchProjects: () => { },
    }

    const enzymeWrapper = shallow(<AccountListContainer {...props} />)
    const subComponent = enzymeWrapper.find(TableFilterSortingAndVisibilityContainer)
    assert.lengthOf(subComponent, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(subComponent, {
      pageActions: accountActions,
      pageSelectors: accountSelectors,
      defaultFiltersState: AccountListComponent.DEFAULT_FILTERS_STATE,
      onAccept: enzymeWrapper.instance().onAccept,
      onRefuse: enzymeWrapper.instance().onRefuse,
      onEnable: enzymeWrapper.instance().onEnable,
      onDelete: enzymeWrapper.instance().onDelete,
    }, 'Component should define the expected properties and callbacks')
  })
})
