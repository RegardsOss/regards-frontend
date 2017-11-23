/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import partial from 'lodash/partial'
import { CatalogClient } from '@regardsoss/client'

/**
 * One entity runtime helper builder: provide helpers for service plugin developers convenience
 * @author Raphaël Mechali
 */
class OneEntityRuntimeHelpersBuilder {

  /** Instance index counter */
  static INSTANCE_INDEX = 0

  /**
   * Constructor
   * @param {*} serviceTarget : service target, of type 'one entity'
   */
  constructor(serviceTarget) {
    this.serviceTarget = serviceTarget
    this.actions = new CatalogClient.SearchEntityActions(`plugin-service-runtime/one-entity/instance-${OneEntityRuntimeHelpersBuilder.INSTANCE_INDEX}`)
    OneEntityRuntimeHelpersBuilder.INSTANCE_INDEX += 1
  }

  /**
   * Builds 'getFetchAction' method closure
   * @return {function} buildFetchAction like () => [dispatchable action]
   */
  buildGetFetchAction() {
    return partial(this.getFetchAction, this.actions, this.serviceTarget.entity)
  }

  /**
   * get fetch action implementation
   * @param {BasicSignalActions} actions actions - partially applied, never seen by user
   * @param {string} ipId entity IP ID - partially applied, never seen by user
   * @return {*} dispatchable action
   */
  getFetchAction = (actions, ipId) => actions.getEntity(ipId)

  /**
   * Builds 'getReducePromise' method closure
   * @return {function} function like ( {function} applier , {function} dispatchMethod, {*} initialValue ) => Promise
   */
  buildGetReducePromise() {
    return partial(this.getReducePromise, this.actions, this.serviceTarget.entity)
  }

  /**
   * Returns a promise to apply a reducer on each entity
   * @param {BasicSignalActions} actions actions - partially applied, never seen by user
   * @param {string} ipId entity IP ID - partially applied, never seen by user
   * @param {function} dispatchMethod redux dispatch method, strictly required to run fetch
   * @param {*} applier treatment to apply, like (accumulator, entity content, index) => *
   * @param {*} initialValue optional initial value (will be provided as first acculmulator in applier)
   */
  getReducePromise = (actions, ipId, dispatchMethod, applier, initialValue) =>
    dispatchMethod(actions.getEntity(ipId)).then(({ payload, error = false }) => {
      const entityContent = get(payload, 'content')
      // 1 - check error and invalid content
      if (error || !entityContent) { // reject promise
        throw new Error(`Entity could not be retrieved: ${payload.message || 'unknow error'}`)
      }
      // 2 - apply reducer treatment on entity content
      return applier(initialValue, entityContent, 0) // will be the value in next then
    })

}

module.exports = {
  OneEntityRuntimeHelpersBuilder,
}
