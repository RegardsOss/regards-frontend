/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Query from '../../common/query/abstract/Query'
import AttributeModelController from '../../dam/AttributeModelController'

/**
 * Manages an open search query parameter as a complete query (with its own separator and such)
 * @author Raphaël Mechali
 */
export default class OpenSearchQuery extends Query {
  /** Parameters separator */
  static PARAMETERS_SEPARATOR = ' AND '

  /** Standard Attributes Parameter Name shortcut (avoids using DamDomain.AttributeController...) */
  static SAPN = {
    id: AttributeModelController.getStandardAttributeModel(AttributeModelController.standardAttributesKeys.id).content.jsonPath,
    providerId: AttributeModelController.getStandardAttributeModel(AttributeModelController.standardAttributesKeys.providerId).content.jsonPath,
    label: AttributeModelController.getStandardAttributeModel(AttributeModelController.standardAttributesKeys.label).content.jsonPath,
    model: AttributeModelController.getStandardAttributeModel(AttributeModelController.standardAttributesKeys.model).content.jsonPath,
    tags: AttributeModelController.getStandardAttributeModel(AttributeModelController.standardAttributesKeys.tags).content.jsonPath,
    geometry: AttributeModelController.getStandardAttributeModel(AttributeModelController.standardAttributesKeys.geometry).content.jsonPath,
    version: AttributeModelController.getStandardAttributeModel(AttributeModelController.standardAttributesKeys.version).content.jsonPath,
    last: AttributeModelController.getStandardAttributeModel(AttributeModelController.standardAttributesKeys.last).content.jsonPath,
  }

  /** Open search query parameter name: Entity parent dataset model Ids */
  static DATASET_MODEL_NAMES_PARAM = 'datasetModelNames'

  /**
   * Constructor
   * @param {[*]} parameters array of QueryParameter
   * @param {String} rootQuery any root query, to be added before parameters
   */
  constructor(parameters = [], rootQuery = '') {
    super(rootQuery, OpenSearchQuery.PARAMETERS_SEPARATOR, parameters)
  }
}
