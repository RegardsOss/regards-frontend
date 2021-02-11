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
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, SelectionDetailResultsTableComponent, {
      bodyParams: {
        requests: [],
      },
    }, '1 - There should be initially no converted basket selection request')
    // 2 - convert undefined element
    const props2 = {
      ...props,
      selectionRequest: undefined,
    }
    enzymeWrapper.setProps(props2)
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, SelectionDetailResultsTableComponent, {
      bodyParams: {
        requests: [],
      },
    }, '2 - There should be no converted request for undefined  selection')
    // 3 - convert exclusive selection with request
    const props3 = {
      ...props,
      selectionRequest: mockBasket2.datasetSelections[1].itemsSelections[0].selectionRequest,
    }
    enzymeWrapper.setProps(props3)
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, SelectionDetailResultsTableComponent, {
      bodyParams: {
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
      },
    }, '3 - Exclusive basket selection should be correctly converted in a complex search')

    // 4 - convert inclusive selection (no request)
    const props4 = {
      ...props,
      selectionRequest: mockBasket2.datasetSelections[1].itemsSelections[1].selectionRequest,
    }
    enzymeWrapper.setProps(props4)
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, SelectionDetailResultsTableComponent, {
      bodyParams: {
        requests: [{
          engineType: 'quanard',
          datasetUrn: null,
          searchParameters: {},
          entityIdsToInclude: ['URN:DATA:COUCOU1', 'URN:DATA:COUCOU2', 'URN:DATA:COUCOU3'],
          entityIdsToExclude: null,
          searchDateLimit: '2017-09-08T16:00:37.545Z',
        }],
      },
    }, '4 - Inclusive basket selection should be correctly converted in a complex search')

    // 5 -  all dataset data request
    const props5 = {
      ...props,
      selectionRequest: mockBasket1.datasetSelections[1].itemsSelections[0].selectionRequest,
    }
    enzymeWrapper.setProps(props5)
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, SelectionDetailResultsTableComponent, {
      bodyParams: {
        requests: [{
          engineType: 'qwoment',
          datasetUrn: 'TEST-DATASET:URN:2',
          searchParameters: {},
          entityIdsToInclude: null,
          entityIdsToExclude: null,
          searchDateLimit: '2017-09-08T16:00:02.625Z',
        }],
      },
    }, '5 - By dataset basket selection should be correctly converted in a complex search')
  })
})
