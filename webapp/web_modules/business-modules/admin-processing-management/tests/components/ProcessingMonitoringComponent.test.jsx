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
import { testSuiteHelpers, buildTestContext, DumpProvider } from '@regardsoss/tests-helpers'
import {
  CardActionsComponent,
  PageableInfiniteTableContainer,
  TableColumnBuilder,
} from '@regardsoss/components'
import ProcessingMonitoringComponent from '../../src/components/ProcessingMonitoringComponent'
import ProcessingMonitoringFiltersComponent from '../../src/components/monitoring/ProcessingMonitoringFiltersComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Tests for ProcessingMonitoringComponent
 * @author Théo Lasserre
 */
describe('[ADMIN PROCESSING MANAGEMENT] Testing ProcessingMonitoring component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exist', () => {
    assert.isDefined(ProcessingMonitoringComponent)
    assert.isDefined(CardActionsComponent)
    assert.isDefined(ProcessingMonitoringFiltersComponent)
    assert.isDefined(PageableInfiniteTableContainer)
  })

  it('should render correctly', () => {
    const props = {
      project:'test',
      processingList: DumpProvider.get('ProcessingMonitoringClient', 'ProcessingMonitoring'),
      onRefresh: () => { },
      backUrl: '#',
      entitiesLoading:   false,
      resultsCount: 0,
    }

    const wrapper = shallow(
      <ProcessingMonitoringComponent {...props} />,
      { context },
    )

    // Check table
    const table = wrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(table, 1, 'There should be a table')
    // Check columns
    const { columns = [] } = table.props()
    const expectedColumnsKey = [
      'column.processName',
      'column.userName',
      'column.created',
      'column.status',
      TableColumnBuilder.optionsColumnKey,
    ]
    expectedColumnsKey.forEach((key) => {
      const foundColumn = columns.find((c) => c.key === key)
      assert.isOk(foundColumn, `Expected column ${key} not found`)
    })

    // Check Filters component
    const filters = wrapper.find(ProcessingMonitoringFiltersComponent)
    assert.lengthOf(filters, 1, 'There should be filters')
    assert.equal(filters.props().onRefresh, props.onRefresh, 'Function onRefresh should be correctly passed')
    assert.equal(filters.props().processingList, props.processingList, 'processingList should be correctly passed')

    // Check for buttons
    const cardActionsWrapper = wrapper.find(CardActionsComponent)
    assert.lengthOf(cardActionsWrapper, 1, 'There should have a card action component')
    testSuiteHelpers.assertWrapperProperties(cardActionsWrapper, {
      secondaryButtonLabel: 'processing.management.list.cancel.button',
      secondaryButtonUrl: props.backUrl,
    })
  })
})
