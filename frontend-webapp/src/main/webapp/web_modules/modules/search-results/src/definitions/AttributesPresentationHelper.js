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
import map from 'lodash/map'
import find from 'lodash/find'
import { AccessDomain, DamDomain } from '@regardsoss/domain'
import { TableSortOrders } from '../../../../components/src/table/model/TableSortOrders'

/**
 * Helper tools to convert module attributes configuration into presentation models for graphical components
 * @author Raphaël Mechali
 */

/**
 * Returns attribute configuration from attribute qualified name and dynamic attribute models
 * @param attributeFullQualifiedName attribute full qualified name
 * @param attributeModels dynamic attributes models
 * @return found model or null
 */
function getAttributeConfigurationByName(attributeFullQualifiedName, attributeModels) {
  // 1.a - standard attribute?
  if (AccessDomain.AttributeConfigurationController.isStandardAttributeQualifiedName(attributeFullQualifiedName)) {
    return AccessDomain.AttributeConfigurationController.getStandardAttributeConf(attributeFullQualifiedName)
  }
  // 1.b - dynamic attribute? (undefined if not found)
  return find(attributeModels, att =>
    DamDomain.AttributeModelController.getAttributeAccessPath(att) === attributeFullQualifiedName)
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
 * List of attributes the server cannot sort on
 */
const nonSortableAttributes = [
  DamDomain.AttributeModelController.standardAttributesKeys.thumbnail,
  DamDomain.AttributeModelController.standardAttributesKeys.download,
]
/**
 * Is attribute as parameter (by its name) sortable
 * @param {*} attributeFullQualifiedName attributeFullQualifiedName
 */
function isSortableAttribute(attributeFullQualifiedName) {
  return !nonSortableAttributes.includes(attributeFullQualifiedName)
}

/**
 * Builds an attribute presentation model
 * @param {*} configuration  attributes configuration
 * @param {*} attributeModels attributes models (previsouly retrieved from server)
 * @param {boolean} enableSorting is sorting enabled in current context?
 * @return {*} presentation model or null
 */
function buildSimplePresentationModel(configuration, attributesModel, enableSorting) {
  // 0 - remove dummy and unvisible configurations (used for sorting or facets)
  if (!configuration || !configuration.visibility) {
    return null
  }
  // 1 - retrieve the attribute model
  const attributeFullQualifiedName = configuration.attributeFullQualifiedName
  const attributeModel = getAttributeConfigurationByName(attributeFullQualifiedName, attributesModel)
  if (!attributeModel) {
    return null
  }
  // 2 - bundle as presentation model
  return {
    key: attributeFullQualifiedName, // key can also be used to retrieve the attribute (helps for sorting / controlling visibility)
    label: attributeModel.content.label,
    attributes: attributeModel ? [attributeModel] : [], // single attribute
    enableSorting: enableSorting && isSortableAttribute(attributeFullQualifiedName), // yes if available in context and sortable
    sortOrder: TableSortOrders.NO_SORT,
    order: configuration.order,
  }
}

/**
 * Builds an attributes group presentation model
 * @param {*} configuration  attributes group configuration
 * @param {*} attributeModels attributes models (previsouly retrieved from server)
 * @return {*} presentation model or null
 */
function buildGroupPresentationModel(configuration, attributeModels) {
  // 0 - remove dummy and unvisible configurations (normally useless, but, as the attribute exists, we have to consider it here)
  if (!configuration || !configuration.visibility) {
    return null
  }

  // 1 - resolve as many attributes from configurations as possible (filter non found)
  const resolvedConfAttributeModels = configuration.attributes.map(id => getAttributeConfigurationById(id, attributeModels)).filter(c => !!c)

  // 2 - convert into attribute model
  return {
    key: configuration.label, // in attribute groups, key is label (supposed unique)
    label: configuration.label,
    attributes: resolvedConfAttributeModels, // group attribute models
    enableSorting: false, // cannotsort on groups
    sortOrder: TableSortOrders.NO_SORT,
    order: configuration.order,
  }
}

/**
 * Builds attributes columns models from attribute models and attributes configurations
 * @param {*} attributeModels attributes models (previsouly retrieved from server)
 * @param {*} simpleAttributesConf simple attributes configuration
 * @param {*} attributesGroupsConf attribute groups configuration
 * @param {boolean} enableSorting is sorting enabled in current context?
 *
 * @return the presentation models that could be built from actual attribute models (filters those with no matching model)
 */
function buildAttributesPresentationModels(attributeModels, simpleAttributesConf, attributesGroupsConf, enableSorting) {
  // convert attributes from configuration, then filter on null or empty attributes list
  // Note: That happens when a model is hidden or cannot be retrieved in attribute models
  return [
    ...map(simpleAttributesConf, conf => buildSimplePresentationModel(conf, attributeModels, enableSorting)),
    ...map(attributesGroupsConf, conf => buildGroupPresentationModel(conf, attributeModels)),
  ].filter(model => !!model && model.attributes.length)
}

module.exports = {
  buildAttributesPresentationModels,
}
