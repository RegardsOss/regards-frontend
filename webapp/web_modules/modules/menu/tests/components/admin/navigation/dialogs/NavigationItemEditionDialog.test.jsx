/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  COMMON_ICON_FIELD, COMMON_TITLE_FIELD,
} from '../../../../../src/components/admin/navigation/dialogs/NavigationItemEditionDialog'
import styles from '../../../../../src/styles'
import { aNavigationConfiguration } from '../../../../dumps/configuration.dump'

const context = buildTestContext(styles)

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
      locale: 'en',
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
    assert.lengthOf(actions, 2, 'Dialog should have confirm and cancel options')
  })
  it('should render correctly when editing a module', () => {
    const props = {
      locale: 'en',
      onClose: () => { },
      editionData: {
        onDone: () => { },
        dialogTitleKey: 'some.title.key',
        item: {
          id: 1,
          type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
        },
        itemPath: getItemPathIn(aNavigationConfiguration, { id: 1, type: NAVIGATION_ITEM_TYPES_ENUM.MODULE }),
        navigationItems: aNavigationConfiguration,
      },
      handleSubmit: f => f,
      initialize: () => { },
      change: () => { },
    }

    const enzymeWrapper = shallow(<NavigationItemEditionDialog {...props} />, { context })
    // check dialog
    const editionDialog = enzymeWrapper.find(Dialog)
    assert.lengthOf(editionDialog, 1, 'There should be the dialog')
    assert.isTrue(editionDialog.props().open, 'Dialog should be visible')
    const { actions, title, onRequestClose } = editionDialog.props()
    assert.equal(onRequestClose, props.onClose, 'Dialog close property should be reported')
    assert.lengthOf(actions, 2, 'Dialog should have confirm and cancel options')
    assert.equal(title, props.editionData.dialogTitleKey, 'title should be correctly reported')

    // check the fields for section are not added
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === ICON_TYPE_FIELD), 0, 'Icon type field should be hidden for module edition')
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === ICON_URL_FIELD), 0, 'Icon URL field should be hidden for module edition')
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === TITLE_EN_FIELD), 0, 'Title (en) field should be hidden for module edition')
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === TITLE_FR_FIELD), 0, 'Title (fr) field should be hidden for module edition')

    // check common section / module fields are added
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === PARENT_SECTION_FIELD), 1, 'There should be the parent section field to move module')
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === AFTER_ELEMENT_FIELD), 1, 'There should be the after element field to move module')
    // note: those fields are tested after
  })

  it('should render correctly when editing a section', () => {
    const props = {
      locale: 'fr',
      onClose: () => { },
      editionData: {
        onDone: () => { },
        dialogTitleKey: 'some.title.key',
        item: {
          id: 99,
          type: NAVIGATION_ITEM_TYPES_ENUM.SECTION,
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
      },
      handleSubmit: f => f,
      initialize: () => { },
      change: () => { },
    }
    const enzymeWrapper = shallow(<NavigationItemEditionDialog {...props} />, { context })
    // check dialog
    const editionDialog = enzymeWrapper.find(Dialog)
    assert.lengthOf(editionDialog, 1, 'There should be the dialog')
    assert.isTrue(editionDialog.props().open, 'Dialog should be visible')
    const { actions, title, onRequestClose } = editionDialog.props()
    assert.equal(onRequestClose, props.onClose, 'Dialog close property should be reported')
    assert.lengthOf(actions, 2, 'Dialog should have confirm and cancel options')
    assert.equal(title, props.editionData.dialogTitleKey, 'title should be correctly reported')

    // check the fields for section are added, and verify their current value
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === ICON_TYPE_FIELD), 1, 'Icon type field should be hidden for module edition')
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === ICON_URL_FIELD), 1, 'Icon URL field should be hidden for module edition')
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === TITLE_EN_FIELD), 1, 'Title (en) field should be hidden for module edition')
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === TITLE_FR_FIELD), 1, 'Title (fr) field should be hidden for module edition')

    // check common section / module fields are added
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === PARENT_SECTION_FIELD), 1, 'There should be the parent section field to move module')
    assert.lengthOf(enzymeWrapper.findWhere(n => n.props().name === AFTER_ELEMENT_FIELD), 1, 'There should be the after element field to move module')
    // note: those fields are tested after
  })


  // Now, we test for series of items that retrieved parents and sibling and corresponding edition possibilities are valid
  const mainBarAndallSections = [NavigationItemEditionDialog.MAIN_BAR, ...findAllSections(aNavigationConfiguration)]
  const testCases = [{
    label: 'a new module',
    item: { id: 777, type: NAVIGATION_ITEM_TYPES_ENUM.MODULE },
    itemPath: [aNavigationConfiguration.length], // by default, new items will be set at end of the main bar
    expectedParent: NavigationItemEditionDialog.MAIN_BAR,
    expectedPossibleParents: mainBarAndallSections, // MAIN_BAR and all sections could be the parent
    // it should be after the last model itel
    expectedSibling: aNavigationConfiguration[aNavigationConfiguration.length - 1],
    // it can have as previous sibling: any root item of the navigation model, first position is forbidden on main bar (it is home position)
    expectedPossibleSibiling: aNavigationConfiguration,
  }, {
    label: 'a new section',
    item: {
      id: 777,
      type: NAVIGATION_ITEM_TYPES_ENUM.SECTION,
      icon: { type: AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT },
      title: { en: 'new.section.en', fr: 'new.section.fr' },
      children: [],
    },
    // by default, new items will be set at end of the main bar
    itemPath: [aNavigationConfiguration.length],
    expectedParent: NavigationItemEditionDialog.MAIN_BAR,
    // MAIN_BAR and all OTHER sections could be the parent
    expectedPossibleParents: mainBarAndallSections,
    // it should be after the last model item
    expectedSibling: aNavigationConfiguration[aNavigationConfiguration.length - 1],
    // it can have as previous sibling: any root item of the navigation model, first position is forbidden on main bar (it is home position)
    expectedPossibleSibiling: aNavigationConfiguration,
  }, {
    label: 'an existing module in root (not first one, forbidden)',
    item: aNavigationConfiguration[2],
    itemPath: [2],
    // MAIN_BAR and all sections could be the parent
    expectedParent: NavigationItemEditionDialog.MAIN_BAR,
    expectedPossibleParents: mainBarAndallSections,
    // it should be after the previous item...
    expectedSibling: aNavigationConfiguration[1],
    // it can have as previous sibling: any root item of the navigation model, BUT NOT first position nor itself (cannot be after itself...)
    expectedPossibleSibiling: [...aNavigationConfiguration.slice(0, 2), ...aNavigationConfiguration.slice(3)],
  }, {
    label: 'an existing section in root (last one)',
    item: aNavigationConfiguration[3],
    itemPath: [3],
    expectedParent: NavigationItemEditionDialog.MAIN_BAR,
    // MAIN_BAR and all sections BUT THAT ONE could be the parent
    expectedPossibleParents: mainBarAndallSections.filter(item => item.id !== 2),
    // it should be after the previous item...
    expectedSibling: aNavigationConfiguration[2],
    // it can have as previous sibling: any root item of the navigation model, BUT NOT first position nor itself (cannot be after itself...)
    expectedPossibleSibiling: aNavigationConfiguration.slice(0, 3),
  }, {
    label: 'an existing module in section [1,2], at end',
    item: aNavigationConfiguration[1].children[2].children[1],
    itemPath: [1, 2, 1],
    expectedParent: aNavigationConfiguration[1].children[2],
    // MAIN_BAR and all sections could be the parent
    expectedPossibleParents: mainBarAndallSections,
    // it should be after the previous item
    expectedSibling: aNavigationConfiguration[1].children[2].children[0],
    // it can have as previous sibling: any child of the parent section AND FIRST_POSTION, but not itself
    expectedPossibleSibiling: [NavigationItemEditionDialog.FIRST_POSITION, aNavigationConfiguration[1].children[2].children[0]],
  }, {
    label: 'an existing module in section [1], at start',
    item: aNavigationConfiguration[1].children[0],
    itemPath: [1, 0],
    expectedParent: aNavigationConfiguration[1],
    // MAIN_BAR and all sections could be the parent
    expectedPossibleParents: mainBarAndallSections,
    // it should be at first position
    expectedSibling: NavigationItemEditionDialog.FIRST_POSITION,
    // it can have as previous sibling: any child of the parent section AND FIRST_POSTION, but not itself
    expectedPossibleSibiling: [NavigationItemEditionDialog.FIRST_POSITION, ...aNavigationConfiguration[1].children.slice(1)],
  }, {
    label: 'an existing section in section [1], at end',
    item: aNavigationConfiguration[1].children[2],
    itemPath: [1, 2],
    expectedParent: aNavigationConfiguration[1],
    // MAIN_BAR and all sections except itself
    expectedPossibleParents: [NavigationItemEditionDialog.MAIN_BAR, aNavigationConfiguration[1], aNavigationConfiguration[3]],
    expectedSibling: aNavigationConfiguration[1].children[1],
    // it can have as previous sibling: any child of the parent section AND FIRST_POSTION, but not itself
    expectedPossibleSibiling: [NavigationItemEditionDialog.FIRST_POSITION, ...aNavigationConfiguration[1].children.slice(0, 2)],
  }, {
    label: 'an existing section in root (to check children sections are excluded as parent)',
    item: aNavigationConfiguration[1],
    itemPath: [1],
    expectedParent: NavigationItemEditionDialog.MAIN_BAR,
    // Parents should not contain this section and its children section
    expectedPossibleParents: [NavigationItemEditionDialog.MAIN_BAR, aNavigationConfiguration[3]],
    expectedSibling: aNavigationConfiguration[0],
    expectedPossibleSibiling: [aNavigationConfiguration[0], ...aNavigationConfiguration.slice(2)],
  }]

  testCases.forEach(({
    label,
    item,
    itemPath,
    expectedParent,
    expectedPossibleParents,
    expectedSibling,
    expectedPossibleSibiling,
  }) => it(`Should resolve correctly values, parent and siblings when editing ${label}`, () => {
    let spiedInitValues = {}
    const props = {
      locale: 'fr',
      onClose: () => { },
      editionData: {
        onDone: () => { },
        dialogTitleKey: '',
        item,
        itemPath,
        navigationItems: aNavigationConfiguration,
      },
      handleSubmit: f => f,
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
    const parentSectionField = enzymeWrapper.findWhere(n => n.props().name === PARENT_SECTION_FIELD)
    assert.lengthOf(parentSectionField, 1, 'There should be the parent section field')
    const parentSectionOptions = parentSectionField.find(MenuItem)
    assert.lengthOf(parentSectionOptions, expectedPossibleParents.length, 'There should be the same parent sections options count')
    parentSectionOptions.forEach((optionWrapper, index) => {
      const optionValue = optionWrapper.props().value
      assert.deepEqual(optionValue, expectedPossibleParents[index], 'Possible parent sections should be correctly computed')
    })

    // 2 - position in parent
    const afterElementField = enzymeWrapper.findWhere(n => n.props().name === AFTER_ELEMENT_FIELD)
    assert.lengthOf(afterElementField, 1, 'There should be the after element field')
    const afterElementOptions = afterElementField.find(MenuItem)
    assert.lengthOf(afterElementOptions, expectedPossibleSibiling.length, 'There should be the same after element options count')
    afterElementOptions.forEach((optionWrapper, index) => {
      const optionValue = optionWrapper.props().value
      assert.deepEqual(optionValue, expectedPossibleSibiling[index], 'Possible sibling should be correctly computed')
    })

    // 3 - check initial sections values
    if (item.type === NAVIGATION_ITEM_TYPES_ENUM.SECTION) {
      assert.equal(spiedInitValues[COMMON_ICON_FIELD], item.icon, 'Section icon fields should be correctly reported')
      assert.equal(spiedInitValues[COMMON_TITLE_FIELD], item.title, 'Section title fields should be correctly reported')
    }
  }))

  // Test parent change
  it('Should update sibling correctly when changing parent', () => {
    const spiedChangeValue = {}
    const props = {
      locale: 'fr',
      onClose: () => { },
      editionData: {
        onDone: () => { },
        dialogTitleKey: 'some.title.key',
        // element is in root initially
        item: aNavigationConfiguration[2],
        itemPath: [2],
        navigationItems: aNavigationConfiguration,
      },
      selectedParentSection: NavigationItemEditionDialog.MAIN_BAR, // this is intial form value (before initial update)
      handleSubmit: f => f,
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
    const afterElementField = enzymeWrapper.findWhere(n => n.props().name === AFTER_ELEMENT_FIELD)
    assert.lengthOf(afterElementField, 1, 'There should be the after element field')
    const afterElementOptions = afterElementField.find(MenuItem)
    assert.lengthOf(afterElementOptions, 1, 'There should be only FIRST_POSITION available in new section')
    assert.equal(afterElementOptions.at(0).props().value, NavigationItemEditionDialog.FIRST_POSITION, 'Option should be FIRST_POSITION')
    // also check the field value was updated (holding the new position)
    assert.equal(spiedChangeValue[AFTER_ELEMENT_FIELD], NavigationItemEditionDialog.FIRST_POSITION)
  })

  const confirmTestCases = [{
    label: 'moving an item to root (position 1)',
    itemPath: [1, 1],
    newAfterItemIndex: 0, // cannot be before home here
    newParentPath: [],
    expectedInsertAtPath: [1],
  }, {
    label: 'moving an item to root (at end)',
    itemPath: [1, 2, 1],
    newAfterItemIndex: aNavigationConfiguration.length - 1,
    newParentPath: [],
    expectedInsertAtPath: [aNavigationConfiguration.length],
  }, {
    label: 'test moving an item into another section (at start)',
    itemPath: [1, 0],
    newAfterItemIndex: -1, // first position is now before the current first module
    newParentPath: [1, 2],
    expectedInsertAtPath: [1, 2, 0],
  }, {
    label: 'test moving an item into another section (at end)',
    itemPath: [1, 2, 0],
    newAfterItemIndex: 2,
    newParentPath: [1],
    expectedInsertAtPath: [1, 3],
  }, {
    label: 'swaping an item in the same section (before to after)',
    itemPath: [1, 1],
    newAfterItemIndex: 2,
    newParentPath: [1],
    expectedInsertAtPath: [1, 3],
  }, {
    label: 'swaping an item in the same section (after to before)',
    itemPath: [1, 2],
    newAfterItemIndex: 0,
    newParentPath: [1],
    expectedInsertAtPath: [1, 1],
  }]
  confirmTestCases.forEach(({
    label, itemPath, newAfterItemIndex, newParentPath, expectedInsertAtPath,
  }) =>
    it(`Should resolve correctly new insert path when ${label}`, () => {
      const spiedDoneValues = {}
      const props = {
        locale: 'fr',
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
        },
        selectedParentSection: NavigationItemEditionDialog.MAIN_BAR, // this is intial form value (before initial update)
        handleSubmit: f => f,
        initialize: () => { },
        change: () => { },
      }
      const enzymeWrapper = shallow(<NavigationItemEditionDialog {...props} />, { context })
      const instance = enzymeWrapper.instance()
      // simulate onConfirm and get results in spiedDoneValues
      const simulatedNewParent = newParentPath.length ?
        getItemByPathIn(aNavigationConfiguration, newParentPath) :
        NavigationItemEditionDialog.MAIN_BAR
      const consideredChildren = simulatedNewParent === NavigationItemEditionDialog.MAIN_BAR ?
        aNavigationConfiguration : simulatedNewParent.children
      const simulatedNewAfterItem = newAfterItemIndex >= 0 ? consideredChildren[newAfterItemIndex] : NavigationItemEditionDialog.FIRST_POSITION
      instance.onConfirm({
        [PARENT_SECTION_FIELD]: simulatedNewParent,
        [AFTER_ELEMENT_FIELD]: simulatedNewAfterItem,
      })
      // check receive values
      assert.equal(spiedDoneValues.item, getItemByPathIn(aNavigationConfiguration, itemPath))
      assert.deepEqual(spiedDoneValues.insertAtPath, expectedInsertAtPath)
    }))
})
