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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { PageableInfiniteTableContainer, TableHeaderLineLoadingAndResults } from '@regardsoss/components'
import { CatalogDomain } from '@regardsoss/domain'
import { searchDataobjectsActions, searchDataobjectsSelectors } from '../../../../src/client/ComplexSearchClient'
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
  it('should render correctly', () => {
    const props = {
      pageActions: searchDataobjectsActions,
      pageSelectors: searchDataobjectsSelectors,
      bodyParams: {
        requests: [{
          engineType: CatalogDomain.LEGACY_SEARCH_ENGINE,
          datasetUrn: 'URN:DATASET:anything-for-test:V1',
          entityIdsToInclude: [],
          entityIdsToExclude: ['URN:DATA:any-data-for-test:V1'],
          searchParameters: { q: 'tag:shiny thing' },
          searchDateLimit: '2017-01-07T12:00:00Z',
        }],
      },
      resultsCount: 22,
      isFetching: true,
    }
    const enzymeWrapper = shallow(<SelectionDetailResultsTableComponent {...props} />, { context })
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, TableHeaderLineLoadingAndResults, {
      resultsCount: props.resultsCount,
      isFetching: props.isFetching,
    })
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, PageableInfiniteTableContainer, {
      pageActions: props.pageActions,
      pageSelectors: props.pageSelectors,
      columns: enzymeWrapper.instance().renderColumns(),
      bodyParams: props.bodyParams,
      emptyComponent: SelectionDetailResultsTableComponent.NO_DATA_COMPONENT,
      fetchUsingPostMethod: true,
    })
    const tableContainer = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(tableContainer, 1, 'There should be an infinite table to show results')
    assert.deepEqual(tableContainer.props().pathParams, props.pathParams)
  })
})
