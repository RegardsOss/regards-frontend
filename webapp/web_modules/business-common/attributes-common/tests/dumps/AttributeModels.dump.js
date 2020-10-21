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
import values from 'lodash/values'
import { DamDomain } from '@regardsoss/domain'
import { StringComparison } from '@regardsoss/form-utils'

/**
 * Descriptions attributes models dumps for module tests
 * @author Raphaël Mechali
 */

/**
 * Models as returned by the server
 */
export const attributeModelsDictionary = {
  1: {
    content: {
      id: 1,
      name: 'attr1',
      label: 'Attr1',
      jsonPath: 'properties.f1.attr1',
      description: 'attribute 1',
      type: DamDomain.MODEL_ATTR_TYPES.STRING,
      fragment: {
        id: 1,
        name: 'f1',
      },
    },
  },
  2: {
    content: {
      id: 2,
      name: 'attr2',
      label: 'Attr2',
      jsonPath: 'properties.default.attr2',
      description: 'attribute 2',
      type: DamDomain.MODEL_ATTR_TYPES.INTEGER,
      fragment: {
        id: 2,
        name: 'default',
      },
    },
  },
  3: {
    content: {
      id: 3,
      name: 'attr3',
      label: 'Attr3',
      jsonPath: 'properties.attr3',
      description: 'attribute 3',
      type: DamDomain.MODEL_ATTR_TYPES.DOUBLE_ARRAY,
    },
  },
  4: {
    content: {
      id: 4,
      name: 'attr4',
      label: 'Attr4',
      jsonPath: 'properties.f4.sf4.attr4',
      description: 'attribute 4',
      type: DamDomain.MODEL_ATTR_TYPES.DATE_INTERVAL,
      fragment: {
        id: 4,
        name: 'f4.sf4',
      },
    },
  },
}

/**
 * Models as built by the Attributes List configuration component on the previous server result
 * (sorted alpha to make it easier for comparison)
 */
export const attributeModelsArray = [
  ...values(attributeModelsDictionary),
  DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.geometry),
  DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.id),
  DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.label),
  DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.model),
  DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.providerId),
  DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.tags),
  DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.thumbnail),
].sort((attr1, attr2) => StringComparison.compare(attr1.content.jsonPath, attr2.content.jsonPath))
