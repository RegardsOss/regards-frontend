/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { PageableInfiniteTableContainer } from '@regardsoss/components'
import { ProductListComponent } from '../../../../src/components/monitoring/product/ProductListComponent'
import ProducListFiltersComponent from '../../../../src/components/monitoring/product/ProducListFiltersComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test ProductListComponent
* @author Sébastien Binda
*/
describe('[ Module name] Testing ProductListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProductListComponent)
  })
  it('should render correctly', () => {
    const props = {
      project: 'test-project',
      chain: DumpProvider.getFirstEntity('DataProviderClient', 'AcquisitionProcessingChain'),
      initialFilters: {},
      contextFilters: { chainId: '12' },
      pageSize: 100,
      resultsCount: 10,
      entitiesLoading: false,
      onRefresh: () => new Promise(() => { }),
      onBack: () => new Promise(() => { }),
    }
    const enzymeWrapper = shallow(<ProductListComponent {...props} />, { context })
    const filters = enzymeWrapper.find(ProducListFiltersComponent)
    assert.equal(filters.length, 1, 'The filters should be rendered')
    const tables = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.equal(tables.length, 1, 'The PageableInfiniteTableContainer should be rendered')
    const table = tables.at(0)
    // As the ProducListFiltersComponent is not mounted by shallow, the initialFilters are not applyed
    let expectedRequestParams = props.contextFilters
    assert.equal(table.props().queryPageSize, props.pageSize, 'Table queryPageSize invalid')
    assert.deepEqual(table.props().requestParams, expectedRequestParams, 'Table requestParams invalid')
    // Simulate new filters applied by the subcomponent ProducListFiltersComponent
    const newFilters = { newFilter: 'value', state: 'TERMINATED' }
    enzymeWrapper.instance().applyFilters(newFilters, () => {
      enzymeWrapper.update()
      const updatedTable = enzymeWrapper.find(PageableInfiniteTableContainer).at(0)
      expectedRequestParams = {
        ...props.contextFilters,
        ...newFilters,
      }
      assert.deepEqual(updatedTable.props().requestParams, expectedRequestParams, 'Table requestParams invalid after filters update')
    })
  })
})
