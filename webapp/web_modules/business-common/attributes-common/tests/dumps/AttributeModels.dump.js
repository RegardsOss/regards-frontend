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
import values from 'lodash/values'
import { DamDomain } from '@regardsoss/domain'

/**
 * Descriptions attributes models dumps for module tests
 * @author Raphaël Mechali
 */

/**
 * Models as returned by the server
 */
export const attributeModelsDictionnary = {
  1: {
    content: {
      id: 1,
      name: 'attr1',
      label: 'attr1',
      jsonPath: 'properties.attr1',
      description: 'attribute 1',
      type: DamDomain.MODEL_ATTR_TYPES.STRING,
    },
  },
  2: {
    content: {
      id: 2,
      name: 'attr2',
      label: 'attr2',
      jsonPath: 'properties.attr2',
      description: 'attribute 2',
      type: DamDomain.MODEL_ATTR_TYPES.INTEGER,
    },
  },
  3: {
    content: {
      id: 3,
      name: 'attr3',
      label: 'attr3',
      jsonPath: 'properties.attr3',
      description: 'attribute 3',
      type: DamDomain.MODEL_ATTR_TYPES.DOUBLE_ARRAY,
    },
  },
  4: {
    content: {
      id: 4,
      name: 'attr4',
      label: 'attr4',
      jsonPath: 'properties.attr4',
      description: 'attribute 4',
      type: DamDomain.MODEL_ATTR_TYPES.DATE_INTERVAL,
    },
  },
}

/**
 * Models as built by the Attributes List configuration component on the previous server result
 */
export const attributeModelsArray = [
  ...values(attributeModelsDictionnary), // attrX, alphabetically first
  // emulate alphabetical sorting on standard attribute labels
  DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.id),
  DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.label),
  DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.providerId),
  DamDomain.AttributeModelController.getStandardAttributeModel(DamDomain.AttributeModelController.standardAttributesKeys.thumbnail),
]
