/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import MainBarNavigationItem from '../../../../../src/components/user/navigation/bar/MainBarNavigationItem'
import styles from '../../../../../src/styles'
import { fullConvertedNavigationModel } from '../../../../dumps/converted-navigation-items.dump'

const context = buildTestContext(styles)

/**
 * Test MainBarNavigationItem
 * @author Raphaël Mechali
 */
describe('[Menu] Testing MainBarNavigationItem', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MainBarNavigationItem)
  })
  it('should render correctly a module', () => {
    const props = {
      item: fullConvertedNavigationModel[0],
      displayed: true,
      buildLinkURL: () => { },
      onItemResized: () => { },
    }
    shallow(<MainBarNavigationItem {...props} />, { context })
  })
  it('should render correctly a section', () => {
    const props = {
      item: fullConvertedNavigationModel[1],
      displayed: true,
      buildLinkURL: () => { },
      onItemResized: () => { },
    }
    shallow(<MainBarNavigationItem {...props} />, { context })
  })
  it('should render correctly a link', () => {
    const props = {
      item: fullConvertedNavigationModel[2],
      displayed: true,
      buildLinkURL: () => { },
      onItemResized: () => { },
    }
    shallow(<MainBarNavigationItem {...props} />, { context })
  })
  it('should render correctly when hidden (1)', () => {
    const props = {
      item: fullConvertedNavigationModel[1],
      displayed: false,
      buildLinkURL: () => { },
      onItemResized: () => { },
    }
    shallow(<MainBarNavigationItem {...props} />, { context })
  })
  it('should call parent callback on resize (1)', () => {
    const spiedResizeParams = {}
    const props = {
      item: fullConvertedNavigationModel[1],
      displayed: true,
      buildLinkURL: () => { },
      onItemResized: (key, width) => {
        spiedResizeParams.key = key
        spiedResizeParams.width = width
      },
    }
    const wrapper = shallow(<MainBarNavigationItem {...props} />, { context })
    wrapper.instance().onComponentResized({ measureDiv: { width: 42 } })
    assert.equal(spiedResizeParams.key, props.item.key, 'It should call parent callback with right parameters on resize')
    assert.equal(spiedResizeParams.width, 42, 'It should call parent callback with right parameters on resize')
  })
  it('should block parent calls on resize when not visible (1)', () => {
    const spiedResizeParams = {}
    const props = {
      item: fullConvertedNavigationModel[1],
      displayed: false,
      buildLinkURL: () => { },
      onItemResized: (key, width) => {
        spiedResizeParams.key = key
        spiedResizeParams.width = width
      },
    }
    const wrapper = shallow(<MainBarNavigationItem {...props} />, { context })
    wrapper.instance().onComponentResized({ measureDiv: { width: 42 } })
    assert.isNotOk(spiedResizeParams.key, 'It should have blocked parent callback as it is not displayed (avoids 0 resize)')
    assert.isNotOk(spiedResizeParams.width, 'It should have blocked parent callback as it is not displayed (avoids 0 resize)')
  })
  it('should render correctly when hidden (2)', () => {
    const props = {
      item: fullConvertedNavigationModel[2],
      displayed: false,
      buildLinkURL: () => { },
      onItemResized: () => { },
    }
    shallow(<MainBarNavigationItem {...props} />, { context })
  })
  it('should call parent callback on resize (2)', () => {
    const spiedResizeParams = {}
    const props = {
      item: fullConvertedNavigationModel[2],
      displayed: true,
      buildLinkURL: () => { },
      onItemResized: (key, width) => {
        spiedResizeParams.key = key
        spiedResizeParams.width = width
      },
    }
    const wrapper = shallow(<MainBarNavigationItem {...props} />, { context })
    wrapper.instance().onComponentResized({ measureDiv: { width: 42 } })
    assert.equal(spiedResizeParams.key, props.item.key, 'It should call parent callback with right parameters on resize')
    assert.equal(spiedResizeParams.width, 42, 'It should call parent callback with right parameters on resize')
  })
  it('should block parent calls on resize when not visible (2)', () => {
    const spiedResizeParams = {}
    const props = {
      item: fullConvertedNavigationModel[2],
      displayed: false,
      buildLinkURL: () => { },
      onItemResized: (key, width) => {
        spiedResizeParams.key = key
        spiedResizeParams.width = width
      },
    }
    const wrapper = shallow(<MainBarNavigationItem {...props} />, { context })
    wrapper.instance().onComponentResized({ measureDiv: { width: 42 } })
    assert.isNotOk(spiedResizeParams.key, 'It should have blocked parent callback as it is not displayed (avoids 0 resize)')
    assert.isNotOk(spiedResizeParams.width, 'It should have blocked parent callback as it is not displayed (avoids 0 resize)')
  })
})
