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
import { IngestDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import RequestOperationsMenuContainer from '../../src/containers/requests/RequestOperationsMenuContainer'
import HeaderActionsBarComponent from '../../src/components/HeaderActionsBarComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test HeaderActionsBarComponent
 * @author Simon MILHAU
 */
describe('[OAIS AIP MANAGEMENT] Testing HeaderActionsBarComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(HeaderActionsBarComponent)
  })
  it('should render correctly AIP pane', () => {
    const props = {
      paneType: IngestDomain.REQUEST_TYPES_ENUM.AIP,
      onModify: () => {},
      onDelete: () => {},
      onSelectVersionOption: () => {},
      onAbort: () => {},
      onRetry: () => {},
      areAllSelected: false,
      selectionMode: 'INCLUDE',
    }
    shallow(<HeaderActionsBarComponent {...props} />, { context })
  })
  it('should render correctly REQUESTS pane', () => {
    const props = {
      paneType: IngestDomain.REQUEST_TYPES_ENUM.REQUEST,
      onModify: () => {},
      onDelete: () => {},
      onSelectVersionOption: () => {},
      onAbort: () => {},
      onRetry: () => {},
      areAllSelected: false,
      selectionMode: 'INCLUDE',
    }
    const enzymeWrapper = shallow(<HeaderActionsBarComponent {...props} />, { context })
    const operationsContainer = enzymeWrapper.find(RequestOperationsMenuContainer)
    assert.lengthOf(operationsContainer, 1, 'RequestOperationsMenuContainer should be set')
    testSuiteHelpers.assertWrapperProperties(operationsContainer, {
      selectionMode: props.selectionMode,
      tableSelection: props.tableSelection,
      onSelectVersionOption: enzymeWrapper.instance().onSelectVersionOption,
      onRetrySelection: enzymeWrapper.instance().onRetry,
      onDeleteSelection: enzymeWrapper.instance().onDelete,
      onAbort: enzymeWrapper.instance().onAbort,
    }, 'Component should define the expected properties and callbacks')
  })
})
