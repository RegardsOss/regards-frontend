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
import isArray from 'lodash/isArray'
import reduce from 'lodash/reduce'
import { BasicSignalActions, RequestVerbEnum } from '@regardsoss/store-utils'
import { CatalogDomain } from '@regardsoss/domain'

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
    // update a processing of a dataset
    this.updateProcessing = new BasicSignalActions({
      entityEndpoint: `${rootEnpoint}/dataset/{datasetSelectionId}/updateProcessing`,
      namespace: `${namespace}/dataset-update-processing`,
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
   * Returns action to add entities ID or Open search request results (excluding entities IDs) in basket
   * @param {[string]} entityIdsToInclude ids of entities to include in requests results
   * @param {[string]} entityIdsToExclude ids of entities to exclude in requests results
   * @param {{*}} uiSearchParameters UI open search parameters, respects RequestParameters shape.
   * @param {string} datasetUrn dataset ID to specify search on a specific dataset
   * @return {type:string, ...} redux action (redux API middleware compatible) to add elements or request to the basket
   */
  addToBasket(entityIdsToInclude = null, entityIdsToExclude = null, uiSearchParameters = {}, datasetUrn = null) {
    // Prepare parameter applying to selection
    let searchParameters = null
    if (entityIdsToInclude && entityIdsToInclude.length) {
      searchParameters = {
        q: null,
      }
    } else {
      searchParameters = {
        ...reduce(uiSearchParameters, ((acc, value, key) => {
          // keep parameters only when they are filtering results (avoid reporting sort, facets requests,... that are time consuming
          // and do not change the results set)
          if (CatalogDomain.CatalogSearchQueryHelper.RESULTS_FILTERING_PARAMETERS.includes(key)) {
            // that parameter must be kept. If it has mustiple values,  keep only first one
            if (value) {
              let parameterValue = value
              if (!isArray(value)) {
                parameterValue = [value]
              }
              return {
                ...acc,
                [key]: parameterValue,
              }
            }
          }
          return acc
        }), {}),
        q: uiSearchParameters.q || [''], // q is expected to be an array ('' indicates that query matches ALL, when user filtered nothing)
      }
    }

    return this.selectionDelegate.sendSignal(RequestVerbEnum.POST, {
      // set engine type
      engineType: CatalogDomain.LEGACY_SEARCH_ENGINE,
      datasetUrn,
      entityIdsToInclude,
      entityIdsToExclude,
      searchParameters,
    })
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
      itemsSelectionDate,
    })
  }

  /**
   * Returns action to update a processing of a dataset in basket
   * @param {*} datasetSelectionId parent dataset selection ID
   * @param {*} process processing object containing conf parameters
   * @return {type:string, ...} redux action (redux API middleware compatible) to update a processing of a dataset in basket
   */
  updateDatasetProcessingSelection(datasetSelectionId, process) {
    return this.updateProcessing.sendSignal(RequestVerbEnum.PUT, process, {
      datasetSelectionId,
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
