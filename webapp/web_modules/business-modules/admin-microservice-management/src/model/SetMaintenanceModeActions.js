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
import replace from 'lodash/replace'
import { BasicSignalActions, RequestVerbEnum } from '@regardsoss/store-utils'

const MAINTENANCES_ACTIONS = {
  ACTIVATE: 'enable',
  DISABLE: 'disable',
}

class SetMaintenanceModeActions extends BasicSignalActions {
  constructor(microserviceName) {
    super({
      namespace: `admin-microservice-management/set-maintenance-${microserviceName}`,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/{microservice}/maintenance/{tenant}/{action}`,
    })
    this.microserviceName = microserviceName
  }

  getActivateDependency = () => {
    let dependency = this.getDependency(RequestVerbEnum.PUT)
    dependency = replace(dependency, '{microservice}', this.microserviceName)
    return replace(dependency, '{action}', MAINTENANCES_ACTIONS.ACTIVATE)
  }

  getDesactivateDependency = () => {
    let dependency = this.getDependency(RequestVerbEnum.PUT)
    dependency = replace(dependency, '{microservice}', this.microserviceName)
    return replace(dependency, '{action}', MAINTENANCES_ACTIONS.DISABLE)
  }
}

export { MAINTENANCES_ACTIONS }
export default (microserviceName) => new SetMaintenanceModeActions(microserviceName)
