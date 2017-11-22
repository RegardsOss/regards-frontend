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
 * Many entities runtime helper builder: provide helpers for service plugin developers convenience
 * @author Raphaël Mechali
 */
class ManyEntitiesRuntimeHelpersBuilder {

  /** Instance index counter */
  static INSTANCE_INDEX = 0

  /**
   * Constructor
   * @param {*} serviceTarget : service target, of type 'many entities'
   */
  constructor(serviceTarget) {
    this.serviceTarget = serviceTarget
    this.actions = new CatalogClient.SearchEntityActions(`plugin-service-runtime/many-entities/instance-${ManyEntitiesRuntimeHelpersBuilder.INSTANCE_INDEX}`)
    ManyEntitiesRuntimeHelpersBuilder.INSTANCE_INDEX += 1
  }

  /**
   * Builds 'getFetchAction' method closure
   * @return {function} buildFetchAction like () => [dispatchable action]
   */
  buildGetFetchAction() {
    return partial(this.getFetchAction, this.actions)
  }

  /**
   * get fetch action implementation
   * @param {BasicSignalActions} actions actions - partially applied, never seen by user
   * @param {string} ipId entity IP ID, user provided
   * @return {*} [dispatchable action]
   */
  getFetchAction = (actions, ipId) => actions.getEntity(ipId)

  /**
   * Builds 'getReducePromise' method closure
   * @return {function} function like ( {function} applier , {function} dispatchMethod, {*} initialValue ) => Promise
   */
  buildGetReducePromise() {
    return partial(this.getReducePromise, this.actions, this.serviceTarget.entities)
  }

  /**
   * Returns a promise to apply a reducer on each entity
   * @param {BasicSignalActions} actions actions - partially applied, never seen by user
   * @param {Array<string>}ipIds entities IP ID array - partially applied, never seen by user
   * @param {function} dispatchMethod redux dispatch method, strictly required to run fetch
   * @param {*} applier treatment to apply, like (accumulator, entity content, index) => *
   * @param {*} initialValue optional initial value (will be provided as first acculmulator in applier)
   */
  getReducePromise = (actions, ipIds, dispatchMethod, applier, initialValue) =>
    Promise.all(ipIds.map(ipId => dispatchMethod(actions.getEntity(ipId))))
      .then(results => results.reduce((accumulator, { payload, error = false }, index) => {
        // reduce promise results (will be next then value) or throw error (will enter catch)
        const entityContent = get(payload, 'content')
        // 1 - Error while fetching
        if (error || !entityContent) {
          throw new Error(`One entity could not be retrieved: ${payload.message || 'unknow error'}`)
        }
        // 2 - reduce that entity and jump to next
        return applier(accumulator, entityContent, index)
      }, initialValue))

}

module.exports = {
  ManyEntitiesRuntimeHelpersBuilder,
}
