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
import isNaN from 'lodash/isNaN'
import { MIME_TYPES } from '@regardsoss/mime-types'

/**
 * Helper to access descriptor data (URL, parameters detail, ...)
 * @author Raphaël Mechali
 */
export class DescriptorHelper {
  /** Expected resource MIME type */
  static EXPECTED_URL_MIME_TYPE = MIME_TYPES.JSON_MIME_TYPE

  /** Expected OpenSearch parameter name for page size */
  static EXPECTED_PAGE_SIZE_OS_NAME = '{count}'

  /** Expected OpenSearch parameter name for page index */
  static EXPECTED_PAGE_INDEX_OS_NAME = '{startPage}'

  /**
   * Parses an optional string into a number or returns null
   * @param {string} value input value (may be undefined, null or not parsable)
   * @return {number} parsed number or null
   */
  static parseFloatOrNull(value) {
    const parsed = parseFloat(value)
    return isNaN(parsed) ? null : parsed
  }

  /**
   * @param {*} descriptor descriptor, matching DataManagementShapes.OpenSearchQueryDescription shape (optional)
   * @return {*} found resource URL for JSON Mime type or null (matches DataManagementShapes.OpenSearchURLDescription)
   */
  static getResourceURL(descriptor) {
    const availableResourcesURLs = get(descriptor, 'url', [])
    return availableResourcesURLs.find((e) => e.type === DescriptorHelper.EXPECTED_URL_MIME_TYPE) || null
  }

  /**
   * @param {*} descriptor descriptor, matching DataManagementShapes.OpenSearchQueryDescription shape (optional)
   * @return {boolean} true when the descriptor has a JSON resource URL
   */
  static hasResourceURL(descriptor) {
    return !!DescriptorHelper.getResourceURL(descriptor)
  }

  /**
   * Retrieves page size parameter in an OpenSearch URL descriptor
   * @param {*} urlDescriptor OpenSearch URL descriptor (DataManagementShapes.OpenSearchURLDescription)
   * @return {*} OpenSearch URL parameter found for page size or null
   */
  static getPageSizeParameter(urlDescriptor) {
    return urlDescriptor.parameter.find(({ value }) => value === DescriptorHelper.EXPECTED_PAGE_SIZE_OS_NAME) || null
  }

  /**
   * Retrieves page index parameter in an OpenSearch URL descriptor
   * @param {*} urlDescriptor OpenSearch URL descriptor (DataManagementShapes.OpenSearchURLDescription)
   * @return {*} OpenSearch URL parameter found for page index or null
   */
  static getPageIndexParameter(urlDescriptor) {
    return urlDescriptor.parameter.find(({ value }) => value === DescriptorHelper.EXPECTED_PAGE_INDEX_OS_NAME) || null
  }

  /**
   * Retrieves page data in an OpenSearch URL descriptor
   * Pre: both page size parameter and page index parameter can be retrieved!
   * @param {*} urlDescriptor OpenSearch URL descriptor (DataManagementShapes.OpenSearchURLDescription).
   * @return {{pageSizeParam: string, minPageSize: number, maxPageSize: number, pageIndexParam: string, firstPageIndex: number}}
   * retrieved page data (elements are null or defaulted when not found, as following
   * - pageSizeParam: always found
   * - minPageSize: 1 when not found
   * - maxPageSize: null when not found
   * - pageIndexParam: always found
   * - firstPageIndex: 0 when not found
   */
  static parsePageData(urlDescriptor) {
    // page size related
    const pageSizeParameter = DescriptorHelper.getPageSizeParameter(urlDescriptor)
    let minPageSize = null
    if (pageSizeParameter.minInclusive) {
      minPageSize = DescriptorHelper.parseFloatOrNull(pageSizeParameter.minInclusive) || 1
    } else if (pageSizeParameter.minExclusive) {
      const exclusiveValue = DescriptorHelper.parseFloatOrNull(pageSizeParameter.minExclusive)
      minPageSize = exclusiveValue ? exclusiveValue + 1 : 1
    } else {
      minPageSize = 1
    }
    let maxPageSize = null
    if (pageSizeParameter.maxInclusive) {
      maxPageSize = DescriptorHelper.parseFloatOrNull(pageSizeParameter.maxInclusive) || 1
    } else if (pageSizeParameter.maxExclusive) {
      const exclusiveValue = DescriptorHelper.parseFloatOrNull(pageSizeParameter.maxExclusive)
      maxPageSize = exclusiveValue ? exclusiveValue - 1 : null
    }

    // page index related
    const pageIndexParameter = DescriptorHelper.getPageIndexParameter(urlDescriptor)
    let firstPageIndex = 0
    if (pageIndexParameter.minInclusive) {
      firstPageIndex = DescriptorHelper.parseFloatOrNull(pageIndexParameter.minInclusive) || 0
    } else if (pageIndexParameter.minExclusive) {
      const exclusiveValue = DescriptorHelper.parseFloatOrNull(pageIndexParameter.minExclusive)
      firstPageIndex = exclusiveValue ? exclusiveValue + 1 : 0
    }

    return {
      pageSizeParam: pageSizeParameter.name,
      minPageSize,
      maxPageSize,
      pageIndexParam: pageIndexParameter.name,
      firstPageIndex,
    }
  }

  /**
   * Returns options for a parameter
   * @param {*} parameter matching DataManagementShapes.OpenSearchURLParameterDescription
   * @return {[*]} parameter options (never null, possibly empty)
   */
  static getParameterOptions(parameter) {
    // Note: options might be in option (regular) or options (Theia) fields
    return get(parameter, 'options', get(parameter, 'option', []))
  }

  /**
   * Returns options for a parameter
   * @param {*} parameter matching DataManagementShapes.OpenSearchURLParameterDescription
   * @return {boolean} true if parameter has options, false otherwise
   */
  static hasParameterOptions(parameter) {
    return DescriptorHelper.getParameterOptions(parameter).length > 0
  }

  /**
   * Regular expression that matches non template parameters in template URL,
   * ie parameters like a=b but not parameters like a={b}
   */
  static NON_TEMPLATE_PARAMETERS_EXP = /([a-z0-9-_]+=[^&}{]+)/ig

  /**
   * Returns webservice URL from URL descriptor
   * @param {*} urlDescriptor OpenSearch URL descriptor (DataManagementShapes.OpenSearchURLDescription)
   * @return {string} webservice URL
   */
  static getWebserviceURL(urlDescriptor) {
    const [baseURL, query = ''] = urlDescriptor.template.split('?')
    const allNonTemplateParameters = query.match(DescriptorHelper.NON_TEMPLATE_PARAMETERS_EXP)

    return allNonTemplateParameters && allNonTemplateParameters.length
      ? `${baseURL}?${allNonTemplateParameters.join('&')}`
      : baseURL
  }
}
