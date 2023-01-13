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
import { IngestDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { HeaderActionsBarContainer } from '../../src/containers/HeaderActionsBarContainer'
import styles from '../../src/styles'
import HeaderActionsBarComponent from '../../src/components/HeaderActionsBarComponent'

const context = buildTestContext(styles)

/**
 * Test HeaderActionsBarContainer
 * @author Simon MILHAU
 */
describe('[OAIS AIP MANAGEMENT] Testing HeaderActionsBarContainer', () => {
  before(() => {
    testSuiteHelpers.before()
  })
  after(() => {
    testSuiteHelpers.after()
  })

  it('should exists', () => {
    assert.isDefined(HeaderActionsBarContainer)
  })
  it('should render correctly', () => {
    const props = {
      paneType: IngestDomain.REQUEST_TYPES_ENUM.AIP,
      onModify: () => {},
      onDelete: () => {},
      onSelectVersionOption: () => {},
      onAbort: () => {},
      onRetry: () => {},
      tableSelection: [],
      selectionMode: 'INCLUDE',
      areAllSelected: false,
    }
    const enzymeWrapper = shallow(<HeaderActionsBarContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(HeaderActionsBarComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      areAllSelected: props.areAllSelected,
      selectionMode: props.selectionMode,
      tableSelection: props.tableSelection,
      onModify: props.onModify,
      onRetry: props.onRetry,
      onDelete: props.onDelete,
      onAbort: props.onAbort,
      onSelectVersionOption: props.onSelectVersionOption,
      paneType: props.paneType,
    }, 'Component should define the expected properties and callbacks')
  })
})
