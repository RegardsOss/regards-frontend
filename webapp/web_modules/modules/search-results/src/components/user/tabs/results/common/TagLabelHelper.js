/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CatalogDomain } from '@regardsoss/domain'
import { LabelVersionText } from '@regardsoss/attributes-common'

export class TagLabelHelper {
  /**
   * Common label building method for tags
   * @param {Function} formatMessage from intl context
   * @param {*} tagCriterion matching UIShapes.ResultsContext#TagCriterion
   * @param {*} uiSettings
   * @return {string} label for tag
   */
  static getLabel(formatMessage, tagCriterion, uiSettings) {
    switch (tagCriterion.type) {
      case CatalogDomain.TAG_TYPES_ENUM.UNRESOLVED: // unresolved specific label
        return formatMessage({ id: 'search.filter.geometry.entity.private' })
      case CatalogDomain.TAG_TYPES_ENUM.WORD:
        // for tags, the label is the word itself, ie searchKey or, for coupling tags,
        // a specific subpart of that word (see Tags Helper)
        return CatalogDomain.TagsHelper.isCouplingTag(tagCriterion.searchKey)
          ? CatalogDomain.TagsHelper.parseCouplingTag(tagCriterion.searchKey).label
          : tagCriterion.searchKey
      case CatalogDomain.TAG_TYPES_ENUM.COLLECTION:
      case CatalogDomain.TAG_TYPES_ENUM.DATA:
      case CatalogDomain.TAG_TYPES_ENUM.DATASET:
        // entities: show label / label version depending on type and settings
        return LabelVersionText.formatLabel(formatMessage, tagCriterion.entity, uiSettings)
      default:
        throw new Error(`Unkown tag type ${tagCriterion.type}`)
    }
  }
}
