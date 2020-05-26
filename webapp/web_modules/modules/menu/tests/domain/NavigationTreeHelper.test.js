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
import { assert } from 'chai'
import { NAVIGATION_ITEM_TYPES_ENUM } from '../../src/domain/NavigationItemTypes'
import { VISIBILITY_MODES_ENUM } from '../../src/domain/VisibilityModes'
import {
  buildItemForModule,
  filterModuleItem,
  filterItem,
  filterItems,
  getItemPathIn,
  getItemByPathIn,
  getParentPath,
  getParentByPath,
  findAllModules,
  findAllSections,
  removeItemAt,
  moveItemAtPath,
} from '../../src/domain/NavigationTreeHelper'
import { allDefaultConfigDumpModules } from '../dumps/modules.dump'
import { aNavigationConfiguration } from '../dumps/configuration.dump'

describe('[Menu] Testing NavigationTreeHelper', () => {
  it('(buildItemForModule) should build a valid item for module as parameter', () => {
    const builtItem = buildItemForModule(allDefaultConfigDumpModules[0])
    assert.deepEqual(builtItem, {
      id: 2,
      type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
      visibilityMode: VISIBILITY_MODES_ENUM.ALWAYS,
      visibleForRole: null,
    })
  })
  it('(filterModuleItem) should filter a module item correctly, clearing the corresponding item in dynamic modules and adding home information', () => {
    // 1 - valid home module
    let results = filterModuleItem({ id: 5, type: NAVIGATION_ITEM_TYPES_ENUM.MODULE }, allDefaultConfigDumpModules)
    assert.deepEqual(results, {
      found: true,
      isHome: true,
      newModules: [...allDefaultConfigDumpModules.slice(0, 3), allDefaultConfigDumpModules[4]],
    }, 'Home module results should be correctly computed')

    // 2 - valid module
    results = filterModuleItem({ id: 4, type: NAVIGATION_ITEM_TYPES_ENUM.MODULE }, allDefaultConfigDumpModules)
    assert.deepEqual(results, {
      found: true,
      isHome: false,
      newModules: [
        ...allDefaultConfigDumpModules.slice(0, 2),
        ...allDefaultConfigDumpModules.slice(3)],
    }, 'A found module results should be correctly computed')

    // 3 - module not found
    results = filterModuleItem({ id: 18, type: NAVIGATION_ITEM_TYPES_ENUM.MODULE }, allDefaultConfigDumpModules)
    assert.deepEqual(results, {
      found: false,
      isHome: false,
      newModules: allDefaultConfigDumpModules,
    }, 'A missing module results should be correctly computed')
  })
  it('(filterItem) should filter correctly a module and a section item', () => {
    // a valid home module
    let results = filterItem({ id: 5, type: NAVIGATION_ITEM_TYPES_ENUM.MODULE }, allDefaultConfigDumpModules)
    assert.deepEqual(results, {
      item: null, // home, should not be returned as any other item
      homeItem: {
        id: 5,
        type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
      },
      newModules: [...allDefaultConfigDumpModules.slice(0, 3), allDefaultConfigDumpModules[4]],
    }, 'Home item should be correctly filtered')

    // a valid module
    results = filterItem({ id: 2, type: NAVIGATION_ITEM_TYPES_ENUM.MODULE }, allDefaultConfigDumpModules)
    assert.deepEqual(results, {
      item: { // modules not marked as home should return through item field
        id: 2,
        type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
      },
      homeItem: null,
      newModules: allDefaultConfigDumpModules.slice(1),
    }, 'A found module should be correctly filtered')

    // a missing module (returning previous home)
    results = filterItem({ id: 18, type: NAVIGATION_ITEM_TYPES_ENUM.MODULE }, allDefaultConfigDumpModules, 'something')
    assert.deepEqual(results, {
      item: null,
      homeItem: 'something', // reported from parameters
      newModules: allDefaultConfigDumpModules,
    }, 'A module not found should be correctly filtered')

    // a section (containing home) and its  children
    results = filterItem({
      id: 99,
      type: NAVIGATION_ITEM_TYPES_ENUM.SECTION,
      aField: 'xxx',
      children: [{ // home module
        id: 5,
        type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
      }, { // a module not found
        id: 88,
        type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
      }, {// a module found
        id: 3,
        type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
      }],
    }, allDefaultConfigDumpModules)
    assert.deepEqual(results, {
      item: {
        id: 99,
        type: NAVIGATION_ITEM_TYPES_ENUM.SECTION,
        aField: 'xxx', // other fields should be reported
        children: [{ // only found child not home
          id: 3,
          type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
        }],
      },
      homeItem: {
        id: 5,
        type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
      },
      // found modules should have been removed
      newModules: allDefaultConfigDumpModules.filter(module => module.content.id !== 3 && module.content.id !== 5),
    })
  })
  it('(filterItems) should filter correctly an items list', () => {
    // 1 - just filter all and check only sections remain
    let results = filterItems(aNavigationConfiguration, [], null)
    assert.equal(results.homeItem, null, 'Home item should not be retrieved')
    assert.deepEqual(results.newModules, [], 'No new module should be added, by the way')
    assert.lengthOf(results.items, 2, 'Only sections should remain in items configuration')

    // 2 - filter on configuration model and check home module, other modules and sections was retrieved
    results = filterItems(aNavigationConfiguration, allDefaultConfigDumpModules, null)
    assert.deepEqual(results.homeItem, {
      id: 5,
      type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
      visibilityMode: VISIBILITY_MODES_ENUM.ALWAYS,
    }, 'Home item should not be retrieved')
    assert.deepEqual(results.newModules, [], 'All modules should have been found')
    assert.lengthOf(results.items, aNavigationConfiguration.length - 1, 'All items should still be at root level, except home (returned separately)')
  })
  it('(getItemPathIn) should retrieve correctly item path', () => {
    let path = getItemPathIn(aNavigationConfiguration, {
      id: 5,
      type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
    })
    assert.deepEqual(path, [0], 'Path [0] should be found for module 5')

    path = getItemPathIn(aNavigationConfiguration, {
      id: 6,
      type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
    })
    assert.deepEqual(path, [2], 'Path [2] should be found for module 6')

    path = getItemPathIn(aNavigationConfiguration, {
      id: 2,
      type: NAVIGATION_ITEM_TYPES_ENUM.SECTION,
    })
    assert.deepEqual(path, [3], 'Path [3] should be found for section 2')

    path = getItemPathIn(aNavigationConfiguration, {
      id: 1,
      type: NAVIGATION_ITEM_TYPES_ENUM.SECTION,
    })
    assert.deepEqual(path, [1, 1], 'Path [1, 1] should be found for section 1')

    path = getItemPathIn(aNavigationConfiguration, {
      id: 4,
      type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
    })
    assert.deepEqual(path, [1, 1, 1], 'Path [1, 1, 1] should be found for module 4')

    path = getItemPathIn(aNavigationConfiguration, {
      id: 99,
      type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
    })
    assert.isNull(path, 'No path should be retrieved for unexisting module 99')

    path = getItemPathIn(aNavigationConfiguration, {
      id: 52,
      type: NAVIGATION_ITEM_TYPES_ENUM.SECTION,
    })
    assert.isNull(path, 'No path should be retrieved for unexisting section area 52')
  })
  it('(getItemByPathIn) should retrieve correctly items by path', () => {
    // note: getItemByPathIn requires path to be an aray, where length >= 1
    let item = getItemByPathIn(aNavigationConfiguration, [0])
    assert.equal(item.id, 5, 'Module 5 should be found at path [0]')
    assert.equal(item.type, NAVIGATION_ITEM_TYPES_ENUM.MODULE, '... and should be a module...')

    item = getItemByPathIn(aNavigationConfiguration, [1, 1, 1])
    assert.equal(item.id, 4, 'Module 4 should be found at path [1, 1, 1]')
    assert.equal(item.type, NAVIGATION_ITEM_TYPES_ENUM.MODULE, '... and should be a module...')

    item = getItemByPathIn(aNavigationConfiguration, [1, 1])
    assert.equal(item.id, 1, 'Section 1 should be found at path [1, 1]')
    assert.equal(item.type, NAVIGATION_ITEM_TYPES_ENUM.SECTION, '... and should be a section...')

    item = getItemByPathIn(aNavigationConfiguration, [3])
    assert.equal(item.id, 2, 'Section 2 should be found at path [3]')
    assert.equal(item.type, NAVIGATION_ITEM_TYPES_ENUM.SECTION, '... and should be a section...')
  })
  it('(getParentPath) should return correct parent path', () => {
    // note: getParentPath requires path to be an aray, where length >= 1
    assert.deepEqual(getParentPath([1, 1, 0]), [1, 1])
    assert.deepEqual(getParentPath([1]), [])
    assert.deepEqual(getParentPath([5]), [])
  })
  it('(getParentByPath) should return correct parent path', () => {
    // note: getParentPath requires path to be an aray, where length >= 1
    let parent = getParentByPath(aNavigationConfiguration, [1])
    assert.isNull(parent, 'Should return null for root items')

    parent = getParentByPath(aNavigationConfiguration, [1, 1])
    assert.equal(parent.id, 0, 'Parent should section 0')
    assert.equal(parent.type, NAVIGATION_ITEM_TYPES_ENUM.SECTION, 'Parent should section 0')

    parent = getParentByPath(aNavigationConfiguration, [1, 1, 0])
    assert.equal(parent.id, 1, 'Parent should section 1')
    assert.equal(parent.type, NAVIGATION_ITEM_TYPES_ENUM.SECTION, 'Parent should section 1')
  })
  it('(findAllModules) should return all modules in tree parent path', () => {
    // note: getParentPath requires path to be an aray, where length >= 1
    let allModules = findAllModules(aNavigationConfiguration)
    const expectedModulesId = [2, 3, 4, 5, 6]
    assert.lengthOf(allModules, expectedModulesId.length)
    expectedModulesId.forEach((id) => {
      if (!allModules.find(module => module.id === id && module.type === NAVIGATION_ITEM_TYPES_ENUM.MODULE)) {
        assert.fail(`The module ${id} was not retrieved in all modules`)
      }
    })

    allModules = findAllModules([])
    assert.lengthOf(allModules, 0, 'No module should be retrieved in empty tree')
  })

  it('(findAllSections) should return all sections in tree parent path', () => {
    // note: getParentPath requires path to be an aray, where length >= 1
    let allSections = findAllSections(aNavigationConfiguration)
    const expectedSectionId = [0, 1, 2]
    assert.lengthOf(allSections, expectedSectionId.length, 'all sections should be retrieved')
    expectedSectionId.forEach((id) => {
      if (!allSections.find(section => section.id === id && section.type === NAVIGATION_ITEM_TYPES_ENUM.SECTION)) {
        assert.fail(`The section ${id} was not retrieved in all sections`)
      }
    })

    allSections = findAllModules([])
    assert.lengthOf(allSections, 0, 'No section should be retrieved in empty tree')
  })

  it('(removeItemAt) should delete the right item at path', () => {
    // note: getParentPath requires path to be an aray, where length >= 1
    let initiallyDeletedItem = getItemByPathIn(aNavigationConfiguration, [1])
    let afterRemovalTree = removeItemAt(aNavigationConfiguration, [1])
    assert.lengthOf(afterRemovalTree, aNavigationConfiguration.length - 1)
    assert.isNotOk(getItemPathIn(afterRemovalTree, initiallyDeletedItem), 'item should no longer be found in tree')

    initiallyDeletedItem = getItemByPathIn(aNavigationConfiguration, [1, 1, 0])
    afterRemovalTree = removeItemAt(aNavigationConfiguration, [1, 1, 0])
    assert.isNotOk(getItemPathIn(afterRemovalTree, initiallyDeletedItem), 'item should no longer be found in tree')
  })
  it('(moveItemAtPath) should insert an item path', () => {
    // move module [1,1,0] after module [1,1,1]
    // expected:
    // parent still has 2 chilren
    // item [1,1,0] path is now [1,1,1] (as it was removed at position [1,2,0])
    // item [1,1,1] path is now [1,1,0]
    // Note: when moving an item, we ignore its old position
    const movedItem1 = getItemByPathIn(aNavigationConfiguration, [1, 1, 0])
    const previouslyAfterSibling = getItemByPathIn(aNavigationConfiguration, [1, 1, 1])
    const afterMoveTree1 = moveItemAtPath(aNavigationConfiguration, movedItem1, [1, 1, 2])
    assert.lengthOf(getItemByPathIn(afterMoveTree1, [1, 1]).children, 2, 'Parent section should still have 2 children')
    assert.deepEqual(getItemPathIn(afterMoveTree1, previouslyAfterSibling), [1, 1, 0], '[1, 1, 1] should now be [1, 2, 0]')
    assert.deepEqual(getItemPathIn(afterMoveTree1, movedItem1), [1, 1, 1], '[1, 1, 0] should now be [1, 2, 1]')

    // move module [1,1,1] into section [3]
    const movedItem2 = getItemByPathIn(aNavigationConfiguration, [1, 1, 1])
    const afterMoveTree2 = moveItemAtPath(aNavigationConfiguration, movedItem2, [3, 0])
    assert.lengthOf(getItemByPathIn(afterMoveTree2, [1, 1]).children, 1, 'Old parent section should have one child less')
    assert.lengthOf(getItemByPathIn(afterMoveTree2, [3]).children, 1, 'New parent section should have one more child')
    assert.deepEqual(getItemPathIn(afterMoveTree2, movedItem2), [3, 0], '[1, 1, 1] should now be [3, 0]')

    // move section [1] at position [4] (should be 3 as its own index is taken in account)
    const movedItem3 = getItemByPathIn(aNavigationConfiguration, [1])
    const afterMoveTree3 = moveItemAtPath(aNavigationConfiguration, movedItem3, [4])
    assert.lengthOf(afterMoveTree3, 4, 'Root elements should have the same number of children')
    assert.deepEqual(getItemPathIn(afterMoveTree3, movedItem3), [3], 'Section [1] should now be [3]')
  })
})
