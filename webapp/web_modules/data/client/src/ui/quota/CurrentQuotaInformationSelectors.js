/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { BasicSelector } from '@regardsoss/store-utils'

/**
 * Results context selectors
 * @author Raphaël Mechali
 */
export class CurrentQuotaInformationSelectors extends BasicSelector {
  /**
   * @param {*} state redux state
   * @return {{currentQuota: number, maxQuota: number, currentRate: number, rateLimit: number}} quota information
   */
  getQuotaInformation(state) {
    return this.uncombineStore(state)
  }

  /**
   * @param {*} state redux state
   * @return {number} current quota
   */
  getCurrentQuota(state) {
    console.info('A- state', state)
    console.info('B- uncombined', this.getQuotaInformation(state))
    return this.getQuotaInformation(state).currentQuota
  }

  /**
   * @param {*} state redux state
   * @return {number} max quota
   */
  getMaxQuota(state) {
    return this.getQuotaInformation(state).maxQuota
  }

  /**
   * @param {*} state redux state
   * @return {number} current rate
   */
  getCurrentRate(state) {
    return this.getQuotaInformation(state).currentRate
  }

  /**
   * @param {*} state redux state
   * @return {number} rate limit
   */
  getRateLimit(state) {
    return this.getQuotaInformation(state).rateLimit
  }
}

/**
 * Returns an instance of current quota information selectors on given store path
 * @param  {[string]} store path: reducer store path (default provided)
 * @return {ResultsContextSelectors} selectors instance
 */
export function getCurrentQuotaInformationSelectors(storePath = ['user', 'currentQuotaInformation']) {
  return new CurrentQuotaInformationSelectors(storePath)
}
