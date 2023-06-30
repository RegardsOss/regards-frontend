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
import { BasicListSelectors } from '@regardsoss/store-utils'
import find from 'lodash/find'

/**
 * Store selector to access association model to attribute model
 */
class ModelAttributesSelectors extends BasicListSelectors {
  getByAttributeModelId(state, attributeModelId) {
    return find(this.uncombineStore(state).items, (modelAttribute) => modelAttribute.content.attribute.id === attributeModelId)
  }
}

export default (storePathArray) => new ModelAttributesSelectors(storePathArray)
