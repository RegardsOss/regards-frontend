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
import find from 'lodash/find'
import { AccessDomain, DamDomain } from '@regardsoss/domain'
import { TableColumnBuilder, PropertiesRenderCell } from '@regardsoss/components'
import getTypeRender from '../render/AttributesTypeToRender'

/**
 * Helper to build data model attribute table columns
 * @author Raphaël Mechali
 */

/**
 * Returns attribute configuration from attribute qualified name and dynamic attribute models
 * @param attributeFullQualifiedName attribute full qualified name
 * @param attributeModels dynamic attributes models
 * @return found model or null
 */
function getAttributeConfiguration(attributeFullQualifiedName, attributeModels) {
  // 1.a - standard attribute?
  if (AccessDomain.AttributeConfigurationController.isStandardAttributeQualifiedName(attributeFullQualifiedName)) {
    return AccessDomain.AttributeConfigurationController.getStandardAttributeConf(attributeFullQualifiedName)
  }
  // 1.b - dynamic attribute? (undefined if not found)
  return find(attributeModels, att =>
    DamDomain.AttributeModelController.getAttributeAccessPath(att) === attributeFullQualifiedName)
}

/**
 * Builds an attribute column
 * @param {string} attributeFullQualifiedName attribute full qualified name
 * @param {[AttributeModel]} attributeModels dynamic attributes models
 * @param {boolean} enableSorting should enable sorting?
 * @param {TableSortOrders} sortingOrder column sorting order
 * @param {function} onSort onSort callback
 * @param {boolean} visible is column visible?
 * @param {number} order column order (optional)
 * @param {number} fixedColumnsWidth fixed column width (used only for fixed column)
 * @return {TableColumnConfiguration} column built or null, see ColumnConfiguration in @regardsoss/components table
 */
function buildAttributeColumn(attributeFullQualifiedName, attributeModels, enableSorting,
  sortingOrder, onSort, visible, order, fixedColumnsWidth) {
  // 1 - retrieve the attribute model
  const attributeConfiguration = getAttributeConfiguration(attributeFullQualifiedName, attributeModels)

  // 2 - Build table column when found
  if (attributeConfiguration) {
    const isSpecialAttr =
      attributeConfiguration.content.type === DamDomain.AttributeModelController.ATTRIBUTE_TYPES.THUMBNAIL ||
      attributeConfiguration.content.type === DamDomain.AttributeModelController.ATTRIBUTE_TYPES.DOWNLOAD_LINK

    // TODO both thumbnail and download should not be rendered that way!

    let columnHeader
    let columnWidth
    const key = attributeFullQualifiedName
    const label = attributeConfiguration.content.label
    if (isSpecialAttr) {
      // special attributes: no header, fixed width
      columnHeader = null
      columnWidth = fixedColumnsWidth
    } else {
      // default column: if sorting enabled, sorting header
      // width: undefined (growing column)
      columnHeader = TableColumnBuilder.buildSortableColumnHeader(attributeFullQualifiedName, label, false,
        enableSorting, sortingOrder, onSort)
    }
    return TableColumnBuilder.buildColumn(key, label, columnHeader, {
      Constructor: PropertiesRenderCell, // cell for attribute paths
      props: {
        RenderDelegateConstructor: getTypeRender(attributeConfiguration.content.type),
        properties: [`content.${attributeConfiguration.content.jsonPath}`], // access to attribute within the entity
      },
    }, visible, order, columnWidth)
  }
  return null
}

/**
 * Returns attribute configuration from attribute qualified name and dynamic attribute models
 * @param id attribute ID
 * @param attributeModels dynamic attributes models
 * @return found model or null
 */
function getAttributeConfigurationById(id, attributeModels) {
  return find(attributeModels, attribute => attribute.content.id === id)
}

/**
 * Builds an attribute group column
 * @param {[string]} attributesFullQualifiedNames attributes full qualified name as string array
 * @param {[AttributeModel]} attributeModels dynamic attributes models
 * @param {string} label attributes group label
 * @param {boolean} visible is column visible?
 * @param {number} order column order (optional)
 * @return {TableColumnConfiguration} column built or null, see ColumnConfiguration in @regardsoss/components table
 */
function buildAttributesGroupColumn(attributesQualifiedNames, attributeModels, label, visible, order) {
  // 1 - resolve as many attributes configurations (filter non found)
  const configurations = attributesQualifiedNames
    .map(id => getAttributeConfigurationById(id, attributeModels)).filter(configuration => !!configuration)
  if (configurations.length) {
    // 2 - resolve type render from attributes group (default to null to get the DEFAULT cell type)
    const commonCellType = configurations.reduce((commonType, { content: { type } }) =>
      type === commonType ? commonType : null, configurations[0].content.type)
    return TableColumnBuilder.buildColumn(label, label,
      TableColumnBuilder.buildTitleColumnHeader(label, label), {
        Constructor: PropertiesRenderCell, // cell for attribute paths
        props: {
          RenderDelegateConstructor: getTypeRender(commonCellType), // type render defaults to DEFAULT when no common type is found
          properties: configurations.map(configuration => `content.${configuration.content.jsonPath}`), // properties to access entity value
        },
      }, visible, order)
  }
  // no attribute resolved
  return null
}

export default {
  buildAttributeColumn,
  buildAttributesGroupColumn,
}
