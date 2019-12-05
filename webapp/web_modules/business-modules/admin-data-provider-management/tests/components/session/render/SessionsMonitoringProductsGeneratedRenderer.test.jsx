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
import Play from 'material-ui/svg-icons/av/play-arrow'
import { DropDownButton } from '@regardsoss/components'
import SessionsMonitoringProductsGeneratedRenderer from '../../../../src/components/session/render/SessionsMonitoringProductsGeneratedRenderer'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SessionsMonitoringProductsGeneratedRenderer
 * @author Kévin Picart
 */
describe('[ADMIN DATA PROVIDER MANAGEMENT] Testing SessionsMonitoringProductsGeneratedRenderer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SessionsMonitoringProductsGeneratedRenderer)
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
              done: 599450,
              total: 599450,
              errors: 0,
              indexed: 599450,
              pending: 0,
            },
            catalog: {
              indexed: 0,
              indexedError: 0,
            },
            dataprovider: {
              generated: 5054876,
              generation_error: 0,
              state: 'DONE',
              incomplete: 0,
            },
          },
        },
        links: [],
      },
      onDeleteProducts: () => {},
      onRelaunchProducts: () => {},
      onShowProducts: () => {},
    }
    const enzymeWrapper = shallow(<SessionsMonitoringProductsGeneratedRenderer {...props} />, { context })
    const play = enzymeWrapper.find(Play)
    assert.lengthOf(play, 0, 'There should be 0 Play button if not running')
    const dropDownButton = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropDownButton, 0, 'There should be 0 DropDownButton')
  })
  it('should render correctly without products', () => {
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
      onRelaunchProducts: () => {},
      onDeleteProducts: () => {},
      onShowProducts: () => {},
    }
    const enzymeWrapper = shallow(<SessionsMonitoringProductsGeneratedRenderer {...props} />, { context })
    const play = enzymeWrapper.find(Play)
    assert.lengthOf(play, 0, 'There should be 0 Play button if not running')
    const dropDownButton = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropDownButton, 0, 'There should be 0 DropDownButton')
  })
})
