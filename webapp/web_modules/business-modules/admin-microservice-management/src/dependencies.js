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
import forEach from 'lodash/forEach'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import MaintenanceModeActions from './model/MaintenanceModeActions'
import SetMaintenanceModeActions from './model/SetMaintenanceModeActions'
import { pluginMetaDataActions } from './clients/PluginMetadataClient'
/**
 * Module hateoas depencies
 * @author Sébastien binda
 */
const dependencies = []
forEach(STATIC_CONF.MSERVICES, (microservice) => {
  const msDep = []
  msDep.push(MaintenanceModeActions(microservice).getDependency(RequestVerbEnum.GET))
  msDep.push(SetMaintenanceModeActions(microservice).getActivateDependency())
  msDep.push(SetMaintenanceModeActions(microservice).getDesactivateDependency())
  msDep.push(pluginMetaDataActions.getMsDependency(RequestVerbEnum.GET_LIST, microservice))
  dependencies.push(msDep)
})
export default dependencies
