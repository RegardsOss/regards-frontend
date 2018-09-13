/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Plugin service run model: packed data to execute a service
 */
export class PluginServiceRunModel {
  /**
   * Constructor
   * @param {PluginService} serviceConfiguration fetched plguin service configuration, WITHOUT CONTENT ROOT
   * @param {OneElementTarget|ManyElementsTarget} target execution target
   */
  constructor(serviceConfiguration, target) {
    this.serviceConfiguration = serviceConfiguration
    this.target = target
  }

  /**
   * @return a unique key for service (catalog and UI service conf index are not coming from the same tables)
   */
  get key() {
    return `${this.type}/${this.serviceConfiguration.content.id}`
  }

  /**
   * @return service label
   */
  get label() {
    return this.serviceConfiguration.content.label
  }

  /**
   * @return service icon
   */
  get icon() {
    return this.serviceConfiguration.content.icon
  }
}
