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
import MenuItem from 'material-ui/MenuItem'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { TableSelectionModes, DropDownButton } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import RequestOperationsMenuComponent from '../../../src/components/requests/RequestOperationsMenuComponent'
import styles from '../../../src/styles'
import dependencies from '../../../src/dependencies'

const context = buildTestContext(styles)

/**
 * Test RequestOperationsMenuComponent
 * @author Raphaël Mechali
 */
describe('[OAIS AIP MANAGEMENT] Testing RequestOperationsMenuComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RequestOperationsMenuComponent)
  })

  const testCases = [{
    label: 'all options hidden (insufficient rights)',
    pageMeta: {
      number: 2,
      size: 20,
      totalElements: 116,
      totalPages: 6,
    },
    availableEndpoints: [],
    selectionMode: TableSelectionModes.excludeSelected,
    tableSelection: [],
    expectedOptions: [],
  }, {
    label: 'all options disabled on empty selection (and no right to show abort)',
    pageMeta: {
      number: 2,
      size: 20,
      totalElements: 116,
      totalPages: 6,
    },
    availableEndpoints: [
      dependencies.selectVersionModeDependency,
      dependencies.retryRequestDependency,
      dependencies.deleteRequestDependency],
    selectionMode: TableSelectionModes.includeSelected,
    tableSelection: [],
    expectedOptions: [ // minimal dependencies to allow all but abort all option
      { key: RequestOperationsMenuComponent.OPTIONS_DEF[0].intlKey, disabled: true }, // version option
      { key: RequestOperationsMenuComponent.OPTIONS_DEF[1].intlKey, disabled: true }, // retry option
      { key: RequestOperationsMenuComponent.OPTIONS_DEF[2].intlKey, disabled: true }, // delete option
    ],
  }, {
    label: 'all options enabled (infinite selection)',
    pageMeta: {
      number: 2,
      size: 20,
      totalElements: 116,
      totalPages: 6,
    },
    availableEndpoints: [ // minimal dependencies to allow all options
      dependencies.selectVersionModeDependency,
      dependencies.retryRequestDependency,
      dependencies.deleteRequestDependency,
      dependencies.abortRequestsDependency,
    ],
    selectionMode: TableSelectionModes.excludeSelected,
    tableSelection: [],
    expectedOptions: [
      { key: RequestOperationsMenuComponent.OPTIONS_DEF[0].intlKey, disabled: false }, // version option
      { key: RequestOperationsMenuComponent.OPTIONS_DEF[1].intlKey, disabled: false }, // retry option
      { key: RequestOperationsMenuComponent.OPTIONS_DEF[2].intlKey, disabled: false }, // delete option
      { key: RequestOperationsMenuComponent.OPTIONS_DEF[3].intlKey, disabled: false }, // abort all option (always enabled)
    ],
  }]

  testCases.forEach(({
    label, pageMeta, availableEndpoints,
    selectionMode, tableSelection, expectedOptions,
  }) => it(`should render ${label}`, () => {
    const props = {
      pageMeta,
      availableEndpoints,
      selectionMode,
      tableSelection,
      onSelectVersionOption: () => {},
      onRetrySelection: () => {},
      onDeleteSelection: () => {},
      onAbort: () => {},
    }
    const enzymeWrapper = shallow(<RequestOperationsMenuComponent {...props} />, { context })

    // 1 - check pop up button
    const optionsButton = enzymeWrapper.find(DropDownButton)
    if (expectedOptions.length) {
      // A - There is at least one option, button should be shown
      assert.lengthOf(optionsButton, 1, 'There should be options button')
      // check it is disabled when all options are
      if (!expectedOptions.some((opt) => !opt.disabled)) {
        assert.isTrue(optionsButton.props().disabled, 'Button should be disabled as there no enabled option')
      } else {
        assert.isFalse(optionsButton.props().disabled, 'Button should be enabled as there is at least one enabled option')
      }
      // check each option menu item
      const menuItems = optionsButton.find(MenuItem)
      assert.lengthOf(menuItems, expectedOptions.length, 'There should be an item for each expected option')
      expectedOptions.forEach(({ key, disabled }) => {
        const optionItem = menuItems.findWhere((m) => m.props().primaryText === key)
        assert.lengthOf(optionItem, 1, `There should be item for option "${key}"`)
        assert.equal(optionItem.props().disabled, disabled, `Disabled state should be correctly computed for option "${key}"`)
      })
    } else {
      // B - No option, button should be hidden
      assert.lengthOf(optionsButton, 0, 'There should not be options button as no option can be used with current rights')
    }
  }))
})
