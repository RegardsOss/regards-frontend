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
import AIPListNbFilesColumnRenderer from '../../../../src/components/aip/render/AIPListNbFilesColumnRenderer'
import styles from '../../../../src/styles'
import { storedAIP } from '../../../dumps/AIPWithStorages.dump'


const context = buildTestContext(styles)

/**
 * Test AIPListNbFilesColumnRenderer
 * @author Raphaël Mechali
 */
describe('[ADMIN STORAGE AIP MANAGEMENT] Testing AIPListNbFilesColumnRenderer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AIPListNbFilesColumnRenderer)
  })
  it('should render and invoke callback correctly', () => {
    const spiedCallbackData = {
      count: 0,
      parameterValue: null,
    }
    const props = {
      value: storedAIP.content,
      handleClick: (parameterValue) => {
        spiedCallbackData.count += 1
        spiedCallbackData.parameterValue = parameterValue
      },
    }
    const enzymeWrapper = shallow(<AIPListNbFilesColumnRenderer {...props} />, { context })
    const mainCompWrapper = enzymeWrapper.find('span')
    assert.lengthOf(mainCompWrapper, 1, 'There should be main component')
    assert.equal(mainCompWrapper.props().onClick, enzymeWrapper.instance().onClick, 'Callback should be correctly set')
    assert.include(mainCompWrapper.debug(), '1', 'File number should be shown')
    // check callback calls props callback
    assert.equal(spiedCallbackData.count, 0, 'Callback should not have been invoked yet')
    mainCompWrapper.props().onClick()
    assert.equal(spiedCallbackData.count, 1, 'Callback should have been invoked once')
    assert.equal(spiedCallbackData.parameterValue, props.value, 'Callback parameter should be valid')
  })
})
