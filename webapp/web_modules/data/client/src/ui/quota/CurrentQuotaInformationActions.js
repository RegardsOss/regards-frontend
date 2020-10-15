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

/**
 * Redux actions to control current quota information (in user app)
 *
 * @author Raphaël Mechali
 */
export class CurrentQuotaInformationActions {
  /**
   * Constructor
   * @param {string} namespace actions namespace, default user interface namespace when not provided
   */
  constructor(namespace = 'user/current-quota-information') {
    this.SET_QUOTA_INFORMATION = `${namespace}/set-quota-information`
  }

  /**
   * Returns redux action to dispatch to set quota information
   * @param {number} currentQuota
   * @param {number} maxQuota
   * @param {number} currentRate
   * @param {number} rateLimit
   * @returns {*} redux action
   */
  setQuotaInformation(currentQuota, maxQuota, currentRate, rateLimit) {
    return {
      type: this.SET_QUOTA_INFORMATION,
      currentQuota,
      maxQuota,
      currentRate,
      rateLimit,
    }
  }
}
