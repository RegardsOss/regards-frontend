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
import { testSuiteHelpers, buildTestContext, DumpProvider } from '@regardsoss/tests-helpers'
import { processingDependencies } from '@regardsoss/admin-processing-management'
import {
  CardActionsComponent,
  InfiniteTableContainer, TableColumnBuilder,
} from '@regardsoss/components'
import ProcessingListFiltersComponent from '../../src/components/ProcessingListFiltersComponent'
import ProcessingListComponent from '../../src/components/ProcessingListComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Tests for ProcessingListComponent
 * @author Théo Lasserre
 */
describe('[ADMIN PROCESSING MANAGEMENT] Testing Processing list component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProcessingListComponent)
    assert.isDefined(CardActionsComponent)
    assert.isDefined(InfiniteTableContainer)
    assert.isDefined(ProcessingListFiltersComponent)
  })

  it('should render correctly without elements', () => {
    const props = {
      processingList: [],
      handleDelete: () => { },
      handleEdit: () => { },
      createUrl: '#',
      onRefresh: () => { },
      backUrl: '#',
      navigateToCreateProcessing: () => { },
      processingDependencies: true,
    }

    const wrapper = shallow(
      <ProcessingListComponent {...props} />,
      { context },
    )

    // Check table
    const table = wrapper.find(InfiniteTableContainer)
    assert.lengthOf(table, 1, 'There should be a table')
    assert.isEmpty(table.props().entities, 'There should be no entity in table')
    // Check columns
    const { columns = [] } = table.props()
    const expectedColumnsKeys = [
      'column.processName',
      'column.userRole',
      TableColumnBuilder.optionsColumnKey,
    ]
    expectedColumnsKeys.forEach((key) => {
      const foundColumn = columns.find((c) => c.key === key)
      assert.isOk(foundColumn, `Expected column ${key} not found`)
    })

    // Check Filter component
    const filters = wrapper.find(ProcessingListFiltersComponent)
    assert.lengthOf(filters, 1, 'There should be filters')

    // Check for buttons
    const cardActionsWrapper = wrapper.find(CardActionsComponent)
    assert.lengthOf(cardActionsWrapper, 1, 'There should be the card actions')
    testSuiteHelpers.assertWrapperProperties(cardActionsWrapper, {
      mainButtonUrl: props.createUrl,
      mainButtonLabel: 'processing.management.list.add.button',
      mainHateoasDependencies: processingDependencies.addProcessingDependencies,
      secondaryButtonLabel: 'processing.management.list.cancel.button',
      secondaryButtonUrl: props.backUrl,
    })
  })

  it('should render correctly with elements', () => {
    const props = {
      processingList: [DumpProvider.getFirstEntity('ProcessingClient', 'Processing')],
      handleDelete: () => { },
      handleEdit: () => { },
      createUrl: '#',
      onRefresh: () => { },
      backUrl: '#',
      navigateToCreateProcessing: () => { },
    }

    const wrapper = shallow(
      <ProcessingListComponent {...props} />,
      { context },
    )

    // Check table
    const table = wrapper.find(InfiniteTableContainer)
    assert.lengthOf(table, 1, 'There should be a table')
    assert.equal(table.props().entities, props.processingList, 'Processings should be correctly displayed')
    // Check columns
    const { columns = [] } = table.props()
    const expectedColumnsKeys = [
      'column.processName',
      'column.userRole',
      TableColumnBuilder.optionsColumnKey,
    ]
    expectedColumnsKeys.forEach((key) => {
      const foundColumn = columns.find((c) => c.key === key)
      assert.isOk(foundColumn, `Expected column ${key} not found`)
    })

    // Check Filter component
    const filters = wrapper.find(ProcessingListFiltersComponent)
    assert.lengthOf(filters, 1, 'There should be filters')

    // Check for buttons
    const cardActionsWrapper = wrapper.find(CardActionsComponent)
    assert.lengthOf(cardActionsWrapper, 1, 'There should be the card actions')
    testSuiteHelpers.assertWrapperProperties(cardActionsWrapper, {
      mainButtonUrl: props.createUrl,
      mainButtonLabel: 'processing.management.list.add.button',
      mainHateoasDependencies: processingDependencies.addProcessingDependencies,
      secondaryButtonLabel: 'processing.management.list.cancel.button',
      secondaryButtonUrl: props.backUrl,
    })
  })
})
