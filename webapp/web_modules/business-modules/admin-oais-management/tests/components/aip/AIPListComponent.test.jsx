/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import AIPListComponent from '../../../src/components/aip/AIPListComponent'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test AIPListComponent
 * @author Raphaël Mechali
 */
describe('[OAIS AIP MANAGEMENT] Testing AIPListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AIPListComponent)
  })
  it('should render correctly', () => {
    const props = {
      pageSize: 20,
      resultsCount: 70,
      entitiesLoading: false,
      isEmptySelection: false,
      tags: ['tag1', 'tag2'],
      searchingTags: false,
      sessionTags: ['sTag1', 'sTag2'],
      searchingSessionTags: false,
      currentFilters: { any: 'ok' },
      requestParameters: {},

      dataStorages: [],
      columnsSorting: [{
        columnKey: 'column.providerId',
        order: 'ASCENDING_ORDER',
      }],

      onSort: () => {},
      onGoToSIP: () => {},
      onGoBack: () => {},
      onRefresh: () => {},
      onRetryAIPStorage: () => {},
      onApplyFilters: () => {},
      goToAipFiles: () => {},
      fetchCommonTags: () => {},
      addTags: () => {},
      removeTags: () => {},
    }
    shallow(<AIPListComponent {...props} />, { context })
  })
})
