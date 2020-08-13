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
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { NAVIGATION_ITEM_TYPES_ENUM } from './NavigationItemTypes'
import { VISIBILITY_MODES_ENUM } from './VisibilityModes'

/**
 * Helpers for navigation tree items management
 * @author Raphaël Mechali
 */

/**
 * Builds an item fo dynamic module as parameter
 * @param {Module} module module with content
 * @return {ModuleItem} built ModuleItem
 */
export function buildItemForModule(module) {
  return {
    type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
    id: module.content.id,
    visibilityMode: VISIBILITY_MODES_ENUM.ALWAYS,
    visibleForRole: null,
  }
}

/**
* Verifies if item is still in module list.
* If it is: removes that module from currentModules list (as it was found)
* @param {NavigationEditionItem} navigation edition item
* @return {found: {boolean}, isHome: {boolean}, newModules: ModuleArray}
*/
export function filterModuleItem(item, currentModules) {
  const { nM: newModules, cDM: correspondingDynamicModule } = currentModules.reduce(
    ({ nM, cDM }, module) => ({
      nM: module.content.id === item.id ? nM : [...nM, module], // filter in new modules list
      cDM: module.content.id === item.id ? module : cDM, // keep reference
    }), { nM: [], cDM: null })
  return {
    found: !!correspondingDynamicModule,
    isHome: get(correspondingDynamicModule, 'content.page.home', false),
    newModules,
  }
}

let lazyFilterItems

/**
 * Filters recursively an item as follow:
 * - When it finds a module item:
 *   - when it is not found in dynamicModules, remove it
 *   - when it is found in dynamicModules, remove it from dynamic modules list (that is new module list) AND:
 *     - If it is home (and home wasn't found before), keep it in separate homeItem value but do not happend it in normal items list
 *     - If it isn't home, just restore it at its current location
 * - When it finds a section item, perform the same operation on each children
 * Note: it works recursively with filterItemsList
 * @param {NavigationEditionItem} item current navigation item
 * @param {ModuleArray} dynamicModules current list of new dynamic modules
 * @param {NavigationEditionItem} homeItem previously found home (undefined initially)
 * @returns {item: {NavigationEditionItem}, homeItem: {NavigationEditionItem}, newModules: {ModuleArray}}
 */
export function filterItem(item, dynamicModules = [], homeItem) {
  if (item.type === NAVIGATION_ITEM_TYPES_ENUM.MODULE) {
    // is it still present in known dynamic modules? (remove the module from new modules list at same time)
    const { found, isHome, newModules } = filterModuleItem(item, dynamicModules)
    // the home item was found if it is home item AND home was not found before
    const isHomeItem = !homeItem && isHome
    return {
      item: found && !isHomeItem ? item : null, // return item only when found and not home
      homeItem: found && isHomeItem ? item : (homeItem || null), // return homeItem only when found and home
      newModules,
    }
  }
  // a section item: never filtered
  if (item.type === NAVIGATION_ITEM_TYPES_ENUM.SECTION) {
    const { items, homeItem: childHomeItem, newModules } = lazyFilterItems(item.children, dynamicModules, homeItem)
    return {
      item: {
        ...item, // report main section fields
        children: items,
      },
      homeItem: homeItem || childHomeItem,
      newModules,
    }
  }
  // a link item: never filtered

  return {
    item: {
      ...item,
    },
    homeItem,
    newModules: dynamicModules,
  }
}

/**
 * Filters recursively items list by calling filter item for each item in list then:
 * - It removes NULL items (filtered elements)
 * - It keeps new modules list
 * - It keeps home item
 * Note: it works recursively with filterItem
 * @param {[NavigationEditionItem]} items navigation items
 * @param {ModuleArray} dynamicModules current list of new dynamic modules
 * @param {NavigationEditionItem} initialHomeItem previously found home (undefined initially)
 * @returns {items: {[NavigationEditionItem]}, homeItem: {NavigationEditionItem}, newModules: {ModuleArray}}
 */
lazyFilterItems = function filterItems(items, dynamicModules, initialHomeItem) {
  return items.reduce(({ items: previousItems, homeItem: previousHI, newModules: previousNM }, currentItem) => {
    const { item, homeItem, newModules } = filterItem(currentItem, previousNM, previousHI)
    return {
      items: item ? [...previousItems, item] : previousItems,
      newModules,
      homeItem,
    }
  }, { items: [], homeItem: initialHomeItem, newModules: [...dynamicModules] })
}

export const filterItems = lazyFilterItems

/**
 * Returns item path as successive index from root in navigation edition model
 * @param [{NavigationEditionItem}] items items to search
 * @return [{type: string, id: number}] search item or partial searched item with at least type and ID provided
 */
export function getItemPathIn(items, { type, id }) {
  for (let index = 0; index < items.length; index += 1) {
    const item = items[index]
    if (item.type === type && item.id === id) {
      // found the item, let parent caller append previous index
      return [index]
    }
    // not the searched item, is it in items below?
    if (item.type === NAVIGATION_ITEM_TYPES_ENUM.SECTION) {
      // search in sub items
      const subItemPath = getItemPathIn(item.children, { type, id })
      if (subItemPath) { // found
        return [index, ...subItemPath]
      }
    }
  }
  return null
}

/**
 * Returns item by its path
 * @param {[NavigationEditionItem]} items items list
 * @param {[number]} itemPath Item path (length >= 1, not null)
 * @returns {NavigationEditionItem} item
 */
export function getItemByPathIn(items, [firstIndex, ...nextIndex]) {
  if (!nextIndex.length) {
    return items[firstIndex]
  }
  return getItemByPathIn(items[firstIndex].children, nextIndex)
}

/**
 * Returns parent path for child path as parameter
 * @param {[number]} childPath child path
 * @returns {[number]} parent path
 */
export function getParentPath(childPath) {
  if (!childPath || childPath.length < 2) {
    return [] // root item
  }
  return childPath.slice(0, -1)
}

/**
 * Returns parent by child path as parameter
 * * @param {[NavigationEditionItem]} items items list
 * @param {[number]} childPath Item path (length >= 1, not null)
 * @returns {NavigationEditionItem} item
 */
export function getParentByPath(items, childPath) {
  const parentPath = getParentPath(childPath)
  return parentPath.length ? getItemByPathIn(items, parentPath) : null
}

/**
 * Find sub elements by condition on an items list.
 * @param {[{NavigationEditionItem}]} items items list
 * @param {function} predicate predicate like NavigationEditionItem => bool.
 * @return {[{NavigationEditionItem}]} elements that respect predicate
 */
export function findAll(items, predicate) { // recursive search for modules in deleted section
  return items.reduce((previouslyFoundItems, item) => {
    // A - does the element itself respect the predicate?
    const thisLevelItems = []
    if (predicate(item)) {
      // item itself respects the predicate
      thisLevelItems.push(item)
    }
    // B - Is it a section ? (if it is, search elements that respect predicate below)
    if (item.type === NAVIGATION_ITEM_TYPES_ENUM.SECTION) {
      thisLevelItems.push(...findAll(item.children, predicate))
    }
    // C - nothing found here
    return [...previouslyFoundItems, ...thisLevelItems]
  }, [])
}

/**
 * Simple module predicate
 * @param {*} item item
 * @return {boolean} true if item is a module
 */
export function isModule(item) {
  return item.type === NAVIGATION_ITEM_TYPES_ENUM.MODULE
}
/**
 * Finds all modules in items as parameter
 * @param {[{NavigationEditionItem}]} items items list
 * @return [{NavigationEditionItem}] found modules
 */
export function findAllModules(items) {
  return findAll(items, isModule)
}
/**
 * Simple section predicate
 * @param {*} item item
 * @return {boolean} true if item is a section
 */
export function isSection(item) {
  return item.type === NAVIGATION_ITEM_TYPES_ENUM.SECTION
}
/**
 * Finds all sections in items as parameter
 * @param {[{NavigationEditionItem}]} items items list
 * @return [{NavigationEditionItem}] found sections
 */
export function findAllSections(items) {
  return findAll(items, isSection)
}

/**
 * Simple link predicate
 * @param {*} item item
 * @return {boolean} true if item is a link
 */
export function isLink(item) {
  return item.type === NAVIGATION_ITEM_TYPES_ENUM.LINK
}
/**
 * Finds all links in items as parameter
 * @param {[{NavigationEditionItem}]} items items list
 * @return [{NavigationEditionItem}] found links
 */
export function findAllLinks(items) {
  return findAll(items, isLink)
}

/**
 * Removes an item by its path
 * @param {[{NavigationEditionItem}]} items navigation tree items
 * @param {[number]} itemPath path as index array (as produced by getItemPathIn), where length >= 1
 * @return a complete copy of items list where item pointed by itemPath was removed (only path elements are copied)
 */
export function removeItemAt(items, [firstIndex, ...remainingPath]) {
  if (!remainingPath.length) {
    // recursive break case: item to remove is at this level, remove it
    return items.filter((item, index) => index !== firstIndex)
  }
  // there is a parent item, search in its children
  return items.map((item, index) => index === firstIndex ? {
    // parent of the item to remove, get copy and remove in children
    ...item,
    children: removeItemAt(item.children, remainingPath),
  } : item, // not on path, return reference
  )
}
/**
 * Inserts an item at path as parameter
 * @param {[{NavigationEditionItem}]} items navigation tree items
 * @param {NavigationEditionItem} item item to insert
 * @param {[number]} insertAtPath insertion path, where length >= 1
 * @return a complete copy of items list where item was moved at insertAtPath
 */
function insertItemAtPath(items, item, [firstIndex, ...remainingIndex]) {
  if (!remainingIndex.length) {
    // insert level found
    return [
      ...items.slice(0, firstIndex), // items before the one to insert
      item, // item to insert
      ...(firstIndex < items.length ? items.slice(firstIndex) : []), // items after the one inserted
    ]
  }
  // an ancestor level
  return items.map((childItem, index) => index === firstIndex
    ? ({ // an ancestor section
      ...childItem,
      children: insertItemAtPath(childItem.children, item, remainingIndex),
    }) : childItem) // another tree element, not modified
}

/**
 * Computes insertion path after removal at path
 * @param [*] removalPath previous item position in tree
 * @param [*] insertionPath new item position in tree, computed with item at its previous position
 * @return {[number]} insertion path, computed with real tree path after item removal in tree
 */
function computeMoveAtPath([firstOldElt, ...oldPath], [firstNewElt, ...newPath]) {
  // we should update when the old path is terminal AND before new path
  if (isEmpty(oldPath)) {
    if (firstOldElt < firstNewElt) {
      // path is updated due to old element update
      return [firstNewElt - 1, ...newPath]
    }
    // the path is unchanged: old element was after in current level list
    return [firstNewElt, ...newPath]
  }
  if (isEmpty(newPath)) {
    // the path is unchanged: old element was deeper in tree, not in the same list
    return [firstNewElt]
  }
  if (firstOldElt === firstNewElt) {
    // recursive case: check in sub levels if old element was before new one (or one of its parents)
    return [firstNewElt, ...computeMoveAtPath(oldPath, newPath)]
  }
  // break case: old path has no influence on new one
  return [firstNewElt, ...newPath]
}

/**
 * Removes item and sub items in tree when found then insert it at new path
 * @param {[{NavigationEditionItem}]} items navigation tree items
 * @param {NavigationEditionItem} item item to move
 * @param {[number]} insertAtPath new item path, where length >= 1
 * @return a complete copy of items list where item was moved at insertAtPath
 */
export function moveItemAtPath(items, item, insertAtPath) {
  // note: we need here to handle the specific case  of moving an item in same items list:
  // when item was at position 1 for instance and is moved at 3, we must consider the index 3 - 1 (as it has been remove from elements before)
  const currentPath = getItemPathIn(items, item)

  // 1 - Perform remove if element is not new (update insertion index considering removal)
  let finalInsertAtPath = insertAtPath
  let updatedItems = items
  if (currentPath) {
    finalInsertAtPath = computeMoveAtPath(currentPath, insertAtPath)
    updatedItems = removeItemAt(items, currentPath)
  }
  // 2 - Perform insert on updated path and tree items
  return insertItemAtPath(updatedItems, item, finalInsertAtPath)
}

/**
 * Is target equal to source or part of its children?
 * @param {NavigationEditionItem} source source comparison element
 * @param {NavigationEditionItem} target target comparison element
 * @return {boolean} true if target is source element or if it is part of source elements children
 */
export function isChildOrSelf(source, target) {
  if (source.type === target.type && source.id === target.id) {
    return true
  }
  if (source.type === NAVIGATION_ITEM_TYPES_ENUM.SECTION) {
    // search in children
    return !!source.children.find((child) => isChildOrSelf(child, target))
  }

  return false
}
