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
import { BasicListSelectors } from '@regardsoss/store-utils'
import sortBy from 'lodash/sortBy'
import partition from 'lodash/partition'
import { DEFAULT_FRAGMENT } from '@regardsoss/domain/dam'
/**
 * Store selector to Attribute entities.
 * @author Léo Mieulet
 */
class AttributeModelSelectors extends BasicListSelectors {
  /**
   * Return an array containing all attributes ordered by their fragment and their name
   * Attributes on the default fragment are at the end of the result
   * @param state
   * @returns {[*,*]}
   */
  getArrayOrderedUsingFragmentAndAttributeName(state) {
    const modelAttributeList = this.getList(state)
    const modelAttributeListPartition = partition(modelAttributeList, ['content.fragment.name', DEFAULT_FRAGMENT])
    return [
      // add first attributes that are not in the DEFAULT_FRAGMENT
      ...sortBy(modelAttributeListPartition[1], ['content.fragment.name', 'content.name']),
      // then display attributes from the DEFAULT_FRAGMENT
      ...sortBy(modelAttributeListPartition[0], ['content.name'], ['asc']),
    ]
  }
}

/**
 * Selectors builder
 * @param {string} storePath redux store path, leave empty to get default selectors instance (user app)
 */
export default function getAttributeMolSelectors(storePath = ['user', 'attributes']) {
  return new AttributeModelSelectors(storePath)
}
