/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { TableSelectionModes } from '@regardsoss/components'
import RequestOperationsMenuComponent from '../../../src/components/requests/RequestOperationsMenuComponent'
import { RequestOperationsMenuContainer } from '../../../src/containers/requests/RequestOperationsMenuContainer'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test RequestOperationsMenuContainer
 * @author Raphaël Mechali
 */
describe('[OAIS AIP MANAGEMENT] Testing RequestOperationsMenuContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RequestOperationsMenuContainer)
  })
  it('should render correctly', () => {
    const props = {
      pageMeta: {
        number: 21,
        size: 50,
        totalElements: 5002,
        totalPages: 101,
      },
      selectionMode: TableSelectionModes.includeSelected,
      tableSelection: [],
      onSelectVersionOption: () => {},
      onRetrySelection: () => {},
      onDeleteSelection: () => {},
      onAbort: () => {},
      availableEndpoints: ['anything', 'one-more-anything'],
    }
    const enzymeWrapper = shallow(<RequestOperationsMenuContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(RequestOperationsMenuComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      pageMeta: props.pageMeta,
      availableEndpoints: props.availableEndpoints,
      selectionMode: props.selectionMode,
      tableSelection: props.tableSelection,
      onSelectVersionOption: props.onSelectVersionOption,
      onRetrySelection: props.onRetrySelection,
      onDeleteSelection: props.onDeleteSelection,
      onAbort: props.onAbort,
    }, 'Component should define the expected properties')
  })
})
