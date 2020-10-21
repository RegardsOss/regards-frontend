/**
 * Copyright 2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import keys from 'lodash/keys'
import forEach from 'lodash/forEach'
import BasicSignalActions from '../signal/BasicSignalActions'

/**
* Allows to manage several Signals actions on the same time
* @author Léo Mieulet
*/
export default class BasicSignalsActions {
  /**
   * Constructor
   * @param {Object} subActions several BasicSignalActions constructor objets
   */
  constructor(subActions) {
    this.subActionKeys = keys(subActions)
    this.subAction = {}
    // instantiate corresponding actions and save them in the current instance
    forEach(subActions, (actionOptions, actionKey) => {
      this.subAction[actionKey] = new BasicSignalActions(actionOptions)
    })
  }

  /**
   * @return {BasicSignalActions} corresponding sub signal action
   */
  getSubAction(actionKey) {
    return this.subAction[actionKey]
  }

  /**
   * @return {[String]} list of sub action keys
   */
  getSubActionKeys() {
    return this.subActionKeys
  }

  /**
   * Generates the main [microservice@resource@verb] string necessary for displaying the module from the entityEndpoint.
   * For example:
   * entityEndpoint = `${GATEWAY_HOSTNAME}/${API_URL}/rs-admin/users/{name}?status=VALID`
   * Dependy = rs-admin@/users/{name}@verb
   *
   * @param actionKey
   * @param verb
   * @returns {string}
   */
  getDependency = (actionKey, verb) => this.getSubAction(actionKey).getDependency(verb)
}
