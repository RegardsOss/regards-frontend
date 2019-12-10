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
import AIPDetailOption from '../../../src/components/packages/AIPDetailOption'
import styles from '../../../src/styles'
import { storedAIP } from '../../dumps/AIPWithStorages.dump'
import MenuItem from 'material-ui/MenuItem/MenuItem'

const context = buildTestContext(styles)

/**
 * Test AIPDetailOption
 * @author Simon MILHAU
 */
describe('[OAIS AIP MANAGEMENT] Testing AIPDetailOption', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AIPDetailOption)
  })
  it('should render and invoke callback correctly', () => {
    const spiedCallbackData = {
      count: 0,
      parameterValue: storedAIP,
    }
    const props = {
      entity: storedAIP,
      onViewDetail: () => { spiedCallbackData.count += 1 },
    }
    const enzymeWrapper = shallow(<AIPDetailOption {...props} />, { context })
    const iconButtonWrapper = enzymeWrapper.find(MenuItem)
    // const confirmButton = enzymeWrapper.findWhere(n => n.props().onClick === enzymeWrapper.instance().onDelete)
    assert.lengthOf(iconButtonWrapper, 2, 'There should be 2 menu item')
    assert.equal(iconButtonWrapper.at(0).props().onClick, enzymeWrapper.instance().onViewAipDetail, 'Callback should be correctly set')
    assert.equal(iconButtonWrapper.at(1).props().onClick, enzymeWrapper.instance().onViewSipDetail, 'Callback should be correctly set')
    // check callback calls props callback
    assert.equal(spiedCallbackData.count, 0, 'Callback should not have been invoked yet')
    iconButtonWrapper.at(0).props().onClick()
    iconButtonWrapper.at(1).props().onClick()

    assert.equal(spiedCallbackData.count, 2, 'Callback should have been invoked once')
    assert.equal(spiedCallbackData.parameterValue, props.entity, 'Callback parameter should be valid')
  })
})
