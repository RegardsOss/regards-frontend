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
import { BasicSignalActions, RequestVerbEnum } from '@regardsoss/store-utils'

/**
 * Order basket (cart) action, to control logged user basket content. To implement that behavior, this class uses a composition to
 * multiple BasicSignalActions
 */
class OrderBasketActions {
  /**
   * Constructor. Note that the namespace is provided by default, allowing to use the default client actions when
   * no value is provided
   */
  constructor(namespace = 'common-user-basket') {
    const rootEnpoint = `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ORDER}/order/basket`
    // create root delegate
    this.rootDelegate = new BasicSignalActions({
      entityEndpoint: rootEnpoint,
      namespace: `${namespace}/root`,
    })
    // create selection delegate
    this.selectionDelegate = new BasicSignalActions({
      entityEndpoint: `${rootEnpoint}/selection`,
      namespace: `${namespace}/selection`,
    })
    // delete dataset delegate
    this.datasetDelegate = new BasicSignalActions({
      entityEndpoint: `${rootEnpoint}/dataset/{datasetSelectionId}`,
      namespace: `${namespace}/dataset`,
    })
    // delete dataset item delegate
    this.datasetItemDelegate = new BasicSignalActions({
      entityEndpoint: `${rootEnpoint}/dataset/{datasetSelectionId}/{itemsSelectionDate}`,
      namespace: `${namespace}/dataset-item`,
    })
  }

  /**
   * Returns action to get basket content
   * @return {type:string, ...} redux action (redux API middleware compatible) to to get basket content
   */
  getBasket() {
    return this.rootDelegate.sendSignal(RequestVerbEnum.GET)
  }

  /**
   * Returns action to get basket content
   * @return {type:string, ...} redux action (redux API middleware compatible) to get basket content
   */
  clearBasket() {
    return this.rootDelegate.sendSignal(RequestVerbEnum.DELETE)
  }

  /**
   * Returns action to clear fetched basket content
   * @return {type:string, ...} redux action (redux API middleware compatible) to flush basket
   */
  flushBasket() {
    // note: we do not care here what action type will flush the local data
    return this.rootDelegate.flush()
  }

  /**
   * Returns action to add IP IDs or Open search request results (excluding IP IDs) in basket
   * @param {[string]} ipIds elements IP IDs, to either include (if there is no request) or exclude (when specifying request)
   * @param {string} selectAllOpenSearchRequest open search request that provides all elements to include, or null / undefined if
   * elements to include are in the IP IDs list
   * @return {type:string, ...} redux action (redux API middleware compatible) to add elements or request to the basket
   */
  addToBasket(ipIds = [], selectAllOpenSearchRequest = null) {
    return this.selectionDelegate.sendSignal(RequestVerbEnum.POST, { ipIds, selectAllOpenSearchRequest })
  }

  /**
   * Returns action to remove a single dataset selection from basket (corresponds to one or many previous added request
   * from addToBasket method. Note that an add to basket request may also be split into many dataset selections since
   * that object is only related with one dataset)
   * @param {number} datasetSelectionId parent dataset selection ID
   * @param {number} itemsSelectionDate dated items selection operation date
   * @return {type:string, ...} redux action (redux API middleware compatible) to remove all dataset related selections from basket
   */
  removeDatasetSelectionFromBasket(datasetSelectionId) {
    return this.datasetDelegate.sendSignal(RequestVerbEnum.DELETE, null, { datasetSelectionId })
  }

  /**
   * Returns action to remove a single items selection from basket ( corresponds to a previous added request from
   * addToBasket method)
   * @param {number} datasetSelectionId parent dataset selection ID
   * @param {number} itemsSelectionDate dated items selection operation date
   * @return {type:string, ...} redux action (redux API middleware compatible) to remove a group of item - that where added at
   * a given date - from  dataset, in basket
   */
  removeItemsSelectionFromBasket(datasetSelectionId, itemsSelectionDate) {
    return this.datasetItemDelegate.sendSignal(RequestVerbEnum.DELETE, null, {
      datasetSelectionId,
      itemsSelectionDate: encodeURIComponent(itemsSelectionDate),
    })
  }

  getDependency = (verb) => {
    throw new Error('Invalid order basket actions API call: use getDependencies method instead')
  }

  /**
   * Returns actions dependencies for specified verb. Warning: unlike normal actions, this is an array here
   * @param {string} verb one of GET, PUT...
   * @return {[string]} action dependencies
   */
  getDependencies(verb) {
    switch (verb) {
      case RequestVerbEnum.GET:
        return [this.rootDelegate.getDependency(verb)]
      case RequestVerbEnum.POST:
        return [this.selectionDelegate.getDependency(verb)]
      case RequestVerbEnum.DELETE:
        return [
          this.rootDelegate.getDependency(verb),
          this.datasetDelegate.getDependency(verb),
          this.datasetItemDelegate.getDependency(verb)]
      default:
        return []
    }
  }
}

export default OrderBasketActions