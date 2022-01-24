/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Provides REGARDS UI MapEngine tools
 * @author Théo Lasserre
 */

import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'
import filter from 'lodash/filter'
import map from 'lodash/map'
import root from 'window-or-global'
import { UIDomain } from '@regardsoss/domain'

const MAP_CLICK_EVENT = {
  INITIAL: 0,
  SIMPLE_CLICK: 1,
  DOUBLE_CLICK: 2,
}

/** Click count & timer in order to manage simple & double click */
let clickCount = MAP_CLICK_EVENT.INITIAL
let singleClickTimer = null

const WAITING_TIME_FOR_SINGLE_CLICK = 400
/**
 * Manage Cesium & Mizar simple & double click on entities event
 * @param {*} selectedEntities
 * @param {*} onProductSelected funtion to call when there is a simple click on entities
 * @param {*} onProductsZoomTo function to call when there is a double click on entities
 */
export function clickOnEntitiesHandler(selectedEntities, onProductSelected, onProductsZoomTo) {
  clickCount += 1
  // Handle single click
  if (clickCount === MAP_CLICK_EVENT.SIMPLE_CLICK) {
    singleClickTimer = root.setTimeout(() => {
      clickCount = MAP_CLICK_EVENT.INITIAL
      onProductSelected(selectedEntities)
    }, WAITING_TIME_FOR_SINGLE_CLICK)
    // Handle double click
  } else if (clickCount === MAP_CLICK_EVENT.DOUBLE_CLICK) {
    root.clearTimeout(singleClickTimer)
    clickCount = MAP_CLICK_EVENT.INITIAL
    // Do not send event if there is no REGARDS feature selected
    if (!isEmpty(selectedEntities)) {
      onProductsZoomTo(selectedEntities)
    }
  }
}

/**
 * We get basic informations for all kind of layers
 * @param {*} layer
 * @param {*} mapEngine either Cesium or Mizar
 */
function getBasicLayerInfo(layer, mapEngine, layerType) {
  // Common attributes
  let basicLayerInfo = {
    type: layer.type,
    conf: layer.conf ? JSON.parse(layer.conf) : {},
    baseUrl: layer.url,
  }
  // Specific attributes
  switch (mapEngine) {
    case UIDomain.MAP_ENGINE_ENUM.MIZAR:
      basicLayerInfo = {
        ...basicLayerInfo,
        background: layerType === UIDomain.MAP_LAYER_TYPES_ENUM.BACKGROUND,
        visible: true,
      }
      break
    case UIDomain.MAP_ENGINE_ENUM.CESIUM:
      basicLayerInfo = {
        ...basicLayerInfo,
        layers: layer.layersName,
      }
      break
    default:
  }
  return basicLayerInfo
}

/**
 * Add attributes for WMS and WMTS layer type depending on mapEngine
 * @param {*} customLayerInfo basic custom layer info
 * @param {*} customLayer layer defined by admin
 * @param {*} mapEngine either Cesium or Mizar
 */
function addWMSCustomLayerInfo(customLayerInfo, customLayer, mapEngine) {
  // Common attributes
  let newCustomLayerInfo = {
    ...customLayerInfo,
    layers: customLayer.layersName,
  }
  // Specific attributes
  switch (mapEngine) {
    case UIDomain.MAP_ENGINE_ENUM.CESIUM:
      newCustomLayerInfo = {
        ...newCustomLayerInfo,
        parameters: {
          service: 'WMS',
          version: '1.3.0',
          request: 'getMap',
          format: 'image/png',
          transparent: true,
        },
      }
      break
    case UIDomain.MAP_ENGINE_ENUM.MIZAR:
      newCustomLayerInfo = {
        ...newCustomLayerInfo,
        transparent: true,
      }
      break
    default:
  }
  return newCustomLayerInfo
}

/**
   * Get layers info depending on layerType, selected mode and mapEngine
   * Return only one background layer info or multiple data layer info
   * @param {*} layerType : either BACKGROUND or DATA
   * @param {*} viewMode : needed in arg to get correct value after properties update
   * @param {*} mapEngine: either CESIUM or MIZAR
   */
export function getLayersInfo(layers, layerType, viewMode, mapEngine) {
  switch (layerType) {
    case UIDomain.MAP_LAYER_TYPES_ENUM.BACKGROUND: {
      const backgroundLayer = find(layers, (layer) => layer.enabled && layer.background && layer.layerViewMode === viewMode)
      if (!backgroundLayer || !backgroundLayer.type || !backgroundLayer.url) {
        throw new Error(`There is no background layer for ${viewMode}`)
      }
      return getBasicLayerInfo(backgroundLayer, mapEngine, layerType)
    }
    case UIDomain.MAP_LAYER_TYPES_ENUM.CUSTOM: {
      const customLayers = filter(layers, (layer) => !layer.background && layer.enabled && layer.layerViewMode === viewMode)
      return map(customLayers, (customLayer) => {
        const customLayerInfo = getBasicLayerInfo(customLayer, mapEngine, layerType)

        switch (customLayer.type) {
          case UIDomain.CESIUM_LAYER_TYPES_ENUM.WMS || UIDomain.CESIUM_LAYER_TYPES_ENUM.WMTS
            || UIDomain.MIZAR_LAYER_TYPES_ENUM.WMS || UIDomain.MIZAR_LAYER_TYPES_ENUM.WMTS:
            return addWMSCustomLayerInfo(customLayerInfo, customLayer, mapEngine)
          default:
        }
        return customLayerInfo
      })
    }
    default:
      throw new Error(`Unexpected type ${layerType}`)
  }
}
