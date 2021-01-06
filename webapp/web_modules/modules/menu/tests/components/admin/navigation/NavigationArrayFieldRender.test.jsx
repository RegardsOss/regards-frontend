/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AccessDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { NAVIGATION_ITEM_TYPES_ENUM } from '../../../../src/domain/NavigationItemTypes'
import {
  getItemPathIn, findAllSections, getItemByPathIn, findAllLinks,
} from '../../../../src/domain/NavigationTreeHelper'
import NavigationArrayFieldRender from '../../../../src/components/admin/navigation/NavigationArrayFieldRender'
import NavigationTree from '../../../../src/components/admin/navigation/NavigationTree'
import NavigationItemEditionDialog from '../../../../src/components/admin/navigation/dialogs/NavigationItemEditionDialog'
import styles from '../../../../src/styles'
import { aNavigationConfiguration, anHomeConfiguration } from '../../../dumps/configuration.dump'
import { allDefaultConfigDumpModules, modulesWithNewAndDeleted } from '../../../dumps/modules.dump'

const context = buildTestContext(styles)

/** A simple role list dump */
const roleList = {
  1: {
    content: {
      name: 'ROLE1',
    },
  },
}

/**
 * Asserts that navigation items for dialog are correctly packed: they have title and correspond to initial navigation items
 * @param {*} modelItems initial navigation items
 * @param {*} itemsWithTitle same items with title for edition dialog
 */
const compareTreesAndCheckTitle = (modelItems, itemsWithTitle) => {
  assert.equal(modelItems.length, itemsWithTitle.length, 'The items list should be identical')
  modelItems.forEach(({ id, type, children }, index) => {
    const {
      id: comparedId, type: comparedType, title, children: comparedChildren,
    } = itemsWithTitle[index]
    // check title
    assert.isOk(title, 'There should be title in navigation items for dialog')
    assert.isOk(title.en, 'There should be EN title in navigation items for dialog')
    assert.isOk(title.fr, 'There should be FR title in navigation items for dialog')
    // check other fields but children
    assert.equal(id, comparedId, 'Same position item should have same id')
    assert.equal(type, comparedType, 'Same position item should have same type')
    if (children) {
      compareTreesAndCheckTitle(children, comparedChildren)
    }
  }, true)
}

/**
 * Test NavigationArrayFieldRender
 * @author Raphaël Mechali
 */
describe('[Menu] Testing NavigationArrayFieldRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NavigationArrayFieldRender)
  })
  it('should render correctly, hide the tree while not valid and update when receiving modules list', () => {
    const props = {
      dynamicModules: [],
      homeConfiguration: anHomeConfiguration,
      navigationItems: aNavigationConfiguration,
      roleList,
      changeNavigationFieldValue: () => { },
    }
    const wrapper = shallow(<NavigationArrayFieldRender {...props} />, { context })
    assert.lengthOf(wrapper.find(NavigationTree), 0, 'There should not be the navigation tree initially (no module)')

    wrapper.setProps({
      ...props,
      dynamicModules: allDefaultConfigDumpModules,
    })
    const treeWrapper = wrapper.find(NavigationTree)
    assert.lengthOf(treeWrapper, 1, 'After resolving the tree, the should be the navigation tree')
  })
  it('should resolve correctly the initial model, adding missing modules and removing deleted modules', () => {
    let spiedChangeFieldValue = null
    const props = {
      dynamicModules: [],
      homeConfiguration: anHomeConfiguration,
      navigationItems: aNavigationConfiguration,
      roleList,
      changeNavigationFieldValue: (newFieldValue) => { spiedChangeFieldValue = newFieldValue },
    }
    const wrapper = shallow(<NavigationArrayFieldRender {...props} />, { context })
    const dialog = wrapper.find(NavigationItemEditionDialog)
    assert.lengthOf(dialog, 1, 'The dialog should be added in children')
    assert.isNotOk(dialog.props().editionData, 'It should not be showing edition')
    assert.lengthOf(wrapper.find(NavigationTree), 0, 'There should not be the navigation tree initially (no module)')
    assert.isNotOk(spiedChangeFieldValue, 'it should not call change field while dynamic modules are nor defined')
    // check changing properties will for tree items recomputing
    wrapper.setProps({
      ...props,
      dynamicModules: allDefaultConfigDumpModules,
    })
    const treeWrapper = wrapper.find(NavigationTree)
    assert.lengthOf(treeWrapper, 1, 'After resolving the tree, the should be the navigation tree')
    const wrapperInstance = wrapper.instance()
    const treeProps = treeWrapper.props()
    // check properties and callbacks are correctly binded
    assert.equal(treeProps.homeConfiguration, props.homeConfiguration, 'It should report correctly the "homeConfiguration" property')
    assert.equal(treeProps.navigationItems, props.navigationItems, 'It should report correctly the "navigationItems" property')
    assert.equal(treeProps.dynamicModules, allDefaultConfigDumpModules, 'It should report correctly the "dynamicModules" property')
    assert.equal(treeProps.onEdit, wrapperInstance.onEditItem, 'It should report correctly the "onEdit" property')
    assert.equal(treeProps.onCreateSection, wrapperInstance.onCreateSection, 'It should report correctly the "onCreateSection" property')
    assert.equal(treeProps.onDeleteSection, wrapperInstance.onDeleteSection, 'It should report correctly the "onDeleteSection" property')
    assert.equal(treeProps.onCreateLink, wrapperInstance.onCreateLink, 'It should report correctly the "onCreateLink" property')
    assert.equal(treeProps.onDeleteLink, wrapperInstance.onDeleteLink, 'It should report correctly the "onDeleteLink" property')
    // check the tree was correctly resolved (note: dumps and modules list are matching: there should be no difference with default model)
    assert.deepEqual(spiedChangeFieldValue, aNavigationConfiguration, 'it should resolve default model correctly')
  })
  it('should resolve correctly the initial model with current modules definitions', () => {
    let spiedChangeFieldValue = null
    const props = {
      dynamicModules: modulesWithNewAndDeleted,
      homeConfiguration: anHomeConfiguration,
      navigationItems: aNavigationConfiguration,
      roleList,
      changeNavigationFieldValue: (newFieldValue) => { spiedChangeFieldValue = newFieldValue },
    }
    const wrapper = shallow(<NavigationArrayFieldRender {...props} />, { context })
    const dialog = wrapper.find(NavigationItemEditionDialog)
    assert.lengthOf(dialog, 1, 'The dialog should be added in children')
    assert.isNotOk(dialog.props().editionData, 'It should not be showing edition')
    assert.lengthOf(wrapper.find(NavigationTree), 1, 'There should be the navigation tree initially')
    assert.isOk(spiedChangeFieldValue, 'change field should have been initially performed')
    // the module 3 and 6 have been deleted, the should not be found anymore in tree
    assert.isNotOk(getItemPathIn(spiedChangeFieldValue, { type: NAVIGATION_ITEM_TYPES_ENUM.MODULE, id: 3 }), 'Module 3 should no longer be in field value')
    assert.isNotOk(getItemPathIn(spiedChangeFieldValue, { type: NAVIGATION_ITEM_TYPES_ENUM.MODULE, id: 6 }), 'Module 6 should no longer be in field value')

    // check module 7 was added before end
    const module7Path = getItemPathIn(spiedChangeFieldValue, { type: NAVIGATION_ITEM_TYPES_ENUM.MODULE, id: 7 })
    assert.isOk(module7Path, 'The new module 7 should have been added')
    assert.lengthOf(module7Path, 1, 'The new module 7 should have been added in main bar')
    assert.equal(module7Path[0], spiedChangeFieldValue.length - 2, 'The new module 7 should have been added at end - 1 (because of new module 8)')
    // check module 8 was added at end
    const module8Path = getItemPathIn(spiedChangeFieldValue, { type: NAVIGATION_ITEM_TYPES_ENUM.MODULE, id: 8 })
    assert.isOk(module8Path, 'The new module 8 should have been added')
    assert.lengthOf(module8Path, 1, 'The new module 8 should have been added in main bar')
    assert.equal(module8Path[0], spiedChangeFieldValue.length - 1, 'The new module 8 should have been added at end')
  })

  it('should handle correctly create section', () => {
    const props = {
      dynamicModules: allDefaultConfigDumpModules,
      homeConfiguration: anHomeConfiguration,
      navigationItems: aNavigationConfiguration,
      roleList,
      changeNavigationFieldValue: () => { },
    }
    const wrapper = shallow(<NavigationArrayFieldRender {...props} />, { context })
    // simulate create
    const wrapperInstance = wrapper.instance()
    wrapperInstance.onCreateSection()
    wrapper.update()
    const { editionData } = wrapper.state()
    assert.isOk(editionData, 'edition data should be defined after creating section')
    const dialog = wrapper.find(NavigationItemEditionDialog)
    assert.lengthOf(dialog, 1, 'The dialog should be added in children')
    assert.equal(dialog.props().roleList, props.roleList, 'The dialog role list should be provided from be added in children')
    assert.deepEqual(dialog.props().editionData, editionData, 'The dialog edition data should be reported')
    assert.equal(editionData.onDone, wrapperInstance.onEditDone, 'onDone callback should be correctly reported')
    assert.equal(editionData.dialogTitleKey, 'menu.form.navigation.create.section.dialog.title', 'dialogTitleKey should correctly reported')
    assert.isOk(editionData.item.id, 'New item ID should be correctly initialized')
    assert.isFalse(!!findAllSections(aNavigationConfiguration).find((section) => section.id === editionData.item.id),
      'The new item id should be unique')
    assert.isOk(editionData.item.icon, 'New item icon field should be correctly initialized')
    assert.equal(editionData.item.icon.type, AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
      'New item icon type should be default')
    assert.isOk(editionData.item.title, 'New item title field should be correctly initialized')
    assert.isOk(editionData.item.title.en, 'New item EN title should be correctly initialized')
    assert.isOk(editionData.item.title.fr, 'New item FR title should be correctly initialized')
    assert.isOk(editionData.item.visibilityMode, 'New item visibility mode should be correctly initialized')
    assert.deepEqual(editionData.itemPath, [aNavigationConfiguration.length], 'New items should be initialized at end of the main bar')
    // navigation items are identical to conf but add the title (as dialog doesn't receive dynamic modules)
    compareTreesAndCheckTitle(aNavigationConfiguration, editionData.navigationItems)
    // also check first item (home in our case) is set to use home configuration
    assert.deepEqual(editionData.navigationItems[0].title, props.homeConfiguration.title)
  })
  it('should handle correctly edit section', () => {
    const props = {
      dynamicModules: allDefaultConfigDumpModules,
      homeConfiguration: anHomeConfiguration,
      navigationItems: aNavigationConfiguration,
      roleList,
      changeNavigationFieldValue: () => { },
    }
    const wrapper = shallow(<NavigationArrayFieldRender {...props} />, { context })
    // simulate create
    const wrapperInstance = wrapper.instance()
    wrapperInstance.onEditItem(NAVIGATION_ITEM_TYPES_ENUM.SECTION, 1)
    wrapper.update()
    const { editionData } = wrapper.state()
    assert.isOk(editionData, 'edition data should be defined after creating section')
    const dialog = wrapper.find(NavigationItemEditionDialog)
    assert.lengthOf(dialog, 1, 'The dialog should be added in children')
    assert.deepEqual(dialog.props().editionData, editionData, 'The dialog edition data should be reported')
    assert.equal(editionData.onDone, wrapperInstance.onEditDone, 'onDone callback should be correctly reported')
    assert.equal(editionData.dialogTitleKey, 'menu.form.navigation.edit.section.dialog.title', 'dialogTitleKey should correctly reported')
    const expectedPath = [1, 1]
    assert.deepEqual(editionData.item, getItemByPathIn(aNavigationConfiguration, expectedPath), 'Item should be correctly provided')
    assert.deepEqual(editionData.itemPath, expectedPath, 'Item path should be correctly provided')
    // navigation items are identical to conf but add the title (as dialog doesn't receive dynamic modules)
    compareTreesAndCheckTitle(aNavigationConfiguration, editionData.navigationItems)
    // also check first item (home in our case) is set to use home configuration
    assert.deepEqual(editionData.navigationItems[0].title, props.homeConfiguration.title)
  })
  it('should handle correctly create link', () => {
    const props = {
      dynamicModules: allDefaultConfigDumpModules,
      homeConfiguration: anHomeConfiguration,
      navigationItems: aNavigationConfiguration,
      roleList,
      changeNavigationFieldValue: () => { },
    }
    const wrapper = shallow(<NavigationArrayFieldRender {...props} />, { context })
    // simulate create
    const wrapperInstance = wrapper.instance()
    wrapperInstance.onCreateLink()
    wrapper.update()
    const { editionData } = wrapper.state()
    assert.isOk(editionData, 'edition data should be defined after creating link')
    const dialog = wrapper.find(NavigationItemEditionDialog)
    assert.lengthOf(dialog, 1, 'The dialog should be added in children')
    assert.equal(dialog.props().roleList, props.roleList, 'The dialog role list should be provided from be added in children')
    assert.deepEqual(dialog.props().editionData, editionData, 'The dialog edition data should be reported')
    assert.equal(editionData.onDone, wrapperInstance.onEditDone, 'onDone callback should be correctly reported')
    assert.equal(editionData.dialogTitleKey, 'menu.form.navigation.create.link.dialog.title', 'dialogTitleKey should correctly reported')
    assert.isOk(editionData.item.id, 'New item ID should be correctly initialized')
    assert.isFalse(!!findAllLinks(aNavigationConfiguration).find((link) => link.id === editionData.item.id),
      'The new item id should be unique')
    assert.isOk(editionData.item.icon, 'New item icon field should be correctly initialized')
    assert.equal(editionData.item.icon.type, AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
      'New item icon type should be default')
    assert.isOk(editionData.item.title, 'New item title field should be correctly initialized')
    assert.isOk(editionData.item.title.en, 'New item EN title should be correctly initialized')
    assert.isOk(editionData.item.title.fr, 'New item FR title should be correctly initialized')
    assert.isOk(editionData.item.visibilityMode, 'New item visibility mode should be correctly initialized')
    assert.deepEqual(editionData.itemPath, [aNavigationConfiguration.length], 'New items should be initialized at end of the main bar')
    // navigation items are identical to conf but add the title (as dialog doesn't receive dynamic modules)
    compareTreesAndCheckTitle(aNavigationConfiguration, editionData.navigationItems)
    // also check first item (home in our case) is set to use home configuration
    assert.deepEqual(editionData.navigationItems[0].title, props.homeConfiguration.title)
  })
  it('should handle correctly edit link', () => {
    const props = {
      dynamicModules: allDefaultConfigDumpModules,
      homeConfiguration: anHomeConfiguration,
      navigationItems: aNavigationConfiguration,
      roleList,
      changeNavigationFieldValue: () => { },
    }
    const wrapper = shallow(<NavigationArrayFieldRender {...props} />, { context })
    // simulate create
    const wrapperInstance = wrapper.instance()
    wrapperInstance.onEditItem(NAVIGATION_ITEM_TYPES_ENUM.LINK, 50)
    wrapper.update()
    const { editionData } = wrapper.state()
    assert.isOk(editionData, 'edition data should be defined after creating link')
    const dialog = wrapper.find(NavigationItemEditionDialog)
    assert.lengthOf(dialog, 1, 'The dialog should be added in children')
    assert.deepEqual(dialog.props().editionData, editionData, 'The dialog edition data should be reported')
    assert.equal(editionData.onDone, wrapperInstance.onEditDone, 'onDone callback should be correctly reported')
    assert.equal(editionData.dialogTitleKey, 'menu.form.navigation.edit.link.button.label', 'dialogTitleKey should correctly reported')
    const expectedPath = [4]
    assert.deepEqual(editionData.item, getItemByPathIn(aNavigationConfiguration, expectedPath), 'Item should be correctly provided')
    assert.deepEqual(editionData.itemPath, expectedPath, 'Item path should be correctly provided')
    // navigation items are identical to conf but add the title (as dialog doesn't receive dynamic modules)
    compareTreesAndCheckTitle(aNavigationConfiguration, editionData.navigationItems)
    // also check first item (home in our case) is set to use home configuration
    assert.deepEqual(editionData.navigationItems[0].title, props.homeConfiguration.title)
  })
  it('should handle correctly edit module', () => {
    const props = {
      dynamicModules: allDefaultConfigDumpModules,
      homeConfiguration: anHomeConfiguration,
      navigationItems: aNavigationConfiguration,
      roleList,
      changeNavigationFieldValue: () => { },
    }
    const wrapper = shallow(<NavigationArrayFieldRender {...props} />, { context })
    // simulate create
    const wrapperInstance = wrapper.instance()
    wrapperInstance.onEditItem(NAVIGATION_ITEM_TYPES_ENUM.MODULE, 2)
    wrapper.update()
    const { editionData } = wrapper.state()
    assert.isOk(editionData, 'edition data should be defined after creating section')
    const dialog = wrapper.find(NavigationItemEditionDialog)
    assert.lengthOf(dialog, 1, 'The dialog should be added in children')
    assert.deepEqual(dialog.props().editionData, editionData, 'The dialog edition data should be reported')
    assert.equal(editionData.onDone, wrapperInstance.onEditDone, 'onDone callback should be correctly reported')
    assert.equal(editionData.dialogTitleKey, 'menu.form.navigation.edit.module.dialog.title', 'dialogTitleKey should correctly reported')
    const expectedPath = [1, 1, 0]
    assert.deepEqual(editionData.item, getItemByPathIn(aNavigationConfiguration, expectedPath), 'Item should be correctly provided')
    assert.deepEqual(editionData.itemPath, expectedPath, 'Item path should be correctly provided')
    // navigation items are identical to conf but add the title (as dialog doesn't receive dynamic modules)
    compareTreesAndCheckTitle(aNavigationConfiguration, editionData.navigationItems)
    // also check first item (home in our case) is set to use home configuration
    assert.deepEqual(editionData.navigationItems[0].title, props.homeConfiguration.title)
  })
  it('should update correctly after editing', () => {
    let spiedChangeFieldValue = null
    const props = {
      dynamicModules: allDefaultConfigDumpModules,
      homeConfiguration: anHomeConfiguration,
      navigationItems: aNavigationConfiguration,
      roleList,
      changeNavigationFieldValue: (value) => { spiedChangeFieldValue = value },
    }
    const wrapper = shallow(<NavigationArrayFieldRender {...props} />, { context })
    // simulate moving section [1,1] into section [3] (first position)
    const wrapperInstance = wrapper.instance()
    const initItemPath = [1, 1]
    const insertAtPath = [3, 0]
    const editedItem = getItemByPathIn(aNavigationConfiguration, initItemPath)
    wrapperInstance.onEditDone({
      ...editedItem,
      icon: { url: 'test-url', type: 'potatoes' },
      title: { en: 'edited-en', fr: 'edited-fr' },
      visibilityMode: 'CustomVisibility',
      visibleForRole: 'customRole',
    }, insertAtPath)

    // check what was published as new field value
    assert.isOk(spiedChangeFieldValue, 'Change field should have been called')
    // check the section or the link is now at path [4,0] in field value
    const newItemPath = getItemPathIn(spiedChangeFieldValue, editedItem) // only type and ID are important to retrieve item
    assert.deepEqual(newItemPath, insertAtPath, 'Section or Link should be moved at new path')
    // get the full new item and check value
    const afterEditionItem = getItemByPathIn(spiedChangeFieldValue, newItemPath)
    assert.deepEqual(afterEditionItem.title, { en: 'edited-en', fr: 'edited-fr' }, 'Title should be correctly reported in new item')
    assert.deepEqual(afterEditionItem.icon, { url: 'test-url', type: 'potatoes' }, 'Icon should be correctly reported in new item')
    assert.equal(afterEditionItem.visibilityMode, 'CustomVisibility', 'Visibility should be reported correctly in new item')
    assert.equal(afterEditionItem.visibleForRole, 'customRole', 'Visible for role should be reported correctly in new item')
    // note: we do not test here all possible tree changes, that must be tested in NavigationTreeHelper
  })
})
