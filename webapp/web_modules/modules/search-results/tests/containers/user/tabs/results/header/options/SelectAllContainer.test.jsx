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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { TableSelectAllOption } from '@regardsoss/components'
import { SelectAllContainer } from '../../../../../../../src/containers/user/tabs/results/header/options/SelectAllContainer'
import styles from '../../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SelectAllContainer
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing SelectAllContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SelectAllContainer)
  })
  it('should render correctly when there is no data', () => {
    const props = {
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      allSelected: false,
      pageMetadata: {
        number: 1,
        size: 20,
        totalElements: 0,
      },
      dispatchSelectAll: () => {},
      dispatchUnselectAll: () => {},
    }
    const enzymeWrapper = shallow(<SelectAllContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(TableSelectAllOption)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      disabled: true,
      allSelected: false,
      onToggleSelectAll: enzymeWrapper.instance().onToggleSelectAll,
    }, 'Component should define the expected properties')
  })
  it('should render correctly when all elements are selected', () => {
    const props = {
      tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
      allSelected: true,
      pageMetadata: {
        number: 1,
        size: 20,
        totalElements: 105,
      },
      dispatchSelectAll: () => {},
      dispatchUnselectAll: () => {},
    }
    const enzymeWrapper = shallow(<SelectAllContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(TableSelectAllOption)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      disabled: false,
      allSelected: true,
      onToggleSelectAll: enzymeWrapper.instance().onToggleSelectAll,
    }, 'Component should define the expected properties')
  })
  it('should render correctly when some elements are not selected', () => {
    const props = {
      tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
      allSelected: false,
      pageMetadata: {
        number: 1,
        size: 20,
        totalElements: 105,
      },
      dispatchSelectAll: () => {},
      dispatchUnselectAll: () => {},
    }
    const enzymeWrapper = shallow(<SelectAllContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(TableSelectAllOption)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      disabled: false,
      allSelected: false,
      onToggleSelectAll: enzymeWrapper.instance().onToggleSelectAll,
    }, 'Component should define the expected properties')
  })
})
