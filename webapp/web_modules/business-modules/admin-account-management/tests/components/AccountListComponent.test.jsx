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
import { assert } from 'chai'
import IconButton from 'material-ui/IconButton'
import {
  TableFilterSortingAndVisibilityAndChipsComponent, CardHeaderActions,
  HelpMessageComponent,
} from '@regardsoss/components'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { accountActions, accountSelectors } from '../../src/clients/AccountClient'
import { filtersActions, filtersSelectors } from '../../src/clients/FiltersClient'
import AccountListComponent from '../../src/components/AccountListComponent'
import AccountFiltersComponent from '../../src/components/filters/AccountFiltersComponent'
import AccountTableListComponent from '../../src/components/AccountTableListComponent'
import { FILTERS_I18N } from '../../src/domain/filters'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

// Test a component rendering
describe('[ADMIN ACCOUNT MANAGEMENT] Testing account list component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccountListComponent)
  })
  it('should render correctly', () => {
    const props = {
      allAccounts: {},
      waitingAccounts: {},
      isFetching: true,
      onAccept: () => { },
      onRefuse: () => { },
      onEnable: () => { },
      onEdit: () => { },
      onDelete: () => { },
      onBack: () => { },
      isFetchingActions: false,
      onRefresh: () => { },
      origins: [],
      projects: {},
      onFilterWaitingAccount: () => {},
    }
    const enzymeWrapper = shallow(<AccountListComponent {...props} />, { context })
    const headerComponent = enzymeWrapper.find(CardHeaderActions)
    assert.lengthOf(headerComponent, 1, 'CardHeaderActions should be set')
    testSuiteHelpers.assertWrapperProperties(headerComponent, {
      mainButtonClick: enzymeWrapper.instance().onRefresh,
      secondaryButtonClick: enzymeWrapper.instance().handleFiltersPane,
      thirdButtonClick: props.onBack,
    })
    const iconButton = enzymeWrapper.find(IconButton)
    assert.lengthOf(iconButton, 1, 'IconButton should be set')
    const helpMessageComponent = enzymeWrapper.find(HelpMessageComponent)
    assert.lengthOf(helpMessageComponent, 1, 'HelpMessageComponent should be set')
    const tableVisibilityComponent = enzymeWrapper.find(TableFilterSortingAndVisibilityAndChipsComponent)
    assert.lengthOf(tableVisibilityComponent, 1, 'TableFilterSortingAndVisibilityAndChipsComponent should be set')
    testSuiteHelpers.assertWrapperProperties(tableVisibilityComponent, {
      pageActions: accountActions,
      pageSelectors: accountSelectors,
      onAccept: props.onAccept,
      onRefuse: props.onRefuse,
      onEnable: props.onEnable,
      onDelete: props.onDelete,
      updateRefreshParameters: enzymeWrapper.instance().updateRefreshParameters,
      filtersActions,
      filtersSelectors,
      filtersI18n: FILTERS_I18N,
    }, 'Component should define the expected properties and callbacks')
    const filterComponent = enzymeWrapper.find(AccountFiltersComponent)
    assert.lengthOf(filterComponent, 1, 'AccountFiltersComponent should be set')
    testSuiteHelpers.assertWrapperProperties(filterComponent, {
      isPaneOpened: enzymeWrapper.instance().state.isPaneOpened,
      onCloseFiltersPane: enzymeWrapper.instance().handleFiltersPane,
      origins: props.origins,
      projects: props.projects,
    }, 'Component should define the expected properties and callbacks')
    const tableComponent = enzymeWrapper.find(AccountTableListComponent)
    assert.lengthOf(tableComponent, 1, 'AccountTableListComponent should be set')
    testSuiteHelpers.assertWrapperProperties(tableComponent, {
      allAccounts: props.allAccounts,
      isFetchingActions: props.isFetchingActions,
      isFetching: props.isFetching,
      onEdit: props.onEdit,
    }, 'Component should define the expected properties and callbacks')
  })
})
