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
import reduce from 'lodash/reduce'
import split from 'lodash/split'

/**
 * Check if the given entity contains values for the atributes from the given table column configuration.
 *
 * @param column
 * @param entity
 * @returns {boolean}
 *
 * @author Sébastien Binda
 */
const doesEntityValuesNotEmptyForColumnConfiguration = (column, entity) => {
  if (entity && entity.content) {
    let noEmpty = false
    let i = 0
    for (i = 0; i < column.attributes.length; i += 1) {
      noEmpty = noEmpty || reduce(
        split(column.attributes[i], '.'),
        (result, value, key) => {
          if (result) {
            return result[value]
          }
          return null
        }, entity.content,
      ) !== null
    }
    return noEmpty
  }
  return false
}

/**
 * Get the specific rendered value of the entity for the given table column configuration.
 *
 * @param column : Column to render
 * @param entity : Entity to display
 * @param lineHeight : Table lineHeight configuration
 * @param isTableSelected : Does the entity selected into the table ?
 * @param selectTableEntityCallback : Callback to add the current entity to the table list of selected entities
 * @returns {*}
 */
const getConfiguredColumnValueForEntity = (column, entity, lineHeight, isTableSelected, selectTableEntityCallback, rowIndex) => {
  const rendererComponent = column.customCell
  if (entity && entity.content) {
    let i = 0
    // If a custom renderer is provided use it
    if (rendererComponent) {
      const attributes = {}
      for (i = 0; i < column.attributes.length; i += 1) {
        attributes[column.attributes[i]] = reduce(
          split(column.attributes[i], '.'),
          (result, value, key) => {
            if (result) {
              return result[value]
            }
            return null
          }, entity.content,
        )
      }
      return React.createElement(rendererComponent.component, {
        attributes,
        rowIndex,
        entity,
        lineHeight,
        isTableSelected,
        selectTableEntityCallback,
        ...rendererComponent.props,
      })
    }
    // No custom component, render attribute as a string.
    let resultValue = ''
    for (i = 0; i < column.attributes.length; i += 1) {
      const attrValue = reduce(split(column.attributes[i], '.'), (result, value, key) => {
        if (result) {
          return result[value]
        }
        return ''
      }, entity.content)
      resultValue += ` ${attrValue}`
    }
    return resultValue
  }
  return null
}

export default {
  doesEntityValuesNotEmptyForColumnConfiguration,
  getConfiguredColumnValueForEntity,
}
