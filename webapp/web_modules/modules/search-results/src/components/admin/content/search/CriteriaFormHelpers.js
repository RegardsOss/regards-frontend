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
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import keys from 'lodash/keys'
import { UIDomain, DamDomain } from '@regardsoss/domain'

/**
 * Shares helper related with criteria groups form
 * @author Raphaël Mechali
 */
export class CriteriaFormHelper {
  /**
   * Is criterion configuration in error?
   * @param {*} pluginConfiguration matching UICriterionConfigurationContent
   * @param {*} pluginMetadata as plugin corresponding PluginMeta, from same file
   * @param {*} attributes as a map of attributes (matches availableAttributes)
   * @return {boolean} true when there is an error, false, otherwise
   */
  static isCriterionConfigurationInError(pluginConfiguration, pluginMetadata, attributes) {
    const attributesToConfigure = get(pluginMetadata.configuration, 'attributes', [])
    const configuredAttributes = get(pluginConfiguration, 'attributes', {})
    return attributesToConfigure.length !== keys(configuredAttributes).length
        || attributesToConfigure.some(({ name, attributeType }) => {
          const configuredAttr = configuredAttributes[name]
          // 1 - it should be retrieved in attributes list
          const attribute = DamDomain.AttributeModelController.findModelFromAttributeFullyQualifiedName(configuredAttr, attributes)
          // 2 - its type should still match what expects the metadata
          return isNil(attribute) || !attributeType.includes(attribute.content.type)
        })
  }

  /**
   * Retrieves plugin metadata
   * @param {number} pluginId plugin id
   * @param {[*]} pluginsMetadata as an array of PluginMeta, from same file
   * @return {*} PluginMeta found or null
   */
  static getPluginMetadata(pluginId, pluginsMetadata) {
    return pluginsMetadata.find((meta) => meta.pluginId === pluginId) || null
  }

  /**
   * Is criterion plugin in error?
   * @param {number} pluginId selected plugin id
   * @param {[*]} pluginsMetadata as an array of PluginMeta, from same file
   * @param {*} pluginConfiguration matching UICriterionConfigurationContent
   * @param {*} attributes as a map of attributes (matches availableAttributes)
   * @return {boolean} true when there is an error, false, otherwise
   */
  static isCriterionPluginInError(pluginId, pluginConfiguration, pluginsMetadata, attributes) {
    const metadata = CriteriaFormHelper.getPluginMetadata(pluginId, pluginsMetadata)
    if (!metadata) {
      return true // undefined or no longer existing
    }
    return CriteriaFormHelper.isCriterionConfigurationInError(pluginConfiguration, metadata, attributes)
  }

  /**
   * Is there an error in criterion label
   * @param {*} label map of title by locale
      * @return {boolean} true when there is an error, false, otherwise
   */
  static isCriterionLabelInError(label) {
    return UIDomain.LOCALES.some((locale) => isEmpty(label[locale]))
  }

  /**
   * Is there an error in criterion (ie is there an error, an invalid / undefined plugin or an invalid configuration)
   * @param {*} criterion as a CriterionConfiguration from ModuleConfiguration.js
   * @param {[*]} pluginsMetadata as an array of PluginMeta, from same file
   * @param {*} attributes as a map of attributes (matches availableAttributes)
   * @return {boolean} true when there is an error, false, otherwise
   */
  static isCriterionInError(criterion, pluginsMetadata, attributes) {
    return CriteriaFormHelper.isCriterionLabelInError(criterion.label)
      || CriteriaFormHelper.isCriterionPluginInError(criterion.pluginId, criterion.conf, pluginsMetadata, attributes)
  }

  /**
   * Is group title in error
   * @param {boolean} showTitle is group showing title?
   * @param {*} title map of title by locale
   * @return {boolean} true when there is an error, false, otherwise
   */
  static isGroupTitleInError(showTitle, title) {
    // when showing title, there should be no locale for which title is empty
    // Otherwise, title should not be null / undefined
    const invalidCheckMethod = showTitle ? isEmpty : isNil
    return UIDomain.LOCALES.some((locale) => invalidCheckMethod(title[locale]))
  }

  /**
   * Is there an error in group (ie is there an error in title or criteria)
   * @param {*} criteriaGroup as a CriteriaGroup from ModuleConfiguration.js
   * @param {[*]} pluginsMetadata as an array of PluginMeta, from same file
   * @param {*} attributes as a map of attributes (matches availableAttributes)
   * @return {boolean} true when there is an error, false, otherwise
   */
  static isGroupInError(criteriaGroup, pluginsMetadata, attributes) {
    return CriteriaFormHelper.isGroupTitleInError(criteriaGroup.showTitle, criteriaGroup.title)
    || criteriaGroup.criteria.some((c) => CriteriaFormHelper.isCriterionInError(c, pluginsMetadata, attributes))
  }

  /**
   * Is there an error in groups (ie is there an error in any criteria group)
   * @param {[*]} criteriaGroups as an array of CriteriaGroup from ModuleConfiguration.js
   * @param {[*]} pluginsMetadata as an array of PluginMeta, from same file
   * @param {*} attributes as a map of attributes (matches availableAttributes)
   * @return {booolean} true when there is an error, false, otherwise
   */
  static areGroupsInError(criteriaGroups, pluginsMetadata, attributes) {
    return criteriaGroups.some((g) => CriteriaFormHelper.isGroupInError(g, pluginsMetadata, attributes))
  }
}
