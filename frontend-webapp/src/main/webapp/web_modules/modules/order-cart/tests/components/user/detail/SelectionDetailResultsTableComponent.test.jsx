

/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { PageableInfiniteTableContainer } from '@regardsoss/components'
import SelectionDetailResultsTableComponent from '../../../../src/components/user/detail/SelectionDetailResultsTableComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test SelectionDetailResultsTableComponent
* @author Raphaël Mechali
*/
describe('[Order Cart] Testing SelectionDetailResultsTableComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SelectionDetailResultsTableComponent)
  })
  it('should render correctly and link page size with available height', () => {
    const props = {
      openSearchRequest: 'mamie=nova',
      availableHeight: 150,
    }
    const renderWrapper = shallow(<SelectionDetailResultsTableComponent {...props} />, { context })
    const tableContainer = renderWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(tableContainer, 1, 'There should be an infinite table to show results')
    assert.deepEqual(tableContainer.props().requestParams, { queryParams: props.openSearchRequest })
  })
})
