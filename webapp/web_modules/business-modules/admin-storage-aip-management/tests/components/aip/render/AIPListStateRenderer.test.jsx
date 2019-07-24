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
import IconButton from 'material-ui/IconButton'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { StorageDomain } from '@regardsoss/domain'
import AIPListStateRenderer from '../../../../src/components/aip/render/AIPListStateRenderer'
import styles from '../../../../src/styles'
import { storedAIP } from '../../../dumps/AIPWithStorages.dump'


const context = buildTestContext(styles)

/**
 * Test AIPListStateRenderer
 * @author Raphaël Mechali
 */
describe('[ADMIN STORAGE AIP MANAGEMENT] Testing AIPListStateRenderer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AIPListStateRenderer)
  })
  it('should render correctly, showing detail button and using callback when entity is in STORAGE_ERROR status', () => {
    const spiedCallbackData = {
      count: 0,
      parameterValue: null,
    }
    const props = {
      entity: {
        ...storedAIP,
        content: {
          ...storedAIP.content,
          aip: {
            ...storedAIP.content.aip,
            state: StorageDomain.AIP_STATUS_ENUM.STORAGE_ERROR,
          },
        },
      },
      goToAipFiles: (parameterValue) => {
        spiedCallbackData.count += 1
        spiedCallbackData.parameterValue = parameterValue
      },
    }
    const enzymeWrapper = shallow(<AIPListStateRenderer {...props} />, { context })
    assert.include(enzymeWrapper.debug(), StorageDomain.AIP_STATUS_ENUM.STORAGE_ERROR, 'AIP state should be displayed')
    const buttonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be detail button as status is error')
    assert.equal(buttonWrapper.props().title, 'aips.files.table.tooltip.show-error-files', 'Button tooltip should be correctly internationalized')
    assert.equal(buttonWrapper.props().onClick, enzymeWrapper.instance().onClick, 'Button callback should be correctly set')
    // check callback calls props callback
    assert.equal(spiedCallbackData.count, 0, 'Callback should not have been invoked yet')
    buttonWrapper.props().onClick()
    assert.equal(spiedCallbackData.count, 1, 'Callback should have been invoked once')
    assert.equal(spiedCallbackData.parameterValue, props.entity.content, 'Callback parameter should be valid')
  })
  it('should render correctly, hiding detail button when entity is not in STORAGE_ERROR status', () => {
    const props = {
      entity: storedAIP,
      goToAipFiles: () => {},
    }
    const enzymeWrapper = shallow(<AIPListStateRenderer {...props} />, { context })
    assert.include(enzymeWrapper.debug(), props.entity.content.aip.state, 'AIP state should be displayed')
    const buttonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(buttonWrapper, 0, 'The detail button should be hidden')
  })
})
