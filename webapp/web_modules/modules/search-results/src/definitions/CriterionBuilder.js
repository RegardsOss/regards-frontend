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
import get from 'lodash/get'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import some from 'lodash/some'
import { UIDomain, CommonDomain, CatalogDomain } from '@regardsoss/domain'

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
      type: CatalogDomain.TAG_TYPES_ENUM.WORD,
      searchKey: word,
      requestParameters: {
        [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]:
          new CatalogDomain.OpenSearchQueryParameter(
            CatalogDomain.OpenSearchQuery.SAPN.tags,
            CatalogDomain.OpenSearchQueryParameter.toStrictStringEqual(word)).toQueryString(),
      },
    }
  }

  /**
   * Build tag restriction criterion from entity
   * @param {*} entity entity (manadatory), must respect Entity shape from catalog shapes
   * @return {*} tag criterion as specified by TagCriterion shape, from ResultsContext shapes
   */
  static buildEntityTagCriterion(entity) {
    return {
      type: entity.content.entityType,
      entity,
      searchKey: entity.content.id,
      requestParameters: {
        [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]:
          new CatalogDomain.OpenSearchQueryParameter(
            CatalogDomain.OpenSearchQuery.SAPN.tags,
            CatalogDomain.OpenSearchQueryParameter.toStrictStringEqual(entity.content.id)).toQueryString(),
      },
    }
  }

  /**
   * Builds an unresolved entity tag criterion
   * @param {string} id entity ID
   */
  static buildUnresolvedEntityTagCriterion(id) {
    return {
      type: CatalogDomain.TAG_TYPES_ENUM.UNRESOLVED,
      searchKey: id,
      requestParameters: {
        [CatalogDomain.CatalogSearchQueryHelper.Q_PARAMETER_NAME]:
          new CatalogDomain.OpenSearchQueryParameter(
            CatalogDomain.OpenSearchQuery.SAPN.tags,
            CatalogDomain.OpenSearchQueryParameter.toStrictStringEqual(id)).toQueryString(),
      },
    }
  }

  static STATIC_CRITERION_SERIALIZED = /(?<label>[^;]+);(?<attribute>[^=]+)=(?<criteria>[^,]+),?/g;

  /**
   * Deserialize a static criterion
   * @param {String} criterionAsString The criterion serialized as string
   */
  static buildStaticCriterion(criterionAsString) {
    let matches = []
    const result = []
    // eslint-disable-next-line no-cond-assign
    while (matches = CriterionBuilder.STATIC_CRITERION_SERIALIZED.exec(criterionAsString)) {
      const { label, attribute, criteria } = matches.groups
      result.push({
        label,
        active: true,
        parameters: { [attribute]: criteria },
        requestParameters: { [attribute]: criteria },
      })
    }
    return result
  }

  /**
   * Serialize a static criterion
   * @param {Object} criterion a static criterion
   */
  static buildStaticCriterionString(criterion) {
    return map(criterion, (criteria) => {
      const parameters = map(criteria.parameters, (val, key) => (
        `${key}=${val}`
      )).join(';')
      return `${criteria.label};${parameters}`
    }).join(',')
  }

  /**
   * Update the existing staticParameter property with the active/unactive flag
   * When active, requestParameters exists and equals to parameters, otherwise requestParameters empty
   * @param {*} resultsContext
   * @param {*} unactiveStaticParametersAsString
   */
  static buildUnactiveStaticCriterion(resultsContext, unactiveStaticParametersAsString) {
    const unactiveStaticParameters = JSON.parse(unactiveStaticParametersAsString)
    const currentStaticParameters = resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].criteria.staticParameters
    return ({
      tabs: {
        [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: {
          criteria: {
            staticParameters: map(currentStaticParameters, (staticParameter, index) => ({
              ...staticParameter,
              active: !get(unactiveStaticParameters, index, false),
              requestParameters: !get(unactiveStaticParameters, index, false) ? staticParameter.parameters : {},
            })),
          },
        },
      },
    })
  }

  /**
   * Build a string for unactive static criterion list
   * @param {*} resultsContext
   */
  static buildUnactiveStaticCriterionString(resultsContext) {
    const { staticParameters } = resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS].criteria
    // Do not save this parameter if empty or all values are defaults ones
    if (isEmpty(staticParameters) || !some(staticParameters, (staticParameter) => !staticParameter.active)) {
      return null
    }

    return JSON.stringify(map(staticParameters, (staticParameter) => !staticParameter.active))
  }
}
