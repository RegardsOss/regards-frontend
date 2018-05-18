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
 *  Common query model
 */
export default class Query {
  /**
   * Query constructor
   * @param rootQuery root query path (optional)
   * @param parameters query parameters [{StaticQueryParameter}]
   * @param separator query parameters separator (like '&' or )
   */
  constructor(rootQuery, parameters, separator) {
    this.rootQuery = rootQuery
    this.parameters = parameters
    this.separator = separator
  }

  toQueryString() {
    // inner recursive function to generate query string
    const makeQueryChain = (parameters) => {
      if (parameters.length === 0) {
        return this.rootQuery || ''
      }
      // A - generate the previous parameters research
      const previousParameters = parameters.slice(0, -1)
      const previousQueryChain = makeQueryChain(previousParameters)

      // B - append the current parameter with the right separator symbol (if there is a previous query chain)
      const [lastParameter] = parameters.slice(-1)
      const paramSeparator = previousQueryChain ? this.separator : ''
      const lastParamString = lastParameter.toQueryString()
      if (lastParamString && lastParamString !== '') {
        return `${previousQueryChain}${paramSeparator}${lastParameter.toQueryString()}`
      }
      return `${previousQueryChain}`
    }

    return makeQueryChain(this.parameters)
  }
}
