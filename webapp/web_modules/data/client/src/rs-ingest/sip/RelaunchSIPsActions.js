/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Action to relaunch SIPs
 * @author Kévin Picart
 */
export default class RelaunchSIPsActions extends BasicSignalActions {
  /**
   * Constructor
   * @param {*} namespace namespace
   */
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.INGEST}/sips/search/relaunch`,
    })
  }

  /**
   * Builds action to relaunch selected SIPs storage
   * @param {[{content: *}]} sips Array of IngestShapes.IngestSIP to delete
   * @return {*} redux action to dispatch
   */
  relaunchSelectedSIPs(sips) {
    return super.sendSignal('POST', {
      sipIds: sips.map(({ content: { sip: { id } } }) => id),
    })
  }

  /**
   * Builds action to relaunch SIPs by query, excluding some SIP
   * @param {*} contextFilters express SIP query
   * @param {[{*}]} excludedSIPs Array of IngestShapes.IngestSIP to exclude
   * @return {*} redux action to dispatch
   */
  relaunchSIPsByQuery(contextFilters, excludedSIPs) {
    return super.sendSignal('POST', {
      ...contextFilters,
      sipIdsExcluded: excludedSIPs.map(({ content: { sip: { id } } }) => id),
    })
  }
}
