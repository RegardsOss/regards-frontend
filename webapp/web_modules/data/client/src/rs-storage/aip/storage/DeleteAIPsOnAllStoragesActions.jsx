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
 * a
 * zlong with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { BasicSignalActions } from '@regardsoss/store-utils'

/**
 * Actions to delete AIPs on all storages
 * @author Raphaël Mechali
 */
export default class DeleteAIPsOnAllStoragesActions extends BasicSignalActions {
  /**
   * Constructor
   * @param {*} namespace namespace
   */
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.STORAGE}/aips/search/delete`,
    })
  }

  /**
   * Builds action to delete selected AIPs on all storages
   * @param {[{content: *}]} aips Array of StorageShapes.AIPWithStorages to delete
   * @return {*} redux action to dispatch
   */
  deleteSelectedAIPs(aips) {
    return super.sendSignal('POST', {
      aipIds: aips.map(({ content: { aip: { id } } }) => id),
    })
  }

  /**
   * Builds action to delete AIPs by query, excluding some AIP
   * @param {*} contextFilters express AIP query
   * @param {[{*}]} excludedAIPs Array of StorageShapes.AIPWithStorages to exclude
   * @return {*} redux action to dispatch
   */
  deleteAIPsByQuery(contextFilters, excludedAIPs) {
    return super.sendSignal('POST', {
      ...contextFilters,
      aipIdsExcluded: excludedAIPs.map(({ content: { aip: { id } } }) => id),
    })
  }
}
