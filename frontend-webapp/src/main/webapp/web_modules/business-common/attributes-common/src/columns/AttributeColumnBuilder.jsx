/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DamDomain } from '@regardsoss/domain'
import { TableColumnBuilder } from '@regardsoss/components'
import getTypeRender from '../render/AttributesTypeToRender'

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
  return attributes.map(attrModel => ({
    path: `content.${attrModel.content.jsonPath}`,
    RenderConstructor: getTypeRender(attrModel.content.type),
  }))
}

/**
 * Builds an attribute column
 * @param {*} presentationModel an attribute presentation model, see AttributePresentationShape
 * @return {TableColumnConfiguration} column built
 */
function buildAttributeColumn({ key, label, attributes, order, enableSorting, sortOrder }, visible, onSort, fixedColumnsWidth) {
  if (attributes.length < 1) {
    throw new Error(`An attribute presentation model must have attributes! (${key}/${label})`)
  }

  const isSpecialAttr = attributes.length === 1 && [
    DamDomain.AttributeModelController.ATTRIBUTE_TYPES.THUMBNAIL, DamDomain.AttributeModelController.ATTRIBUTE_TYPES.DOWNLOAD_LINK,
  ].includes(attributes[0].content.type)
  const isSortable = attributes.length === 1 && enableSorting

  // 1 - determine column header and width
  let columnHeader
  let columnWidth
  if (isSpecialAttr) {
    // special attributes: no header, fixed width
    columnHeader = null
    columnWidth = fixedColumnsWidth
  } else if (isSortable) {
    // default column: if sorting enabled, sorting header
    // width: undefined (growing column)
    columnHeader = TableColumnBuilder.buildSortableColumnHeader(key, label, false,
      enableSorting, sortOrder, onSort)
  } else {
    columnHeader = TableColumnBuilder.buildTitleColumnHeader(key, label)
  }

  // 2 - detemines cell rendeer
  return TableColumnBuilder.buildColumn(key, label, columnHeader,
    TableColumnBuilder.buildPropertiesRenderCell(buildRenderDelegates(attributes)), visible, order, columnWidth)
}


export default { buildRenderDelegates, buildAttributeColumn }
