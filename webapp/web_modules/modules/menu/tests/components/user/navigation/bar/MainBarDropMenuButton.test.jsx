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
import MenuItem from 'material-ui/MenuItem'
import { DropDownButton } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { NAVIGATION_ITEM_TYPES_ENUM } from '../../../../../src/domain/NavigationItemTypes'
import MainBarDropMenuButton from '../../../../../src/components/user/navigation/bar/MainBarDropMenuButton'
import styles from '../../../../../src/styles'
import { fullConvertedNavigationModel, changeSelectedModule } from '../../../../dumps/converted-navigation-items.dump'

const context = buildTestContext(styles)

/**
 * Verifies sub items in menu items list for corresponding model elements
 * @param {*} modelItems model elements
 * @param {*} menuItemsWrappers menu items
 */
function checkSubItems(modelItems, menuItemsWrappers) {
  assert.equal(modelItems.length, menuItemsWrappers.length, 'There should be one menu item for each model child')
  modelItems.forEach((itemModel, index) => {
    const menuItemForModel = menuItemsWrappers.at(index)
    // 1 - check title was correctly reported
    assert.equal(menuItemForModel.props().primaryText, itemModel.title.fr, 'Title should be correctly reported for current locale')
    // 2 - check selected state
    if (itemModel.selected) {
      assert.isOk(menuItemForModel.props().style, 'There should be the style for a selected item')
    } else {
      assert.isNotOk(menuItemForModel.props().style, 'There should be no specific style for a non selected item')
    }
    // 3 - check there is an icon
    assert.isOk(menuItemForModel.props().leftIcon, 'There must be the icon displayer')

    // 4 - check sub items  and specific properties
    const subItems = menuItemForModel.props().menuItems
    const itemContainer = menuItemForModel.props().containerElement
    assert.isOk(itemContainer, 'There should be an item container')
    if (itemModel.type === NAVIGATION_ITEM_TYPES_ENUM.MODULE || itemModel.type === NAVIGATION_ITEM_TYPES_ENUM.SECTION) {
      assert.equal(itemContainer.props.to, 'built-test-url', 'Link container URL should be built using buildLinkURL function')
    }
    if (itemModel.type === NAVIGATION_ITEM_TYPES_ENUM.SECTION) {
      assert.isOk(subItems, 'Section should have sub items')
      assert.isOk(menuItemForModel.props().rightIcon, 'Section must show expand icon')
      // Note: we cannot check recursively here, as MUI fails rendering sub elements for tests (Cannot read property 'applyFocusState' of undefined)
    } else {
      assert.isNotOk(subItems, 'Module or link should have no sub item')
      assert.isNotOk(menuItemForModel.props().rightIcon, 'Module or linkshould not show expand icon')
    }
  })
}

/**
 * Test MainBarDropMenuButton
 * @author Raphaël Mechali
 */
describe('[Menu] Testing MainBarDropMenuButton', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MainBarDropMenuButton)
  })
  it('should render correctly not selected', () => {
    const aSection = fullConvertedNavigationModel[1]
    const props = {
      label: 'any',
      icon: null,
      items: aSection.children,
      buildLinkURL: () => 'built-test-url',
    }
    // asserted locale for items : FR
    const savedLocale = context.intl.locale
    context.intl.locale = 'fr'
    const enzymeWrapper = shallow(<MainBarDropMenuButton {...props} />, { context })
    const dropDownButton = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropDownButton, 1, 'There should be the drop down button')
    assert.isFalse(dropDownButton.props().secondary, 'It should not be marked selected as selected module is not in this section')
    //recursive check: builds children of sub sections
    checkSubItems(props.items, dropDownButton.find(MenuItem))
    context.intl.locale = savedLocale
  })
  it('should render correctly selected', () => {
    const newModelWithSelection = changeSelectedModule(3, fullConvertedNavigationModel) // we choose here a module in section
    const aSection = newModelWithSelection[1]

    const props = {
      label: 'any',
      icon: null,
      items: aSection.children,
      buildLinkURL: () => 'built-test-url',
    }
    const savedLocale = context.intl.locale
    context.intl.locale = 'fr'
    const enzymeWrapper = shallow(<MainBarDropMenuButton {...props} />, { context })
    const dropDownButton = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropDownButton, 1, 'There should be the drop down button')
    assert.isTrue(dropDownButton.props().secondary, 'It should be marked selected as selected module is in this section')
    //recursive check: builds children of sub sections
    checkSubItems(props.items, dropDownButton.find(MenuItem))
    context.intl.locale = savedLocale
  })
})
