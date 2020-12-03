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
 * Provides REGARDS UI MapEngine tools
 * @author Théo Lasserre
 */

import isEmpty from 'lodash/isEmpty'
import head from 'lodash/head'
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

/**
 * Manage Cesium & Mizar simple & double click on entities event
 * @param {*} selectedEntities
 * @param {*} onProductSelected funtion to call when there is a simple click on entities
 * @param {*} onFeaturesSelected function to call when there is a double click on entities
 */
export function clickOnEntitiesHandler(selectedEntities, onProductSelected, onFeaturesSelected) {
  clickCount += 1
  // Handle single click
  if (clickCount === MAP_CLICK_EVENT.SIMPLE_CLICK) {
    singleClickTimer = root.setTimeout(() => {
      clickCount = MAP_CLICK_EVENT.INITIAL
      const selectionFeature = {
        id: '',
        label: '',
      }
      if (!isEmpty(selectedEntities)) {
        const selection = head(selectedEntities).feature
        selectionFeature.id = selection.id
        selectionFeature.label = selection.label
      }
      const shouldRemove = isEmpty(selectionFeature.id)
      onProductSelected(shouldRemove, selectionFeature)
    }, 800)
    // Handle double click
  } else if (clickCount === MAP_CLICK_EVENT.DOUBLE_CLICK) {
    root.clearTimeout(singleClickTimer)
    clickCount = MAP_CLICK_EVENT.INITIAL
    // Do not send event if there is no REGARDS feature selected
    if (!isEmpty(selectedEntities)) {
      onFeaturesSelected(selectedEntities)
    }
  }
}

/**
   * Get layers info depending on layerType and selected mode
   * Return only one background layer info or multiple data layer info
   * @param {*} layerType : either BACKGROUND or DATA
   * @param {*} viewMode : needed in arg to get correct value after properties update
   */
export function getLayersInfo(layers, layerType, viewMode) {
  switch (layerType) {
    case UIDomain.MAP_LAYER_TYPES_ENUM.BACKGROUND: {
      const backgroundLayer = find(layers, (layer) => layer.enabled && layer.background && layer.layerViewMode === viewMode)
      if (!backgroundLayer || !backgroundLayer.type || !backgroundLayer.url) {
        throw new Error(`There is no background layer for ${viewMode}`)
      }
      return {
        name: backgroundLayer.layerName,
        type: backgroundLayer.type,
        baseUrl: backgroundLayer.url,
        conf: backgroundLayer.conf ? JSON.parse(backgroundLayer.conf) : {},
        background: true,
        visible: true,
      }
    }
    case UIDomain.MAP_LAYER_TYPES_ENUM.CUSTOM: {
      const customLayers = filter(layers, (layer) => !layer.background && layer.enabled && layer.layerViewMode === viewMode)
      return map(customLayers, (customLayer) => ({
        name: customLayer.layerName,
        type: customLayer.type,
        baseUrl: customLayer.url,
        conf: customLayer.conf ? JSON.parse(customLayer.conf) : {},
        background: false,
        visible: true,
      }))
    }
    default:
      throw new Error(`Unexpected type ${layerType}`)
  }
}
