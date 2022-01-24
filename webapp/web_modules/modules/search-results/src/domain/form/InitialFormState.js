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
import { DamDomain, UIDomain } from '@regardsoss/domain'

/**
 * Defines initial (new) search results module state for form
 * @author Raphaël Mechali
 */

export const INITIAL_FORM_STATE = {
  primaryPane: UIDomain.MODULE_PANE_DISPLAY_MODES_ENUM.EXPANDED_COLLAPSIBLE,
  facets: {
    enabledFor: {
      [DamDomain.ENTITY_TYPES_ENUM.DATA]: true,
      [DamDomain.ENTITY_TYPES_ENUM.DATASET]: true,
    },
    initiallyEnabled: true,
    list: [],
  },
  restrictions: {
    byDataset: {
      type: UIDomain.DATASET_RESTRICTIONS_TYPES_ENUM.NONE,
      selection: [],
    },
  },
  viewsGroups: {
    [DamDomain.ENTITY_TYPES_ENUM.DATA]: {
      enabled: true,
      tabTitle: {},
      initialMode: UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
      enableDownload: false,
      enableRefresh: false,
      sorting: [],
      views: {
        [UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE]: {
          enabled: true,
          attributes: [],
        },
        [UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK]: {
          enabled: false,
          attributes: [],
        },
        [UIDomain.RESULTS_VIEW_MODES_ENUM.MAP]: {
          enabled: false,
          attributes: [],
          mapEngine: UIDomain.MAP_ENGINE_ENUM.CESIUM,
          layers: [
            {
              layerName: 'Layer',
              enabled: false,
              background: false,
              layerViewMode: UIDomain.MAP_VIEW_MODES_ENUM.MODE_3D,
              url: null,
              type: UIDomain.CESIUM_LAYER_TYPES_ENUM.AsynchroneWMS,
            },
          ],
        },
      },
    },
    [DamDomain.ENTITY_TYPES_ENUM.DATASET]: {
      enabled: false,
      tabTitle: {},
      initialMode: UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE,
      enableRefresh: false,
      sorting: [],
      views: {
        [UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE]: {
          enabled: true,
          attributes: [],
        },
      },
    },
  },
  criteriaGroups: [],
}
