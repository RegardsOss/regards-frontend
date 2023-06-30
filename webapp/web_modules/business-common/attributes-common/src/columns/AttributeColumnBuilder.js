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
import get from 'lodash/get'
import { DamDomain } from '@regardsoss/domain'
import { TableColumnBuilder } from '@regardsoss/components'
import { buildRenderDelegate } from '../render/AttributesTypeToRender'

/**
 * Helper to build data model attribute table columns
 * @author Raphaël Mechali
 */

/**
 * Returns render delegates for attributes
 * @param {*} attributes attributes, an array of elements matching ResultsContext#AttributeAndRender
 * @return {path:{string}, RenderConstructor:{function}} delegate builder with props
 */
function buildRenderDelegates(attributes) {
  return attributes.map(({
    renderer,
    model: {
      content: {
        jsonPath,
        type,
        precision,
        unit,
      },
    },
  }) => buildRenderDelegate(`content.${jsonPath}`, type, precision, unit, renderer))
}

/**
 * Builds an attribute column
 * @param {*} presentationModel an attribute presentation model, see AttributePresentationModel shape
 * @param {func} onSort on sort callback
 * @param {string} locale the locale to resolve label to use for column
 * @return {TableColumnConfiguration} column built
 */
function buildAttributeColumn({
  key, label, visible = true, attributes,
  enableSorting, sortOrder, sortIndex,
}, onSort, locale) {
  if (attributes.length < 1) {
    throw new Error(`An attribute presentation model must have attributes! (${key}/${label.en})`)
  }
  // 1 - build common column elements
  const columnBuilder = new TableColumnBuilder(key)
    .label(get(label, locale, ''))
    .visible(visible)
    .propertiesRenderCell(buildRenderDelegates(attributes))
  // 2 - determine column header, width and render
  // check, by key, if we are currently rendering the thumbnail column
  const isThumbnailColumn = attributes.length === 1
    && DamDomain.AttributeModelController.standardAttributesKeys.thumbnail === attributes[0].model.content.name
  if (isThumbnailColumn) {
    // thumbnail attribute: no header, fixed width
    columnBuilder.optionsSizing(1)
  } else {
    // a common single or attributes group column: dynamic width (unspecified) and header
    const isSortable = attributes.length === 1 && enableSorting
    if (isSortable) {
      // default column: if sorting enabled, sorting header
      columnBuilder.sortableHeaderCell(sortOrder, sortIndex, onSort)
    } else { // group column: never sortable, show only the title
      columnBuilder.titleHeaderCell()
    }
  }
  return columnBuilder.build()
}

export default {
  buildRenderDelegates,
  buildAttributeColumn,
}
