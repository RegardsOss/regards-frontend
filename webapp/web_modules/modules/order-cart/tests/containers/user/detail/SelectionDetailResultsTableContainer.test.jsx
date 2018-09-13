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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SelectionDetailResultsTableComponent from '../../../../src/components/user/detail/SelectionDetailResultsTableComponent'
import { SelectionDetailResultsTableContainer } from '../../../../src/containers/user/detail/SelectionDetailResultsTableContainer'
import styles from '../../../../src/styles/styles'
import { mockBasket1, mockBasket2 } from '../../../BasketMocks'

const context = buildTestContext(styles)

/**
* Test SelectionDetailResultsTableContainer
* @author Raphaël Mechali
*/
describe('[Order Cart] Testing SelectionDetailResultsTableContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SelectionDetailResultsTableContainer)
  })
  it('shoud convert correctly selection to complex search request', () => {
    // 1 - convert null element
    const props = {
      resultsCount: 1,
      isFetching: false,
      selectionRequest: null,
    }
    const enzymeWrapper = shallow(<SelectionDetailResultsTableContainer {...props} />, { context })
    let componentWrapper = enzymeWrapper.find(SelectionDetailResultsTableComponent)
    assert.lengthOf(componentWrapper, 1, '1 - There should be the component')
    assert.deepEqual(componentWrapper.props().requestParams, enzymeWrapper.state().requestParams, '1 - state should be correctly reported')
    assert.deepEqual(componentWrapper.props().requestParams, {
      requests: [],
    }, '1 - request params should be correctly computed from null request (empty array)')
    // 2 - convert undefined element
    const props2 = {
      ...props,
      selectionRequest: undefined,
    }
    enzymeWrapper.setProps(props2)
    componentWrapper = enzymeWrapper.find(SelectionDetailResultsTableComponent)
    assert.lengthOf(componentWrapper, 1, '2 - There should be the component')
    assert.deepEqual(componentWrapper.props().requestParams, enzymeWrapper.state().requestParams, '2 - state should be correctly reported')
    assert.deepEqual(componentWrapper.props().requestParams, {
      requests: [],
    }, '2 - request params should be correctly computed from undefined request (empty array)')

    // 3 - convert exclusive selection with request
    const props3 = {
      ...props,
      selectionRequest: mockBasket2.datasetSelections[1].itemsSelections[0].selectionRequest,
    }
    enzymeWrapper.setProps(props3)
    componentWrapper = enzymeWrapper.find(SelectionDetailResultsTableComponent)
    assert.lengthOf(componentWrapper, 1, '3 - There should be the component')
    assert.deepEqual(componentWrapper.props().requestParams, enzymeWrapper.state().requestParams, '3 - state should be correctly reported')
    assert.deepEqual(componentWrapper.props().requestParams, {
      requests: [{
        engineType: 'quanard',
        datasetUrn: null,
        searchParameters: {
          q: '"tag:fake-tag-index1"',
        },
        entityIdsToInclude: null,
        entityIdsToExclude: ['URN:DATA:COUCOU2'],
        searchDateLimit: '2017-09-08T16:00:02.625Z',
      }],
    }, '3 - request params should be correctly computed from exclusive selection request')

    // 4 - convert inclusive selection (no request)
    const props4 = {
      ...props,
      selectionRequest: mockBasket2.datasetSelections[1].itemsSelections[1].selectionRequest,
    }
    enzymeWrapper.setProps(props4)
    componentWrapper = enzymeWrapper.find(SelectionDetailResultsTableComponent)
    assert.lengthOf(componentWrapper, 1, '4 - There should be the component')
    assert.deepEqual(componentWrapper.props().requestParams, enzymeWrapper.state().requestParams, '4 - state should be correctly reported')
    assert.deepEqual(componentWrapper.props().requestParams, {
      requests: [{
        engineType: 'quanard',
        datasetUrn: null,
        searchParameters: {},
        entityIdsToInclude: ['URN:DATA:COUCOU1', 'URN:DATA:COUCOU2', 'URN:DATA:COUCOU3'],
        entityIdsToExclude: null,
        searchDateLimit: '2017-09-08T16:00:37.545Z',
      }],
    }, '4 - request params should be correctly computed from inclusive selection request')

    // 5 -  all dataset data request
    const props5 = {
      ...props,
      selectionRequest: mockBasket1.datasetSelections[1].itemsSelections[0].selectionRequest,
    }
    enzymeWrapper.setProps(props5)
    componentWrapper = enzymeWrapper.find(SelectionDetailResultsTableComponent)
    assert.lengthOf(componentWrapper, 1, '5 - There should be the component')
    assert.deepEqual(componentWrapper.props().requestParams, enzymeWrapper.state().requestParams, '5 - state should be correctly reported')
    assert.deepEqual(componentWrapper.props().requestParams, {
      requests: [{
        engineType: 'qwoment',
        datasetUrn: 'TEST-DATASET:URN:2',
        searchParameters: {},
        entityIdsToInclude: null,
        entityIdsToExclude: null,
        searchDateLimit: '2017-09-08T16:00:02.625Z',
      }],
    }, '5 - request params should be correctly computed from dataset selection request')
  })
})
