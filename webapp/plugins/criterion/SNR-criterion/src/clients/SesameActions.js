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
import { RSAA } from 'redux-api-middleware'
import sesameHelper from './SesameHelper'

/**
 * Actions to fetch Sesame SNR results
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
export default class SesameActions {
  /**
   * Actions constructor
   * @param {string} namespace actions namespace
   */
  constructor(namespace) {
    this.REQUEST_STARTED_ACTION_ID = `${namespace}/GET-DATA-REQUEST`
    this.REQUEST_DONE_ACTION_ID = `${namespace}/GET-DATA-DONE`
    this.REQUEST_FAILED_ACTION_ID = `${namespace}/GET-DATA-FAILED`
    this.CLEAR_STATE_ACTION_ID = `${namespace}/CLEAR-DATA`
  }

  /**
   * Returns redux action to dispatch in order to get coordinates resolved
   * object name as
   * @param {string} spatialName spatial object name (when empty or blank, resets resolution state)
   * @param {string} service service
   * @param {string} options options
   * @return {*} redux dispatch-able action to fetch or reset state
   */
  getCoordinates(spatialName = '', service = 'A', options = '-ox') {
    return spatialName.trim() ? {
      [RSAA]: {
        method: 'GET',
        endpoint: `http://cdsweb.u-strasbg.fr/cgi-bin/nph-sesame/${options}/${service}?${spatialName}`,
        // allowing cross origin request to external SNR
        options: { mode: 'cors' },
        types: [{ // action dispatched when fetching starts
          type: this.REQUEST_STARTED_ACTION_ID,
          meta: { spatialName },
        }, { // action dispatched when fetching was successful
          type: this.REQUEST_DONE_ACTION_ID,
          payload: (action, state, response) => this.buildResults(response), // save results in payload coordinates
          meta: { spatialName },
        }, { // action dispatched when fetching failed
          type: this.REQUEST_FAILED_ACTION_ID,
          meta: { spatialName },
        }],
      },
    } : { // Clear state as spatialName is empty
      type: this.CLEAR_STATE_ACTION_ID,
    }
  }

  /**
   * Packs actions results: store spatial name and returns a promise to resolve the blob
   * @param {string} spatial name
   * @param {*} response server response, as packed by redux-api-middleware. Might be null if action failed
   * @return payload resolution promise, that will always resolve with the object { coordinates, spatialName },
   * where coordinates may be null
   */
  buildResults = (response) => new Promise((resolve) => {
    // resolution method, to be shared with SeameHelper tools
    function resolveSNPromise(coordinates = null) {
      resolve({ coordinates })
    }

    if (response && response.status === 200) {
      // Valid response, attempt parsing coordinates
      response.blob().then((textStream) => {
        // prepare reader
        const reader = new FileReader()
        // Prepare reading end: content has been fully read, let helper parse it. content reading failed, resolve empty
        reader.onload = () => resolveSNPromise(sesameHelper.extractCoordinates(reader.result))
        reader.onerror = resolveSNPromise // failed reading, resolve as no coordinate
        // starts reading
        reader.readAsText(textStream)
      }).catch(resolveSNPromise) // failed reading blob stream, resolve as no coordinate
    } else {
      // Invalid response, resolve as no coordinate
      resolveSNPromise()
    }
  })
}
