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
import { CommonDomain, CatalogDomain } from '@regardsoss/domain'

/**
 * Small helper class that builds query criteria for results context
 * @author Raphaël Mechali
 */
export class CriterionBuilder {
  /** Converts sort order into URL parameter sort order value */
  static TO_URL_SORT_VALUE = {
    [CommonDomain.SORT_ORDERS_ENUM.ASCENDING_ORDER]: 'ASC',
    [CommonDomain.SORT_ORDERS_ENUM.DESCENDING_ORDER]: 'DESC',
  }

  /**
   * Converts attribute
   * @param {*} attribute attribute model (respects Dam AttributeModel shape, withing content field)
   * @param {*} sortOrder sort order, optional (leave empty to get default)
   * @return built sort criterion or null if criterion should not be added (no attribute model or NO_SORT order)
   */
  static buildSortCriterion(attribute, sortOrder = CommonDomain.SORT_ORDERS_ENUM.ASCENDING_ORDER) {
    if (!attribute || !sortOrder || sortOrder === CommonDomain.SORT_ORDERS_ENUM.NO_SORT) {
      return null
    }
    return {
      attribute,
      sortOrder,
      requestParameters: {
        [CatalogDomain.CatalogSearchQueryHelper.SORT_PARAMETER_NAME]: `${attribute.content.jsonPath},${CriterionBuilder.TO_URL_SORT_VALUE[sortOrder]}`,
      },
    }
  }

  /**
   * Build tag restriction criterion from simple word tag
   * @param {string} word word
   * @return {*} tag criterion as specified by TagCriterion shape, from ResultsContext shapes
   */
  static buildWordTagCriterion(word) {
    return {
      label: word,
      type: CatalogDomain.TAG_TYPES_ENUM.WORD,
      searchKey: word,
      requestParameters: {
        [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]:
          new CatalogDomain.OpenSearchQueryParameter(
            CatalogDomain.OpenSearchQuery.TAGS_PARAM_NAME,
            CatalogDomain.OpenSearchQueryParameter.toStrictStringEqual(word)).toQueryString(),
      },
    }
  }

  /**
   * Build tag restriction criterion from entity
   * @param {*} entity entity (manadatory), must respect Entity shape from catalog shapes
   * @return {*} tag criterion as specified by TagCriterion shape, from ResultsContext shapes
   */
  static buildEntityTagCriterion({ content: { entityType, id, label } }) {
    return {
      label,
      type: entityType,
      searchKey: id,
      requestParameters: {
        [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]:
          new CatalogDomain.OpenSearchQueryParameter(
            CatalogDomain.OpenSearchQuery.TAGS_PARAM_NAME,
            CatalogDomain.OpenSearchQueryParameter.toStrictStringEqual(id)).toQueryString(),
      },
    }
  }
}
