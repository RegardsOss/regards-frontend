/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/**
 * Actions to handle running a plugin service
 * @author Raphaël Mechali
 */
class RunPluginServiceActions {
  constructor() {
    this.RUN_SERVICE = 'search-results/run-plugin-service/RUN_SERVICE'
    this.CLOSE_SERVICE = 'search-results/run-plugin-service/CLOSE_SERVICE'
  }

  /**
  * Runs a service
  * @param {Service} service service execution model
  * @return action to dispatch
  */
  runService(serviceRunModel) {
    return {
      type: this.RUN_SERVICE,
      serviceRunModel,
    }
  }

  /**
   * Closes running service
   * @return action to dispatch
   */
  closeService() {
    return {
      type: this.CLOSE_SERVICE,
    }
  }
}

export default new RunPluginServiceActions()
