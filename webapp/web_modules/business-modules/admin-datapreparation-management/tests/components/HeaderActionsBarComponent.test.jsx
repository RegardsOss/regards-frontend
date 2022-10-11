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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import {
  TableColumnsVisibilityOption, TableSelectionModes,
} from '@regardsoss/components'
import HeaderActionsBarComponent from '../../src/components/HeaderActionsBarComponent'
import { tableSelectionData } from '../data/testData'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test HeaderActionsBarComponent
 * @author Théo Lasserre
 */
describe('[ADMIN DATAPREPARATION MANAGEMENT] Testing HeaderActionsBarComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(HeaderActionsBarComponent)
  })
  it('should render correctly', () => {
    const props = {
      columns: [],
      tableSelection: tableSelectionData,
      areAllSelected: false,
      selectionMode: TableSelectionModes.includeSelected,
      onDelete: () => {},
      onRetry: () => {},

      // table sorting, column visiblity & filters management
      requestParameters: {},
      onChangeColumnsVisibility: () => {},
    }
    const enzymeWrapper = shallow(<HeaderActionsBarComponent {...props} />, { context })
    const tableColumnsWrapper = enzymeWrapper.find(TableColumnsVisibilityOption)
    assert.lengthOf(tableColumnsWrapper, 1, 'There should be a TableColumnsVisibilityOption')
  })
})
