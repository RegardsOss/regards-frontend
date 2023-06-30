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
 */
import BasicSignalActions from '../signal/BasicSignalActions'

/**
 * Actions to download a backend file / resource locally. Use download method
 * @author Raphaël Mechali
 */
class DownloadFileActions extends BasicSignalActions {
  constructor({ headers = {}, ...otherOptions }) {
    super({
      headers: {
        Accept: '*/*', // Accept: all
        ...headers, // if Accept is overriden, use the provided one
      },
      options: { mode: 'cors' },
      ...otherOptions,
    })
  }

  /**
   * Returns action to start a file download. Please note that verb and body parameters have been moved to end, compared to
   * parent send signal method: usually, a download should be GET method, without body parameters
   * @param {*} pathParams {Object|null} URL path parameters
   * @param {*} queryParams {Object|null} URL query parameter
   * @param {*} verb {string} HTTP method
   * @param {*} bodyParam {Object|null} body parameter, when method is post
   */
  download(pathParams, queryParams, verb = 'GET', bodyParam = null) {
    return this.sendSignal(verb, bodyParam, pathParams, queryParams, true)
  }

  /**
   * For files, the result is a promise on Blob reading (works for both string and binary content),
   * adding Content-Type header if present
   * @return result reading promise
   */
  buildResults = (res) => {
    const contentType = res.headers.get('Content-Type')
    const contentDisposition = res.headers.get('Content-Disposition')
    return res.blob().then((b) => {
      const content = b.size ? b : null // handle empty response
      return { contentType, contentDisposition, content }
    })
  }
}

export default DownloadFileActions
