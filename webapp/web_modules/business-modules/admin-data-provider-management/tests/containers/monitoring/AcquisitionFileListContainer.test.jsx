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
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import isFunction from 'lodash/isFunction'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import AcquisitionFileListComponent from '../../../src/components/monitoring/acquisitionFile/AcquisitionFileListComponent'
import { AcquisitionFileListContainer } from '../../../src/containers/monitoring/AcquisitionFileListContainer'
import styles from '../../../src/styles/styles'

// mock router
const router = require('react-router')

const routerQuery = { state: 'IN_PROGRESS' }

const context = buildTestContext(styles)

/**
* Test  AcquisitionFileListContainer
* @author Sébastien Binda
*/
describe('[ADMIN DATA-PROVIDER MANAGEMENT] Testing  AcquisitionFileListContainer', () => {
  before(() => {
    // mocking router browser history
    router.browserHistory = {
      getCurrentLocation: () => ({ query: routerQuery, pathname: 'admin/test-project/data/acquisition/dataprovider/monitoring/chains/2/files' }),
    }
    testSuiteHelpers.before()
  })
  after(() => {
    delete router.browserHistory
    testSuiteHelpers.after()
  })

  it('should exists', () => {
    assert.isDefined(AcquisitionFileListContainer)
  })
  it('should render correctly', () => {
    const props = {
      params: {
        project: 'test-project',
        chainId: '2',
        productId: '12',
      },
      chain: DumpProvider.getFirstEntity('DataProviderClient', 'AcquisitionProcessingChain'),
      product: DumpProvider.getFirstEntity('DataProviderClient', 'Product'),
      entitiesLoading: false,
      fetchPage: sinon.stub().callsFake(() => new Promise(() => { })),
      fetchChain: sinon.stub().callsFake(() => new Promise(() => { })),
      fetchProduct: sinon.stub().callsFake(() => new Promise(() => { })),
    }
    const enzymeWrapper = shallow(<AcquisitionFileListContainer {...props} />, { context })
    const components = enzymeWrapper.find(AcquisitionFileListComponent)
    assert.equal(components.length, 1, 'The AcquisitionFileListComponent should be rendered')
    const component = components.at(0)
    assert.isFalse(props.fetchPage.called, 'At render, the fetchPage should not be called')
    assert.equal(component.props().initialFilters, routerQuery, 'Invalid initial query filters')
    assert.equal(component.props().contextFilters.chainId, props.params.chainId, 'Invalid context query filters')
    assert.isTrue(isFunction(component.props().onRefresh), 'Invalid onRefresh param')
    assert.isTrue(isFunction(component.props().onBackToProducts), 'Invalid onBackToProducts param')
    assert.isTrue(isFunction(component.props().onBackToChains), 'Invalid onRefresh param')
    assert.equal(component.props().pageSize, AcquisitionFileListContainer.PAGE_SIZE, 'Invalid pageSize param')
    assert.equal(component.props().resultsCount, 0, 'Invalid resultsCount param')
    assert.equal(component.props().entitiesLoading, false, 'Invalid entitiesLoading param')
  })
})
