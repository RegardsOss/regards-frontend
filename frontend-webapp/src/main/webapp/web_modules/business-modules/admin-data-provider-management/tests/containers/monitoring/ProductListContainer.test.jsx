/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import isFunction from 'lodash/isFunction'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ProductListComponent from '../../../src/components/monitoring/product/ProductListComponent'
import { ProductListContainer } from '../../../src/containers/monitoring/ProductListContainer'
import styles from '../../../src/styles/styles'

// mock router
const router = require('react-router')

const routerQuery = { state: 'ACQUIRING,COMPLETED' }

const context = buildTestContext(styles)

/**
* Test  ProductListContainer
* @author Sébastien Binda
*/
describe('[ADMIN DATA-PROVIDER MANAGEMENT] Testing ProductListContainer', () => {
  before(() => {
    // mocking router browser history
    router.browserHistory = {
      getCurrentLocation: () => ({ query: routerQuery, pathname: 'admin/test-project/data/acquisition/dataprovider/monitoring/chains/2/products' }),
    }
    testSuiteHelpers.before()
  })
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProductListContainer)
  })
  it('should render correctly', () => {
    const props = {
      params: {
        project: 'test-project',
        chainId: '2',
      },
      entitiesLoading: false,
      chain: {},
      fetchPage: sinon.spy(),
      fetchAcquisitionProcessingChain: sinon.spy(),
    }
    const enzymeWrapper = shallow(<ProductListContainer {...props} />, { context })
    const components = enzymeWrapper.find(ProductListComponent)
    assert.equal(components.length, 1, 'The ProductListComponent should be rendered')
    const component = components.at(0)
    assert.isTrue(props.fetchAcquisitionProcessingChain.called, 'At render, the fetchAcquisitionProcessingChain should be called')
    assert.equal(component.props().project, props.params.project, 'Invalid project param')
    assert.equal(component.props().chain, props.chain, 'Invalid chain param')
    assert.equal(component.props().initialFilters, routerQuery, 'Invalid initial query filters')
    assert.equal(component.props().contextFilters.chainId, props.params.chainId, 'Invalid context query filters')
    assert.isTrue(isFunction(component.props().onRefresh), 'Invalid onRefresh param')
    assert.isTrue(isFunction(component.props().onBack), 'Invalid onRefresh param')
    assert.equal(component.props().pageSize, ProductListContainer.PAGE_SIZE, 'Invalid pageSize param')
    assert.equal(component.props().resultsCount, 0, 'Invalid resultsCount param')
    assert.equal(component.props().entitiesLoading, false, 'Invalid entitiesLoading param')
  })
})
