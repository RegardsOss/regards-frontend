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
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { modelActions } from './clients/ModelClient'
import { uiSettingsActions } from './clients/UISettingsClient'

/**
 * Mandatory Dependencies to display module in parent board
 * @author Raphaël Mechali
 */
export default {
  editSettingsDependencies: [
    uiSettingsActions.getDependency(RequestVerbEnum.GET), // show
    uiSettingsActions.getDependency(RequestVerbEnum.POST), // create first
    uiSettingsActions.getDependency(RequestVerbEnum.PUT), // update
    modelActions.getDependency(RequestVerbEnum.GET_LIST), // the list of models to use
  ],
}
