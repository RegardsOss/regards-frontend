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
import SessionsMonitoringProductsIngestedRenderer from '../../../../src/components/session/render/SessionsMonitoringProductsIngestedRenderer'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SessionsMonitoringProductsIngestedRenderer
 * @author Kévin Picart
 */
describe('[ADMIN DATA PROVIDER MANAGEMENT] Testing SessionsMonitoringProductsIngestedRenderer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SessionsMonitoringProductsIngestedRenderer)
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
            aip: {
              done: 599450,
              total: 599450,
              errors: 0,
              indexed: 599450,
              pending: 0,
            },
            sip: {
              total: 600000,
              errors: 1,
              invalid: 0,
              generatedAIP: 65,
            },
          },
        },
        links: [],
      },
      onClickRelaunchSIP: () => {},
      onClickListSIP: () => {},
    }
    const enzymeWrapper = shallow(<SessionsMonitoringProductsIngestedRenderer {...props} />, { context })
    const dropDownButton = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropDownButton, 1, 'There should be 1 DropDownButton')
  })
  it('should render correctly without sip', () => {
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
            aip: {
              done: 599450,
              total: 599450,
              errors: 0,
              indexed: 599450,
              pending: 0,
            },
          },
        },
        links: [],
      },
      onClickRelaunchSIP: () => {},
      onClickListSIP: () => {},
    }
    const enzymeWrapper = shallow(<SessionsMonitoringProductsIngestedRenderer {...props} />, { context })
    const dropDownButton = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropDownButton, 0, 'There should be 0 DropDownButton')
  })
})