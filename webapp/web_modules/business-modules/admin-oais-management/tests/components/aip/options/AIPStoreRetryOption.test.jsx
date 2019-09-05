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
import IconButton from 'material-ui/IconButton'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AIPStoreRetryOption from '../../../../src/components/aip/options/AIPStoreRetryOption'
import styles from '../../../../src/styles'
import { storedAIP } from '../../../dumps/AIPWithStorages.dump'


const context = buildTestContext(styles)

/**
 * Test AIPStoreRetryOption
 * @author Raphaël Mechali
 */
describe('[OAIS AIP MANAGEMENT] Testing AIPStoreRetryOption', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AIPStoreRetryOption)
  })
  it('should render and invoke callback correctly', () => {
    const spiedCallbackData = {
      count: 0,
      parameterValue: null,
    }
    const props = {
      entity: storedAIP,
      onRetry: (parameterValue) => {
        spiedCallbackData.count += 1
        spiedCallbackData.parameterValue = parameterValue
      },
    }
    const enzymeWrapper = shallow(<AIPStoreRetryOption {...props} />, { context })
    const iconButtonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(iconButtonWrapper, 1, 'There should be icon button')
    assert.equal(iconButtonWrapper.props().onClick, enzymeWrapper.instance().onClick, 'Callback should be correctly set')
    // check callback calls props callback
    assert.equal(spiedCallbackData.count, 0, 'Callback should not have been invoked yet')
    enzymeWrapper.instance().onClick()
    assert.equal(spiedCallbackData.count, 1, 'Callback should have been invoked once')
    assert.equal(spiedCallbackData.parameterValue, props.entity.content, 'Callback parameter should be valid')
  })
})
