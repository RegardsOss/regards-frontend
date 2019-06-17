/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { InfiniteTableContainer, TableColumnBuilder } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { InfiniteAIPTableContainer } from '../../../src/containers/aip/InfiniteAIPTableContainer'
import styles from '../../../src/styles'
import { storedAIP, deletedAIP } from '../../dumps/AIPWithStorages.dump'

const context = buildTestContext(styles)


/**
 * Test InfiniteAIPTableContainer
 * @author Raphaël Mechali
 */
describe('[ADMIN STORAGE AIP MANAGEMENT] Testing InfiniteAIPTableContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(InfiniteAIPTableContainer)
  })
  it('should render adapt correctly for InfiniteTableContainer', () => {
    const props = {
      pageSize: 20,
      columns: [new TableColumnBuilder('some.column').label('some').titleHeaderCell().valuesRenderCell(['any'])
        .build()],
      emptyComponent: <div />,
      currentFilters: {
        any: 'value',
      },
      entities: [storedAIP, deletedAIP],
      entitiesFetching: false,
      pageMetadata: {
        number: 0,
        size: 20,
        totalElements: 2,
      },
      flushEntities: () => {},
      fetchEntities: () => {},
      flushSelection: () => {},
    }
    const enzymeWrapper = shallow(<InfiniteAIPTableContainer {...props} />, { context })
    const tableWrapper = enzymeWrapper.find(InfiniteTableContainer)
    assert.lengthOf(tableWrapper, 1, 'There should be the corresponding infinite table')
    testSuiteHelpers.assertWrapperProperties(tableWrapper, {
      pageSize: props.pageSize,
      columns: props.columns,
      requestParams: props.currentFilters,
      entities: props.entities,
      entitiesCount: props.pageMetadata.totalElements,
      entitiesPageIndex: props.pageMetadata.number,
      entitiesFetching: props.entitiesFetching,
      emptyComponent: props.emptyComponent,

      flushEntities: props.flushEntities,
      fetchEntities: props.fetchEntities,
      flushSelection: props.flushSelection,
    }, 'Adapted table should receive the right properties')
  })
})
