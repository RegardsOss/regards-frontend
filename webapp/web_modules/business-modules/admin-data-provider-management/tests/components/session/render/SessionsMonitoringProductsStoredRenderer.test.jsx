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
import { DropDownButton } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SessionsMonitoringProductsStoredRenderer from '../../../../src/components/session/render/SessionsMonitoringProductsStoredRenderer'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SessionsMonitoringProductsStoredRenderer
 * @author Kévin Picart
 */
describe('[ADMIN DATA PROVIDER MANAGEMENT] Testing SessionsMonitoringProductsStoredRenderer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SessionsMonitoringProductsStoredRenderer)
  })
  it('should render correctly', () => {
    const props = {
      entity: {
        content: {
          id: 9,
          name: 'Name',
          source: 'Source 3',
          creationDate: '2019-07-30T08:38:27.177Z',
          lastUpdateDate: '2019-07-30T08:38:27.184Z',
          isLatest: true,
          state: 'ERROR',
          lifeCycle: {
            oais: {
              products: 51234,
              products_gen_error: 0,
              products_gen_pending: 0,
              products_store_pending: 0,
              products_stored: 51234,
              products_store_error: 0,
              products_meta_store_pending: 0,
              products_meta_stored: 0,
              products_meta_store_error: 0,
            },
          },
        },
        links: [],
      },
      onRelaunchProductsOAIS: () => {},
      onViewProductsOAIS: () => {},
      onViewRequestsOAIS: () => {},
    }
    const enzymeWrapper = shallow(<SessionsMonitoringProductsStoredRenderer {...props} />, { context })
    const dropDownButton = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropDownButton, 1, 'There should be 1 DropDownButton')
  })
  it('should render correctly without aip', () => {
    const props = {
      entity: {
        content: {
          id: 9,
          name: 'Name',
          source: 'Source 3',
          creationDate: '2019-07-30T08:38:27.177Z',
          lastUpdateDate: '2019-07-30T08:38:27.184Z',
          isLatest: true,
          state: 'ERROR',
          lifeCycle: {},
        },
        links: [],
      },
      onRelaunchProductsOAIS: () => {},
      onViewProductsOAIS: () => {},
      onViewRequestsOAIS: () => {},
    }
    const enzymeWrapper = shallow(<SessionsMonitoringProductsStoredRenderer {...props} />, { context })
    const dropDownButton = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropDownButton, 0, 'There should be 0 DropDownButton')
  })
})
