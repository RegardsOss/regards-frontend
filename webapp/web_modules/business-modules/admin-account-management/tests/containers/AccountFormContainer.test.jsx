/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { AccountFormContainer } from '../../src/containers/AccountFormContainer'
import AccountFormComponent from '../../src/components/AccountFormComponent'

// Test a component rendering
describe('[ADMIN ACCOUNT MANAGEMENT] Testing account form container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccountFormContainer)
    assert.isDefined(AccountFormComponent)
  })
  it('should render self and subcomponents', () => {
    const props = {
      // from router
      params: {
        account_id: '1',
      },
      // from mapStateToProps
      account: DumpProvider.getFirstEntity('AdminClient', 'Account'),
      isFetching: false,
      // from mapDispatchToProps
      fetchAccount: () => { },
      updateAccount: () => { },
    }

    const enzymeWrapper = shallow(<AccountFormContainer {...props} />)
    const subComponent = enzymeWrapper.find(AccountFormComponent)
    expect(subComponent).to.have.length(1)
  })
})
