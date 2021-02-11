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
import IconButton from 'material-ui/IconButton'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import DuplicatedObjectsMessageComponents from '../../../../src/components/user/options/DuplicatedObjectsMessageComponents'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test DuplicatedObjectsMessageComponents
 * @author Raphaël Mechali
 */
describe('[Order Cart] Testing DuplicatedObjectsMessageComponents', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DuplicatedObjectsMessageComponents)
  })
  it('should hide itselft while effective count === total count', () => {
    const props = {
      totalObjectsCount: 0,
      effectiveObjectsCount: 0,
      onShowDuplicatedMessage: () => { },
    }
    const enzymeWrapper = shallow(<DuplicatedObjectsMessageComponents {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(IconButton), 0, 'With 0/0, button should be hidden')
    enzymeWrapper.setProps({
      totalObjectsCount: 15,
      effectiveObjectsCount: 15,
    })
    assert.lengthOf(enzymeWrapper.find(IconButton), 0, 'With N/N, button should be hidden')
  })
  it('should show itselft when effective count < total count and render correctly', () => {
    const spiedCallbackData = {}
    const props = {
      totalObjectsCount: 15,
      effectiveObjectsCount: 2,
      onShowDuplicatedMessage: (total, effective) => {
        spiedCallbackData.total = total
        spiedCallbackData.effective = effective
      },
    }
    const enzymeWrapper = shallow(<DuplicatedObjectsMessageComponents {...props} />, { context })
    // check button
    const buttonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(buttonWrapper, 1, 'With 2/15, button should be visible')
    assert.lengthOf(enzymeWrapper.find(IconButton), 1, 'With 2/15, button should be visible')
    assert.isDefined(buttonWrapper.props().style, 'Button style shoud be configured')
    assert.isDefined(buttonWrapper.props().children, 'Button child icon shoud be configured')
    assert.equal(buttonWrapper.props().onClick, enzymeWrapper.instance().onShowMessage, 'Button child icon shoud be configured')
    // check parent callback is invoked with right parameters (total, effective)
    buttonWrapper.props().onClick()
    assert.equal(spiedCallbackData.total, props.totalObjectsCount, 'Total count should have been provided to parent')
    assert.equal(spiedCallbackData.effective, props.effectiveObjectsCount, 'Total count should have been provided to parent')
  })
})
