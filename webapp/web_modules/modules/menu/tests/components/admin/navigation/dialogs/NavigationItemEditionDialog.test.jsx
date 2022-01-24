/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Dialog from 'material-ui/Dialog'
import MenuItem from 'material-ui/MenuItem'
import { AccessDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { NAVIGATION_ITEM_TYPES_ENUM } from '../../../../../src/domain/NavigationItemTypes'
import { getItemByPathIn, getItemPathIn, findAllSections } from '../../../../../src/domain/NavigationTreeHelper'
import {
  NavigationItemEditionDialog, ICON_TYPE_FIELD, ICON_URL_FIELD, TITLE_EN_FIELD,
  TITLE_FR_FIELD, PARENT_SECTION_FIELD, AFTER_ELEMENT_FIELD,
  COMMON_ICON_FIELD, COMMON_TITLE_FIELD, VISIBILITY_MODE_FIELD, VISIBLE_FOR_ROLE_FIELD,
  URL_LINK_FIELD,
} from '../../../../../src/components/admin/navigation/dialogs/NavigationItemEditionDialog'
import { VISIBILITY_MODES_ENUM } from '../../../../../src/domain/VisibilityModes'
import styles from '../../../../../src/styles'
import { aNavigationConfiguration } from '../../../../dumps/configuration.dump'

const context = buildTestContext(styles)

/** A role list dump */
const roleList = {
  1: {
    content: { name: 'R1' },
  },
  2: {
    content: { name: 'R2' },
  },
}

/**
 * Test NavigationItemEditionDialog
 * @author Raphaël Mechali
 */
describe('[Menu] Testing NavigationItemEditionDialog', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(NavigationItemEditionDialog)
  })
  it('should render correctly when not editing', () => {
    const props = {
      roleList,
      onClose: () => { },
      editionData: null, // not editing
      handleSubmit: () => { },
      initialize: () => { },
      change: () => { },

    }
    const enzymeWrapper = shallow(<NavigationItemEditionDialog {...props} />, { context })
    // check dialog and actions
    const editionDialog = enzymeWrapper.find(Dialog)
    assert.lengthOf(editionDialog, 1, 'There should be the dialog')
    assert.isFalse(editionDialog.props().open, 'Dialog should be hidden')
    const { actions, onRequestClose } = editionDialog.props()
    assert.equal(onRequestClose, props.onClose, 'Dialog close property should be reported')
    assert.isOk(actions, 'Dialog should have confirm and cancel options (in fragment)')
  })
  it('should render correctly when editing a module', () => {
    const props = {
      roleList,
      onClose: () => { },
      editionData: {
        onDone: () => { },
        dialogTitleKey: 'some.title.key',
        item: {
          id: 2,
          type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
          visibilityMode: VISIBILITY_MODES_ENUM.ALWAYS,
          visibleForRole: null,
        },
        itemPath: getItemPathIn(aNavigationConfiguration, { id: 2, type: NAVIGATION_ITEM_TYPES_ENUM.MODULE }),
        navigationItems: aNavigationConfiguration,
        hasHome: true,
      },
      handleSubmit: (f) => f,
      initialize: () => { },
      change: () => { },
    }

    const enzymeWrapper = shallow(<NavigationItemEditionDialog {...props} />, { context })
    // check dialog
    const editionDialog = enzymeWrapper.find(Dialog)
    assert.lengthOf(editionDialog, 1, 'There should be the dialog')
    assert.isTrue(editionDialog.props().open, 'Dialog should be visible')
    const { title, onRequestClose } = editionDialog.props()
    assert.equal(onRequestClose, props.onClose, 'Dialog close property should be reported')
    assert.equal(title, props.editionData.dialogTitleKey, 'title should be correctly reported')

    // check the fields for section and link are not added
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === ICON_TYPE_FIELD), 0, 'Icon type field should be hidden for module edition')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === ICON_URL_FIELD), 0, 'Icon URL field should be hidden for module edition')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === TITLE_EN_FIELD), 0, 'Title (en) field should be hidden for module edition')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === TITLE_FR_FIELD), 0, 'Title (fr) field should be hidden for module edition')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === URL_LINK_FIELD), 0, 'Url field should be hidden for module edition')

    // check common section / module / link fields are added
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === PARENT_SECTION_FIELD), 1, 'There should be the parent section field to move module')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === AFTER_ELEMENT_FIELD), 1, 'There should be the after element field to move module')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === VISIBILITY_MODE_FIELD), 1, 'The should be the visibility mode field')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === VISIBLE_FOR_ROLE_FIELD), 1, 'There should be visibility role field')
    // note: those fields are tested after
  })

  it('should render correctly when editing a section', () => {
    const props = {
      roleList,
      onClose: () => { },
      editionData: {
        onDone: () => { },
        dialogTitleKey: 'some.title.key',
        item: {
          id: 99,
          type: NAVIGATION_ITEM_TYPES_ENUM.SECTION,
          visibilityMode: VISIBILITY_MODES_ENUM.ALWAYS,
          visibleForRole: null,
          icon: {
            type: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
          },
          title: {
            en: 'en title',
            fr: 'fr title',
          },
          children: [],
        },
        itemPath: [], // a new item, by default in main bar
        navigationItems: aNavigationConfiguration,
        hasHome: true,
      },
      handleSubmit: (f) => f,
      initialize: () => { },
      change: () => { },
    }
    const enzymeWrapper = shallow(<NavigationItemEditionDialog {...props} />, { context })
    // check dialog
    const editionDialog = enzymeWrapper.find(Dialog)
    assert.lengthOf(editionDialog, 1, 'There should be the dialog')
    assert.isTrue(editionDialog.props().open, 'Dialog should be visible')
    const { title, onRequestClose } = editionDialog.props()
    assert.equal(onRequestClose, props.onClose, 'Dialog close property should be reported')
    assert.equal(title, props.editionData.dialogTitleKey, 'title should be correctly reported')

    // check the fields for section are added, and verify their current value
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === ICON_TYPE_FIELD), 1, 'Icon type field should be visible for section edition')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === ICON_URL_FIELD), 1, 'Icon URL field should be visible for section edition')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === TITLE_EN_FIELD), 1, 'Title (en) field should be visible for section edition')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === TITLE_FR_FIELD), 1, 'Title (fr) field should be visible for section edition')

    // check common section / module fields are added
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === PARENT_SECTION_FIELD), 1, 'There should be the parent section field to move section')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === AFTER_ELEMENT_FIELD), 1, 'There should be the after element field to move section')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === VISIBILITY_MODE_FIELD), 1, 'The should be the visibility mode field')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === VISIBLE_FOR_ROLE_FIELD), 1, 'There should be visibility role field')
    // note: those fields are tested after

    // check the fields for link are not added
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === URL_LINK_FIELD), 0, 'Url field should be hidden for section edition')

    // there should be an option for each role
    assert.lengthOf(enzymeWrapper.find(MenuItem).findWhere((n) => n.props().value === 'R1'), 1, 'R1 role option should be available')
    assert.lengthOf(enzymeWrapper.find(MenuItem).findWhere((n) => n.props().value === 'R2'), 1, 'R2 role option should be available')
  })

  it('should render correctly when editing a link', () => {
    const props = {
      roleList,
      onClose: () => { },
      editionData: {
        onDone: () => { },
        dialogTitleKey: 'some.title.key',
        item: {
          id: 99,
          type: NAVIGATION_ITEM_TYPES_ENUM.LINK,
          visibilityMode: VISIBILITY_MODES_ENUM.ALWAYS,
          visibleForRole: null,
          icon: {
            type: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT,
          },
          title: {
            en: 'en title',
            fr: 'fr title',
          },
          url: '',
        },
        itemPath: [], // a new item, by default in main bar
        navigationItems: aNavigationConfiguration,
        hasHome: true,
      },
      handleSubmit: (f) => f,
      initialize: () => { },
      change: () => { },
    }
    const enzymeWrapper = shallow(<NavigationItemEditionDialog {...props} />, { context })
    // check dialog
    const editionDialog = enzymeWrapper.find(Dialog)
    assert.lengthOf(editionDialog, 1, 'There should be the dialog')
    assert.isTrue(editionDialog.props().open, 'Dialog should be visible')
    const { title, onRequestClose } = editionDialog.props()
    assert.equal(onRequestClose, props.onClose, 'Dialog close property should be reported')
    assert.equal(title, props.editionData.dialogTitleKey, 'title should be correctly reported')

    // check the fields for link are added, and verify their current value
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === ICON_TYPE_FIELD), 1, 'Icon type field should be visible for link edition')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === ICON_URL_FIELD), 1, 'Icon URL field should be visible for link edition')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === TITLE_EN_FIELD), 1, 'Title (en) field should be visible for link edition')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === TITLE_FR_FIELD), 1, 'Title (fr) field should be visible for link edition')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === URL_LINK_FIELD), 1, 'Url field should be visible for link edition')

    // check common section / module fields are added
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === PARENT_SECTION_FIELD), 1, 'There should be the parent section field to move link')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === AFTER_ELEMENT_FIELD), 1, 'There should be the after element field to move link')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === VISIBILITY_MODE_FIELD), 1, 'The should be the visibility mode field')
    assert.lengthOf(enzymeWrapper.findWhere((n) => n.props().name === VISIBLE_FOR_ROLE_FIELD), 1, 'There should be visibility role field')
    // note: those fields are tested after

    // there should be an option for each role
    assert.lengthOf(enzymeWrapper.find(MenuItem).findWhere((n) => n.props().value === 'R1'), 1, 'R1 role option should be available')
    assert.lengthOf(enzymeWrapper.find(MenuItem).findWhere((n) => n.props().value === 'R2'), 1, 'R2 role option should be available')
  })

  // Now, we test for series of items that retrieved parents and sibling and corresponding edition possibilities are valid
  const mainBarAndAllSections = [NavigationItemEditionDialog.MAIN_BAR, ...findAllSections(aNavigationConfiguration)]
  const testCases = [{
    label: 'a new module',
    item: {
      id: 777,
      type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
      visibilityMode: VISIBILITY_MODES_ENUM.ALWAYS,
      visibleForRole: null,
    },
    itemPath: [aNavigationConfiguration.length], // by default, new items will be set at end of the main bar
    hasHome: true,
    expectedParent: NavigationItemEditionDialog.MAIN_BAR,
    expectedPossibleParents: mainBarAndAllSections, // MAIN_BAR and all sections could be the parent
    // it should be after the last model item
    expectedSibling: aNavigationConfiguration[aNavigationConfiguration.length - 1],
    // it can have as previous sibling: any root item of the navigation model, first position is forbidden on main bar (it is home position)
    expectedPossibleSibling: aNavigationConfiguration,
  }, {
    label: 'a new section',
    item: {
      id: 777,
      type: NAVIGATION_ITEM_TYPES_ENUM.SECTION,
      visibilityMode: VISIBILITY_MODES_ENUM.ALWAYS,
      visibleForRole: null,
      icon: { type: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT },
      title: { en: 'new.section.en', fr: 'new.section.fr' },
      children: [],
    },
    // by default, new items will be set at end of the main bar
    itemPath: [aNavigationConfiguration.length],
    hasHome: true,
    expectedParent: NavigationItemEditionDialog.MAIN_BAR,
    // MAIN_BAR and all OTHER sections could be the parent
    expectedPossibleParents: mainBarAndAllSections,
    // it should be after the last model item
    expectedSibling: aNavigationConfiguration[aNavigationConfiguration.length - 1],
    // it can have as previous sibling: any root item of the navigation model, first position is forbidden on main bar (it is home position)
    expectedPossibleSibling: aNavigationConfiguration,
  }, {
    label: 'a new link',
    item: {
      id: 777,
      type: NAVIGATION_ITEM_TYPES_ENUM.LINK,
      visibilityMode: VISIBILITY_MODES_ENUM.ALWAYS,
      visibleForRole: null,
      icon: { type: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT },
      title: { en: 'new.link.en', fr: 'new.link.fr' },
      url: '',
    },
    // by default, new items will be set at end of the main bar
    itemPath: [aNavigationConfiguration.length],
    hasHome: true,
    expectedParent: NavigationItemEditionDialog.MAIN_BAR,
    // MAIN_BAR and all sections could be the parent
    expectedPossibleParents: mainBarAndAllSections,
    // it should be after the last model item
    expectedSibling: aNavigationConfiguration[aNavigationConfiguration.length - 1],
    // it can have as previous sibling: any root item of the navigation model, first position is forbidden on main bar (it is home position)
    expectedPossibleSibling: aNavigationConfiguration,
  }, {
    label: 'an existing module in root (not first one, forbidden)',
    item: aNavigationConfiguration[2],
    itemPath: [2],
    hasHome: true,
    // MAIN_BAR and all sections could be the parent
    expectedParent: NavigationItemEditionDialog.MAIN_BAR,
    expectedPossibleParents: mainBarAndAllSections,
    // it should be after the previous item...
    expectedSibling: aNavigationConfiguration[1],
    // it can have as previous sibling: any root item of the navigation model, BUT NOT first position nor itself (cannot be after itself...)
    expectedPossibleSibling: [...aNavigationConfiguration.slice(0, 2), ...aNavigationConfiguration.slice(3)],
  }, {
    label: 'an existing module in root (first position allowed as there is not home)',
    item: aNavigationConfiguration[2],
    itemPath: [2],
    hasHome: false,
    // MAIN_BAR and all sections could be the parent
    expectedParent: NavigationItemEditionDialog.MAIN_BAR,
    expectedPossibleParents: mainBarAndAllSections,
    // it should be after the previous item...
    expectedSibling: aNavigationConfiguration[1],
    // it can have as previous sibling: any root item of the navigation model and first position  BUT NOT itself
    expectedPossibleSibling: [NavigationItemEditionDialog.FIRST_POSITION, ...aNavigationConfiguration.slice(0, 2), ...aNavigationConfiguration.slice(3)],
  }, {
    label: 'an existing section in root',
    item: aNavigationConfiguration[3],
    itemPath: [3],
    hasHome: true,
    expectedParent: NavigationItemEditionDialog.MAIN_BAR,
    // MAIN_BAR and all sections BUT THAT ONE could be the parent
    expectedPossibleParents: mainBarAndAllSections.filter((item) => item.id !== 49),
    // it should be after the previous item...
    expectedSibling: aNavigationConfiguration[2],
    // it can have as previous sibling: any root item of the navigation model, BUT NOT first position nor itself (cannot be after itself...)
    expectedPossibleSibling: [...aNavigationConfiguration.slice(0, 3), aNavigationConfiguration[4]],
  }, {
    label: 'an existing module in section [1,1], at end',
    item: aNavigationConfiguration[1].children[1].children[1],
    itemPath: [1, 1, 1],
    hasHome: true,
    expectedParent: aNavigationConfiguration[1].children[1],
    // MAIN_BAR and all sections could be the parent
    expectedPossibleParents: mainBarAndAllSections,
    // it should be after the previous item
    expectedSibling: aNavigationConfiguration[1].children[1].children[0],
    // it can have as previous sibling: any child of the parent section AND FIRST_POSITION, but not itself
    expectedPossibleSibling: [NavigationItemEditionDialog.FIRST_POSITION, aNavigationConfiguration[1].children[1].children[0], aNavigationConfiguration[1].children[1].children[2]],
  }, {
    label: 'an existing link in root (last one)',
    item: aNavigationConfiguration[4],
    itemPath: [4],
    hasHome: true,
    expectedParent: NavigationItemEditionDialog.MAIN_BAR,
    // MAIN_BAR and all sections
    expectedPossibleParents: mainBarAndAllSections,
    // it should be after the previous item...
    expectedSibling: aNavigationConfiguration[3],
    // it can have as previous sibling: any root item of the navigation model, BUT NOT first position nor itself (cannot be after itself...)
    expectedPossibleSibling: aNavigationConfiguration.slice(0, 4),
  }, {
    label: 'an existing link in section [1,1], at end',
    item: aNavigationConfiguration[1].children[1].children[2],
    itemPath: [1, 1, 2],
    hasHome: true,
    expectedParent: aNavigationConfiguration[1].children[1],
    // MAIN_BAR and all sections could be the parent
    expectedPossibleParents: mainBarAndAllSections,
    // it should be after the previous item
    expectedSibling: aNavigationConfiguration[1].children[1].children[1],
    // it can have as previous sibling: any child of the parent section AND FIRST_POSITION, but not itself
    expectedPossibleSibling: [NavigationItemEditionDialog.FIRST_POSITION, aNavigationConfiguration[1].children[1].children[0], aNavigationConfiguration[1].children[1].children[1]],
  }, {
    label: 'an existing module in section [1], at start',
    item: aNavigationConfiguration[1].children[0],
    itemPath: [1, 0],
    hasHome: true,
    expectedParent: aNavigationConfiguration[1],
    // MAIN_BAR and all sections could be the parent
    expectedPossibleParents: mainBarAndAllSections,
    // it should be at first position
    expectedSibling: NavigationItemEditionDialog.FIRST_POSITION,
    // it can have as previous sibling: any child of the parent section AND FIRST_POSITION, but not itself
    expectedPossibleSibling: [NavigationItemEditionDialog.FIRST_POSITION, ...aNavigationConfiguration[1].children.slice(1)],
  }, {
    label: 'an existing section in section [1]',
    item: aNavigationConfiguration[1].children[1],
    itemPath: [1, 1],
    hasHome: true,
    expectedParent: aNavigationConfiguration[1],
    // MAIN_BAR and all sections except itself
    expectedPossibleParents: [NavigationItemEditionDialog.MAIN_BAR, aNavigationConfiguration[1], aNavigationConfiguration[3]],
    expectedSibling: aNavigationConfiguration[1].children[0],
    // it can have as previous sibling: any child of the parent section AND FIRST_POSITION, but not itself
    expectedPossibleSibling: [NavigationItemEditionDialog.FIRST_POSITION, ...aNavigationConfiguration[1].children.slice(0, 1), aNavigationConfiguration[1].children[2]],
  }, {
    label: 'an existing link in section [1], at end',
    item: aNavigationConfiguration[1].children[2],
    itemPath: [1, 2],
    hasHome: true,
    expectedParent: aNavigationConfiguration[1],
    // MAIN_BAR and all sections except itself
    expectedPossibleParents: [NavigationItemEditionDialog.MAIN_BAR, aNavigationConfiguration[1], aNavigationConfiguration[1].children[1], aNavigationConfiguration[3]],
    expectedSibling: aNavigationConfiguration[1].children[1],
    // it can have as previous sibling: any child of the parent section AND FIRST_POSITION, but not itself
    expectedPossibleSibling: [NavigationItemEditionDialog.FIRST_POSITION, ...aNavigationConfiguration[1].children.slice(0, 2)],
  }, {
    label: 'an existing section in root (to check children sections are excluded as parent)',
    item: aNavigationConfiguration[1],
    itemPath: [1],
    hasHome: true,
    expectedParent: NavigationItemEditionDialog.MAIN_BAR,
    // Parents should not contain this section and its children section
    expectedPossibleParents: [NavigationItemEditionDialog.MAIN_BAR, aNavigationConfiguration[3]],
    expectedSibling: aNavigationConfiguration[0],
    expectedPossibleSibling: [aNavigationConfiguration[0], ...aNavigationConfiguration.slice(2)],
  }]

  testCases.forEach(({
    label,
    item,
    itemPath,
    hasHome,
    expectedParent,
    expectedPossibleParents,
    expectedSibling,
    expectedPossibleSibling,
  }) => it(`Should resolve correctly values, parent and siblings when editing ${label}`, () => {
    let spiedInitValues = {}
    const props = {
      roleList,
      onClose: () => { },
      editionData: {
        onDone: () => { },
        dialogTitleKey: '',
        item,
        itemPath,
        navigationItems: aNavigationConfiguration,
        hasHome,
      },
      handleSubmit: (f) => f,
      initialize: (initValues) => { spiedInitValues = initValues },
      change: () => { },
    }
    const enzymeWrapper = shallow(<NavigationItemEditionDialog {...props} />, { context })
    // verify values initially set up
    assert.isOk(spiedInitValues, 'The form initial values should have been computed')
    assert.equal(spiedInitValues[PARENT_SECTION_FIELD], expectedParent, 'Parent should be correctly retrieved')
    assert.equal(spiedInitValues[AFTER_ELEMENT_FIELD], expectedSibling, 'Sibling should be correctly retrieved')
    // verify corresponding fields options
    // 1 - parent
    const parentSectionField = enzymeWrapper.findWhere((n) => n.props().name === PARENT_SECTION_FIELD)
    assert.lengthOf(parentSectionField, 1, 'There should be the parent section field')
    const parentSectionOptions = parentSectionField.find(MenuItem)
    assert.lengthOf(parentSectionOptions, expectedPossibleParents.length, 'There should be the same parent sections options count')
    parentSectionOptions.forEach((optionWrapper, index) => {
      const optionValue = optionWrapper.props().value
      assert.deepEqual(optionValue, expectedPossibleParents[index], 'Possible parent sections should be correctly computed')
    })

    // 2 - position in parent
    const afterElementField = enzymeWrapper.findWhere((n) => n.props().name === AFTER_ELEMENT_FIELD)
    assert.lengthOf(afterElementField, 1, 'There should be the after element field')
    const afterElementOptions = afterElementField.find(MenuItem)
    assert.lengthOf(afterElementOptions, expectedPossibleSibling.length, 'There should be the same after element options count')
    afterElementOptions.forEach((optionWrapper, index) => {
      const optionValue = optionWrapper.props().value
      assert.deepEqual(optionValue, expectedPossibleSibling[index], 'Possible sibling should be correctly computed')
    })

    // 3 - check initial sections values
    if (item.type === NAVIGATION_ITEM_TYPES_ENUM.SECTION) {
      assert.equal(spiedInitValues[COMMON_ICON_FIELD], item.icon, 'Section icon fields should be correctly reported')
      assert.equal(spiedInitValues[COMMON_TITLE_FIELD], item.title, 'Section title fields should be correctly reported')
    }

    // 4 - check initial links values
    if (item.type === NAVIGATION_ITEM_TYPES_ENUM.LINK) {
      assert.equal(spiedInitValues[COMMON_ICON_FIELD], item.icon, 'Link icon fields should be correctly reported')
      assert.equal(spiedInitValues[COMMON_TITLE_FIELD], item.title, 'Link title fields should be correctly reported')
      assert.equal(spiedInitValues[URL_LINK_FIELD], item.url, 'Link url fields should be correctly reported')
    }
  }))

  // Test parent change
  it('Should update sibling correctly when changing parent', () => {
    const spiedChangeValue = {}
    const props = {
      roleList,
      onClose: () => { },
      editionData: {
        onDone: () => { },
        dialogTitleKey: 'some.title.key',
        // element is in root initially
        item: aNavigationConfiguration[2],
        itemPath: [2],
        navigationItems: aNavigationConfiguration,
        hasHome: true,
      },
      selectedParentSection: NavigationItemEditionDialog.MAIN_BAR, // this is intial form value (before initial update)
      handleSubmit: (f) => f,
      initialize: () => { },
      change: (fieldName, value) => { spiedChangeValue[fieldName] = value },
    }
    const enzymeWrapper = shallow(<NavigationItemEditionDialog {...props} />, { context })

    enzymeWrapper.setProps({
      ...props,
      selectedParentSection: aNavigationConfiguration[3], // swap to the section with id 2,
    })
    //enzymeWrapper.update()
    // now we expect that the options are section id 2 children (none) and first position
    const afterElementField = enzymeWrapper.findWhere((n) => n.props().name === AFTER_ELEMENT_FIELD)
    assert.lengthOf(afterElementField, 1, 'There should be the after element field')
    const afterElementOptions = afterElementField.find(MenuItem)
    assert.lengthOf(afterElementOptions, 1, 'There should be only FIRST_POSITION available in new section')
    assert.equal(afterElementOptions.at(0).props().value, NavigationItemEditionDialog.FIRST_POSITION, 'Option should be FIRST_POSITION')
    // also check the field value was updated (holding the new position)
    assert.equal(spiedChangeValue[AFTER_ELEMENT_FIELD], NavigationItemEditionDialog.FIRST_POSITION)
  })

  const confirmTestCases = [{
    label: 'moving an item to root start, with home (position 1)',
    itemPath: [1, 1],
    newAfterItemIndex: 0, // cannot be before home here (hasHome:true)
    newParentPath: [],
    expectedInsertAtPath: [1],
    hasHome: true,
  }, {
    label: 'moving an item to root start, without home (position 0)',
    itemPath: [1, 1],
    newAfterItemIndex: -1, // before home (hasHome:false)
    newParentPath: [],
    expectedInsertAtPath: [0],
    hasHome: false,
  }, {
    label: 'moving an item to root (at end)',
    itemPath: [1, 1, 1],
    newAfterItemIndex: aNavigationConfiguration.length - 1,
    newParentPath: [],
    expectedInsertAtPath: [aNavigationConfiguration.length],
    hasHome: true,
  }, {
    label: 'test moving an item into another section (at start)',
    itemPath: [1, 0],
    newAfterItemIndex: -1, // first position is now before the current first module
    newParentPath: [1, 1],
    expectedInsertAtPath: [1, 1, 0],
    hasHome: true,
  }, {
    label: 'test moving an item into another section (at end)',
    itemPath: [1, 1, 0],
    newAfterItemIndex: 1,
    newParentPath: [1],
    expectedInsertAtPath: [1, 2],
    hasHome: true,
  }, {
    label: 'swapping an item in the same section (before to after)',
    itemPath: [1, 0],
    newAfterItemIndex: 1,
    newParentPath: [1],
    expectedInsertAtPath: [1, 2],
    hasHome: true,
  }, {
    label: 'swapping an item in the same section (after to before)',
    itemPath: [1, 1],
    newAfterItemIndex: -1,
    newParentPath: [1],
    expectedInsertAtPath: [1, 0],
    hasHome: true,
  }]
  confirmTestCases.forEach(({
    label, itemPath, newAfterItemIndex,
    newParentPath, expectedInsertAtPath, hasHome,
  }) => it(`Should resolve correctly new insert path when ${label}`, () => {
    const spiedDoneValues = {}
    const props = {
      roleList,
      onClose: () => { },
      editionData: {
        onDone: (item, insertAtPath) => {
          spiedDoneValues.item = item
          spiedDoneValues.insertAtPath = insertAtPath
        },
        dialogTitleKey: 'some.title.key',
        item: getItemByPathIn(aNavigationConfiguration, itemPath),
        itemPath,
        navigationItems: aNavigationConfiguration,
        hasHome,
      },
      selectedParentSection: NavigationItemEditionDialog.MAIN_BAR, // this is initial form value (before initial update)
      handleSubmit: (f) => f,
      initialize: () => { },
      change: () => { },
    }
    const enzymeWrapper = shallow(<NavigationItemEditionDialog {...props} />, { context })
    const instance = enzymeWrapper.instance()
    // simulate onConfirm and get results in spiedDoneValues
    const simulatedNewParent = newParentPath.length
      ? getItemByPathIn(aNavigationConfiguration, newParentPath)
      : NavigationItemEditionDialog.MAIN_BAR
    const consideredChildren = simulatedNewParent === NavigationItemEditionDialog.MAIN_BAR
      ? aNavigationConfiguration : simulatedNewParent.children
    const simulatedNewAfterItem = newAfterItemIndex >= 0 ? consideredChildren[newAfterItemIndex] : NavigationItemEditionDialog.FIRST_POSITION
    instance.onConfirm({
      [PARENT_SECTION_FIELD]: simulatedNewParent,
      [AFTER_ELEMENT_FIELD]: simulatedNewAfterItem,
      [COMMON_ICON_FIELD]: { type: 'potatoe-icon', url: 'many-potatoes.jpg' },
      [COMMON_TITLE_FIELD]: { en: 'title-en', fr: 'title-fr' },
      [VISIBILITY_MODE_FIELD]: 'WHEN-I-WANT',
      [VISIBLE_FOR_ROLE_FIELD]: 'Teletobies',
      [URL_LINK_FIELD]: 'www.teletobies.fr',
    })
    // check receive values
    const initialModel = getItemByPathIn(aNavigationConfiguration, itemPath)
    const expectedModel = {
      ...initialModel,
      visibilityMode: 'WHEN-I-WANT',
      visibleForRole: 'Teletobies',
    }
    if (initialModel.type === NAVIGATION_ITEM_TYPES_ENUM.SECTION) {
      // title and icon should be set in item for sections
      expectedModel.icon = { type: 'potatoe-icon', url: 'many-potatoes.jpg' }
      expectedModel.title = { en: 'title-en', fr: 'title-fr' }
    }
    if (initialModel.type === NAVIGATION_ITEM_TYPES_ENUM.LINK) {
      // url should be set in item for links
      expectedModel.url = 'www.teletobies.fr'
    }
    assert.deepEqual(spiedDoneValues.item, expectedModel, 'Edited item should be correctly reported')
    assert.deepEqual(spiedDoneValues.insertAtPath, expectedInsertAtPath)
  }))
})
