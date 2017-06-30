/**
 * LICENSE_PLACEHOLDER
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
        }, entity.content) !== null
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
          }, entity.content)
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
      if (entity.content[column.attributes[i]]) {
        resultValue += ` ${attrValue}`
      } else {
        resultValue += ` ${attrValue}`
      }
    }
    return resultValue
  }
  return null
}

export default {
  doesEntityValuesNotEmptyForColumnConfiguration,
  getConfiguredColumnValueForEntity,
}
