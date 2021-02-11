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
import { BasicSignalSelectors } from '@regardsoss/store-utils'
import { UIDomain } from '@regardsoss/domain'

/**
 * UI settings selectors. Provides default path for user application none is required
 * @author Raphaël Mechali
 */
class UISettingsSelectors extends BasicSignalSelectors {
  /**
   * @param {*} state
   * @return {*} settings, matching UIShapes.UISettings (returns default when not found)
   */
  getSettings(state) {
    const results = this.getResult(state)
    return results || UIDomain.UISettingsConstants.DEFAULT_SETTINGS
  }
}

export function getUISettingsSelectors(storePath = ['user', 'uiSettings']) {
  return new UISettingsSelectors(storePath)
}
