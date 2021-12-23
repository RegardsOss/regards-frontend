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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import {
  TableSelectionModes,
} from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import HeaderActionsBarComponent from '../../src/components/HeaderActionsBarComponent'
import { HeaderActionsBarContainer } from '../../src/containers/HeaderActionsBarContainer'
import { tableSelectionData } from '../data/testData'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test HeaderActionsBarContainer
 * @author Théo Lasserre
 */
describe('[ADMIN DATAPREPARATION MANAGEMENT] Testing HeaderActionsBarContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(HeaderActionsBarContainer)
  })
  it('should render correctly', () => {
    const props = {
      columns: [{}],
      onDelete: PropTypes.func.isRequired,
      onRetry: PropTypes.func.isRequired,

      // table sorting, column visiblity & filters management
      onRefresh: PropTypes.func.isRequired,
      onChangeColumnsVisibility: PropTypes.func.isRequired,

      // from mapStateToProps
      tableSelection: tableSelectionData,
      selectionMode: TableSelectionModes.includeSelected,
      areAllSelected: false,
    }
    const enzymeWrapper = shallow(<HeaderActionsBarContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(HeaderActionsBarComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      columns: props.columns,
      onRefresh: props.onRefresh,
      onChangeColumnsVisibility: props.onChangeColumnsVisibility,
      areAllSelected: props.areAllSelected,
      selectionMode: props.selectionMode,
      tableSelection: props.tableSelection,
      onDelete: props.onDelete,
      onRetry: props.onRetry,
    }, 'Component should define the expected properties')
  })
})
