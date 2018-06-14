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
import get from 'lodash/get'
import { DamDomain } from '@regardsoss/domain'
import { TableColumnBuilder } from '@regardsoss/components'
import { buildRenderDelegate, buildThumbnailRenderDelegate } from '../render/AttributesTypeToRender'

/**
 * Helper to build data model attribute table columns
 * @author Raphaël Mechali
 */

/**
 * Returns render delegates for attributes
 * @param {*} attributes attributes
 * @return {path:{string}, RenderConstructor:{function}} delegate builder with props
 */
function buildRenderDelegates(attributes) {
  return attributes.map(({ content }) => buildRenderDelegate(`content.${content.jsonPath}`, content.type, content.unit))
}

/**
 * Returns thumbnail render delegate as array
 * @param {*} thumbnailAttribute thumbnail attribute
 * @return {path:{string}, RenderConstructor:{function}} delegate builder with props
 */
function buildThumbnailDelegates(thumbnailAttribute) {
  return [buildThumbnailRenderDelegate(`content.${thumbnailAttribute.content.jsonPath}`)]
}

/**
 * Builds an attribute column
 * @param {*} presentationModel an attribute presentation model, see AttributePresentationModel shape
 * @param {bool} visible is column visible
 * @param {func} onSort on sort callback
 * @param {number} fixedColumnsWidth fixed columns width for options and alike
 * @param {string} locale the locale to resolve label to use for column
 * @return {TableColumnConfiguration} column built
 */
function buildAttributeColumn({
  key, label, attributes, order,
  enableSorting, sortOrder, sortIndex,
}, visible, onSort, fixedColumnsWidth, locale) {
  if (attributes.length < 1) {
    throw new Error(`An attribute presentation model must have attributes! (${key}/${label})`)
  }
  // 0 - precompute column label
  const columnLabel = get(label, locale, '')
  // 1 - determine column header, width and render
  let columnHeader
  let columnWidth
  let renderDelegates
  // check, by key, if we are currently rendering the thumbnail column
  const isThumbnailColumn = attributes.length === 1 &&
    DamDomain.AttributeModelController.standardAttributesKeys.thumbnail === attributes[0].content.name
  if (isThumbnailColumn) {
    // thumbnail attribute: no header, fixed width, single picture delegate
    columnHeader = null
    columnWidth = fixedColumnsWidth
    renderDelegates = buildThumbnailDelegates(attributes[0])
  } else {
    // a common single or attributes group column: build attributes render delegates, keep width undefined (not fixed) and prepare header
    renderDelegates = buildRenderDelegates(attributes)
    const isSortable = attributes.length === 1 && enableSorting
    if (isSortable) {
      // default column: if sorting enabled, sorting header
      columnHeader = TableColumnBuilder.buildSortableColumnHeader(
        key, columnLabel, false, enableSorting,
        sortOrder, sortIndex, onSort)
    } else { // group column: never sortable
      columnHeader = TableColumnBuilder.buildTitleColumnHeader(key, columnLabel)
    }
  }

  // 2 - Build column (note: we append sort order and index to let table re-render when those model values change)
  return TableColumnBuilder.buildColumn(
    key, columnLabel, columnHeader, TableColumnBuilder.buildPropertiesRenderCell(renderDelegates),
    visible, order, columnWidth, sortOrder, sortIndex)
}


module.exports = { buildRenderDelegates, buildThumbnailDelegates, buildAttributeColumn }
