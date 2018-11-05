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
import isNumber from 'lodash/isNumber'
import { DamDomain } from '@regardsoss/domain'
import { TableColumnBuilder } from '@regardsoss/components'
import { TableSortOrders } from '../../../../components/src/table/model/TableSortOrders'

/**
 * Helper tools to convert module attributes configuration into presentation models for graphical components
 * @author Raphaël Mechali
 */

/**
 * List of attributes the server cannot sort on
 */
const nonSortableAttributes = [
  DamDomain.AttributeModelController.getStandardAttributeModel(
    DamDomain.AttributeModelController.standardAttributesKeys.thumbnail).content.jsonPath,
]
/**
 * Is attribute as parameter (by its name) sortable
 * @param {*} attributeFullQualifiedName attributeFullQualifiedName
 */
function isSortableAttribute(attributeFullQualifiedName) {
  return !nonSortableAttributes.includes(attributeFullQualifiedName)
}

/**
 * Builds an attributes group presentation model
 * @param {[*]} attributeModels attributes models (previsouly retrieved from server)
 * @param {*} columnConfiguration  attributes group configuration
 * @param {[{*}]} initialSorting configured initial sorting
 * @param {bool} allowsSorting is sorting allowed in current context
 * @param {number} index index in configured columns list, that can be safely used here as a key
 * @return {*} presentation model or null
 */
export function buildPresentationModel(attributeModels = {}, { label, attributes = [] }, initialSorting, allowsSorting, index) {
  // 1 - Retrieve all attributes that can be retrieved
  const columnAttributeModels = attributes.map(({ name }) => DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName(name, attributeModels))
    .filter(model => !!model) // remove non retrieved models
  if (!columnAttributeModels.length) {
    return null // cannot show that column as no attribute could be retrieved
  }

  // compute sorting related data (sorting is allowed only for single attributes columns)
  const enableSorting = allowsSorting && attributes.length === 1 && isSortableAttribute(attributes[0].name)
  // initial sorting may be on this column, if it is a single element sorting with only one attribute
  // note: it is used only in lists
  let defaultSorting = false
  if (enableSorting && initialSorting && initialSorting.length === 1) {
    const initialSortingAttributes = initialSorting[0].attributes
    defaultSorting = initialSortingAttributes.length === 1
      && initialSortingAttributes[0].name === attributes[0].name
  }

  // 1.b - convert into attribute model as some attributes where found
  return {
    key: `configured.column.${index}`,
    label,
    visible: true,
    attributes: columnAttributeModels,
    enableSorting,
    sortOrder: TableSortOrders.NO_SORT,
    sortIndex: null,
    defaultSorting,
  }
}

/**
 * @param {string} key placeholder column key
 * @return {presentationModel} built presentation model
 */
export function buildColumnPlaceholder(key) {
  return {
    key,
    visible: true,
    enableSorting: false,
    sortOrder: TableSortOrders.NO_SORT,
  }
}

/**
 * Builds attributes columns models from attribute models and attributes configurations
 * @param {[*]} attributeModels attributes models (previsouly retrieved from server)
 * @param {[{*}]} configuredColumns configured columns, matches AttributeListConfigurationModel shape
 * @param {[{*}]} initialSorting configured initial sorting
 * @param {boolean} allowsSorting is sorting allowed in current context?
 * @param {boolean} selectionAllowed is selection allowed?
 * @return {[{*}]} built attributes presentation model (filters those with no matching attribute model)
 */
export function buildAttributesPresentationModels(attributeModels = {}, configuredColumns = [], initialSorting = [], allowsSorting = false, selectionAllowed = false) {
  return [
    // 1 - selection if enabled for current
    selectionAllowed ? buildColumnPlaceholder(TableColumnBuilder.selectionColumnKey) : null,
    // 2 - build the presentation model, or null when no attribute model could be retrieved (filter null elements)
    ...configuredColumns.map((c, index) => buildPresentationModel(attributeModels, c, initialSorting, allowsSorting, index)),
    // 3 - options columns
    buildColumnPlaceholder(TableColumnBuilder.optionsColumnKey),
  ].filter(model => !!model)
}

/**
 * Updates sort order of attributes presentation model as parameter
 * @param {[{*}]} presentationModels attributes presentation models as built by this helper (maybe updated)
 * @param {sting} key updated model key
 * @param {string} newSortOrder new sort order form TableSortOrders
 * @return {[{*}]} updated attributes presentation model
 */
export function changeSortOrder(presentationModels, key, newSortOrder, removeOtherSorting) {
  // 0 - retrieve model (pre: it can be retrieved!)
  const changedColumnIndex = presentationModels.findIndex(presentationModel => presentationModel.key === key)
  const changedColumn = presentationModels[changedColumnIndex]
  // Case 1: adding a new column or swithing column order
  if (newSortOrder !== TableSortOrders.NO_SORT) {
    // In table, add sorting at end. In list remove other sorting columns
    // 1.a - compute column sort index
    const isSwitching = changedColumn.sortOrder !== TableSortOrders.NO_SORT
    let newSortIndex = 0
    if (!removeOtherSorting) {
      if (isSwitching) { // switching column, restore previous sort index
        newSortIndex = changedColumn.sortIndex
      } else { // adding new column, compute max sort index +1 (defaults to 0)
        newSortIndex = presentationModels.reduce((maxSortIndex, attrModel) => isNumber(attrModel.sortIndex) ? Math.max(maxSortIndex, attrModel.sortIndex) : maxSortIndex, -1) + 1
      }
    }
    // update column and full module if removeOtherSorting
    // update presentation models to hold the new sorting order and index
    return presentationModels.map((presentationModel) => {
      let { sortOrder, sortIndex } = presentationModel
      if (presentationModel.key === key) { // update the modified column
        sortOrder = newSortOrder
        sortIndex = newSortIndex
      } else if (removeOtherSorting) { // clear other columns sorting
        sortOrder = TableSortOrders.NO_SORT
        sortIndex = null
      }
      return { ...presentationModel, sortOrder, sortIndex }
    })
  }
  // Case 2: removing an existing sorting: every following sort index should worth -1
  return presentationModels.map((presentationModel) => {
    let { sortOrder, sortIndex } = presentationModel
    if (presentationModel.key === key) { // update the modified column
      sortOrder = TableSortOrders.NO_SORT
      sortIndex = null
    } else if (isNumber(sortIndex) && sortIndex > changedColumn.sortIndex) { // this column is after remove one, index -1
      sortIndex -= 1
    }
    return { ...presentationModel, sortOrder, sortIndex }
  })
}

/**
 * Builds ordered sorting on array from attributes presentation model
 * @return {[{*}]} presentationModel  presentation models as built by this helper
 * @return {[{attributePath: string, type: string}]} ordered array (from first to last sorting attribute) where:
 * - attributePath is full qualified attribute path
 * - type is sort order type, TableSortOrders enum
 */
export function getSortingOn(presentationModels) {
  return presentationModels
    // 1 - clear non sorting columns
    .filter(({ sortOrder }) => sortOrder !== TableSortOrders.NO_SORT)
    // 2 - sort on order priority as user set it (ascending)
    .sort((model1, model2) => model1.sortIndex - model2.sortIndex)
    // 3 - convert into {attributePath, type} array
    .map(({ attributes, sortOrder }) => ({ attributePath: attributes[0].content.jsonPath, type: sortOrder }))
}

/**
 * Builds equivalent sorting parameters as getSortingOn but works on initialSorting configuration
 * @param {[{*}]} initialSorting configured initial sorting
 * @return {[{attributePath: string, type: string}]} ordered array (from first to last sorting attribute) where:
 * - attributePath is full qualified attribute path
 * - type is sort order type, TableSortOrders enum
 */
export function getInitialSorting(initialSorting = []) {
  return initialSorting.map(({ attributes }) => ({
    attributePath: attributes[0].name, // by configuration (see form), only one attribute is allowed for sorting
    type: TableSortOrders.ASCENDING_ORDER,
  }))
}
