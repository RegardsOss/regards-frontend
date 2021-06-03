/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { RequestVerbEnum, BasicSignalActions } from '@regardsoss/store-utils'

/**
 * Order state actions, to control an order (remove / remove completely / pause / resume)
 * @author Raphaël Mechali
 */
class OrderStateActions {
  /** Root endpoints for order state actions */
  static ROOT_ENDPOINT = `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ORDER}/user/orders`

  /**
   * Constructor
   * @param {string} namespace name space
   */
  constructor(namespace) {
    // superficial delete delegate
    this.deleteSuperficiallyDelegate = new BasicSignalActions({
      entityEndpoint: `${OrderStateActions.ROOT_ENDPOINT}/{orderId}`,
      namespace: `${namespace}/superficialDelete`,
      bypassErrorMiddleware: true,
    })
    // complete delete delegate
    this.deleteCompletelyDelegate = new BasicSignalActions({
      entityEndpoint: `${OrderStateActions.ROOT_ENDPOINT}/remove/{orderId}`,
      namespace: `${namespace}/completeDelete`,
      bypassErrorMiddleware: true,
    })
    // pause delegate
    this.pauseDelegate = new BasicSignalActions({
      entityEndpoint: `${OrderStateActions.ROOT_ENDPOINT}/pause/{orderId}`,
      namespace: `${namespace}/pause`,
      bypassErrorMiddleware: true,
    })
    // resume
    this.resumeDelegate = new BasicSignalActions({
      entityEndpoint: `${OrderStateActions.ROOT_ENDPOINT}/resume/{orderId}`,
      namespace: `${namespace}/resume`,
      bypassErrorMiddleware: true,
    })
    // retry
    this.retryDelegate = new BasicSignalActions({
      entityEndpoint: `${OrderStateActions.ROOT_ENDPOINT}/{orderId}/retry`,
      namespace: `${namespace}/resume`,
      bypassErrorMiddleware: true,
    })
    // restart
    this.restartDelegate = new BasicSignalActions({
      entityEndpoint: `${OrderStateActions.ROOT_ENDPOINT}/{orderId}/restart`,
      namespace: `${namespace}/resume`,
      bypassErrorMiddleware: true,
    })
  }

  /**
   * Returns redux action to dispatch in order to delete superficially an order
   * @param {number} orderId Order ID
   * @return action to dispatch
   */
  deleteSuperficiallyOrder(orderId) {
    return this.deleteSuperficiallyDelegate.sendSignal(RequestVerbEnum.DELETE, null, { orderId })
  }

  /**
   * Returns redux action to dispatch in order to delete completely an order
   * @param {number} orderId Order ID
   * @return {type: string, ...} action to dispatch
   */
  deleteCompletelyOrder(orderId) {
    return this.deleteCompletelyDelegate.sendSignal(RequestVerbEnum.DELETE, null, { orderId })
  }

  /**
   * Returns redux action to dispatch in order to pause an order
   * @param {number} orderId Order ID
   * @return {type: string, ...} action to dispatch
   */
  pauseOrder(orderId) {
    return this.pauseDelegate.sendSignal(RequestVerbEnum.PUT, null, { orderId })
  }

  retryOrder(orderId) {
    return this.retryDelegate.sendSignal('PUT', {  }, { orderId })
  }

  restartOrder(orderId, label, onSuccessUrl) {
    return this.restartDelegate.sendSignal('POST', { label,onSuccessUrl }, { orderId })
  }

  /**
   * Returns redux action to dispatch in order to resume an order
   * @param {number} orderId Order ID
   * @return {type: string, ...} action to dispatch
   */
  resumeOrder(orderId) {
    return this.resumeDelegate.sendSignal(RequestVerbEnum.PUT, null, { orderId })
  }

  getDependency = (verb) => {
    throw new Error('Invalid order state actions API call: use seperate get dependency methods instead')
  }

  /**
   * Returns delete superficially dependency
   * @return {[string]} dependency
   */
  getDeleteSuperficiallyDependency() {
    return this.deleteSuperficiallyDelegate.getDependency(RequestVerbEnum.DELETE)
  }

  /**
   * Returns delete completely dependency
   * @return {[string]} dependency
   */
  getDeleteCompletelyDependency() {
    return this.deleteCompletelyDelegate.getDependency(RequestVerbEnum.DELETE)
  }

  /**
   * Returns pause dependency
   * @return {[string]} dependency
   */
  getPauseDependency() {
    return this.pauseDelegate.getDependency(RequestVerbEnum.PUT)
  }

  /**
   * Returns resume dependency
   * @return {[string]} dependency
   */
  getResumeDependency() {
    return this.resumeDelegate.getDependency(RequestVerbEnum.PUT)
  }
}

export default OrderStateActions
