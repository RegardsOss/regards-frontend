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
import filter from 'lodash/filter'
import get from 'lodash/get'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { DataManagementClient } from '@regardsoss/client'
import { allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { modulesManager } from '@regardsoss/modules'

/**
 * Description helper: provide the module to use for description and the isDescriptionAvailable implementation
 * @author Raphaël Mechali
 */
export class DescriptionHelper {
  /** Dependencies to be able showing description */
  static DESCRIPTION_DEPENDENCIES = [
    // the current user must be able to fetch model attributes
    new DataManagementClient.ModelAttributesActions('').getDependency(RequestVerbEnum.GET_LIST),
  ]

  /** Keep a track of the warning log, to avoid loggin it multiple times */
  static hasLoggedWarning = false

  /**
   * Returns first available description module description module can be shown
   * @param {*} availableDependencies available depencies to endpoints
   * @param {*} dynamicContainerId dynamic container ID (the module found should not be in dynamic container)
   * @param {*} modules modules list
   * @return {Module} first found module or null
   */
  static getFirstDescriptionModule(availableDependencies, dynamicContainerId, modules) {
    // 0 - pre: don't show cart to non logged users or users that do not have enough rights
    if (!allMatchHateoasDisplayLogic(DescriptionHelper.DESCRIPTION_DEPENDENCIES, availableDependencies)) {
      // current user has not right to show description
      return null
    }
    // Find static description modules
    const staticDescriptionModules = filter((modules || {}), (module) => {
      const containerId = get(module, 'content.container', '')
      const moduleType = get(module, 'content.type', '')
      const isActiveModule = get(module, 'content.active', false)
      // module is retained when active, of type description and set up in any non dynamic container
      return isActiveModule && modulesManager.AllDynamicModuleTypes.DESCRIPTION === moduleType
        && dynamicContainerId !== containerId
    })
    // log warning if there are many available description modules (only one can be used and there is no selection rule!)
    if (staticDescriptionModules.length > 1 && !DescriptionHelper.hasLoggedWarning) {
      DescriptionHelper.hasLoggedWarning = true
      console.warn(`Multiple active description modules where found, only the first one will be used (id: ${staticDescriptionModules[0].content.id})`)
    }
    return staticDescriptionModules.length ? staticDescriptionModules[0] : null
  }

  /**
   * Is description available for entity type in module as parameter
   * @param {*} module module (must match AccessShapes.ModuleWithoutContent shape, ie <em>outside content field</em>)
   * @param {string} entityType one of DamDomain.ENTITY_TYPE_ENUM
   * @return {Boolean} true when module is provided, type is provided and module configuration allows description for that type
   */
  static isDescAvailableFor(module, entityType) {
    return get(module, `conf.${entityType}.showDescription`, false)
  }
}
