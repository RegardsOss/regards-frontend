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
import { NAVIGATION_ITEM_TYPES_ENUM } from '../../../../src/domain/NavigationItemTypes'
import NavigationLayoutComponent from '../../../../src/components/user/navigation/NavigationLayoutComponent'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test NavigationLayoutComponent
 * @author Raphaël Mechali
 */
describe('[Menu] Testing NavigationLayoutComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NavigationLayoutComponent)
  })
  it('should render correctly with basic model', () => {
    const props = {
      navigationElements: [{
        key: 'module.1',
        title: { fr: 'a module', en: 'a module' },
        type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
        selected: false,
      }, {
        key: 'module.2',
        title: { fr: 'a module', en: 'a module' },
        type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
        selected: false,
      }],
      buildLinkURL: () => { },
    }
    shallow(<NavigationLayoutComponent {...props} />, { context })
  })
  it('should redimension correctly with basic model', () => {
    const props = {
      navigationElements: [{
        key: 'module.1',
        title: { fr: 'a module', en: 'a module' },
        type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
        selected: false,
      }, {
        key: 'module.2',
        title: { fr: 'a module', en: 'a module' },
        type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
        selected: false,
      }, {
        key: 'module.3',
        title: { fr: 'a module', en: 'a module' },
        type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
        selected: false,
      }],
      buildLinkURL: () => { },
    }
    const enzymeWrapper = shallow(<NavigationLayoutComponent {...props} />, { context })
    const instance = enzymeWrapper.instance()
    // initialize layout data (all items have width 100)
    instance.barItemsWidths['module.1'] = 100
    instance.barItemsWidths['module.2'] = 100
    instance.barItemsWidths['module.3'] = 100
    instance.moreButtonWidth = 150

    // 1 - test when all are fitting screen
    instance.layoutWidth = 400
    instance.onLayoutUpdateImpl(props.navigationElements)
    assert.deepEqual(enzymeWrapper.state(), {
      shownBarItemsCount: 3,
      forceMoreButton: false,
      moreButtonItems: [], // no item to be shown in more button
    }, 'Layout should be correctly computed when all items fits the screen ')

    // 2 - test when the component is obliged to remove 2 items (2 would fit, but not with more button)
    instance.layoutWidth = 260
    instance.onLayoutUpdateImpl(props.navigationElements)
    assert.deepEqual(enzymeWrapper.state(), {
      shownBarItemsCount: 1,
      forceMoreButton: false,
      moreButtonItems: [props.navigationElements[1], props.navigationElements[2]], // last items reported in more button
    }, 'Layout should be correctly computed when all items fits the screen ')

    // 3 - test when the component cannot show any item (it should always show more button)
    instance.layoutWidth = 10
    instance.onLayoutUpdateImpl(props.navigationElements)
    assert.deepEqual(enzymeWrapper.state(), {
      shownBarItemsCount: 0,
      forceMoreButton: false,
      moreButtonItems: props.navigationElements, // all items
    }, 'Layout should be correctly computed when all items fits the screen ')
  })
  it('should force drawing all components when initializing or items list changes', () => {
    const props = {
      navigationElements: [{
        key: 'module.1',
        title: { fr: 'a module', en: 'a module' },
        type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
        selected: false,
      }],
      buildLinkURL: () => { },
    }
    const expectedNonInitializedState = {
      shownBarItemsCount: Number.MAX_SAFE_INTEGER, // all universe items
      forceMoreButton: true, // force the button to draw
      moreButtonItems: [], // no item hidden
    }
    const shownState = {
      shownBarItemsCount: 1,
      forceMoreButton: false,
      moreButtonItems: [],
    }

    const enzymeWrapper = shallow(<NavigationLayoutComponent {...props} />, { context })
    const instance = enzymeWrapper.instance()
    assert.deepEqual(enzymeWrapper.state(), expectedNonInitializedState, 'Should initially force all components rendering')

    instance.barItemsWidths['module.1'] = 100
    instance.moreButtonWidth = 150
    instance.layoutWidth = 400
    instance.onLayoutUpdateImpl(props.navigationElements)
    assert.deepEqual(enzymeWrapper.state(), shownState, 'Should be initialized now')

    // change items list
    enzymeWrapper.setProps({
      ...props,
      navigationElements: [
        ...props.navigationElements, {
          key: 'module.2',
          title: { fr: 'a module', en: 'a module' },
          type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
          selected: false,
        }],
    })
    assert.deepEqual(enzymeWrapper.state(), shownState, 'Should force drawing as their is some unknown elements')
  })
})
