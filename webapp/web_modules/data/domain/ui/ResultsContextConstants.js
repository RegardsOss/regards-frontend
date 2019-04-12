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
import { ENTITY_TYPES_ENUM } from '../dam/EntityTypes'
import { MAP_SELECTION_MODES_ENUM } from './MapSelectionModeEnum'
import { MIZAR_LAYER_TYPES_ENUM } from './mizar-api/MizarLayerTypes'
import { RESULTS_VIEW_MODES_ENUM } from './ResultsViewModeEnum'

/**
 * Holds constants and accessors related to results context
 * @author Raphaël Mechali
 */


/** Default view mode for data */
const DEFAULT_VIEW_MODE = RESULTS_VIEW_MODES_ENUM.LIST

/** To be used as default */
const DISABLED_VIEW_MODE_STATE = {
  enabled: false,
  enableSelection: false,
  presentationModels: [],
}

/** To be used as default for map state mode */
const DISABLED_MAP_VIEW_MODE_STATE = {
  enabled: false,
  enableSelection: false,
  presentationModels: [],
  backgroundLayer: {
    url: '',
    type: MIZAR_LAYER_TYPES_ENUM.OSM,
  },
  selectionMode: MAP_SELECTION_MODES_ENUM.PICK_ON_CLICK,
  splitPosition: null,
}

/** To be used as default */
const DISABLED_TYPE_STATE = {
  enabled: false,
  enableDownload: false,
  enableServices: false,
  enableSorting: false,
  enableSearchEntity: false,
  initialSorting: [],
  isInInitialSorting: true,
  mode: DEFAULT_VIEW_MODE,
  facets: { allowed: false, enabled: false, list: [] },
  criteria: {},
  modeState: {
    [RESULTS_VIEW_MODES_ENUM.LIST]: DISABLED_VIEW_MODE_STATE,
    [RESULTS_VIEW_MODES_ENUM.TABLE]: DISABLED_VIEW_MODE_STATE,
    [RESULTS_VIEW_MODES_ENUM.QUICKLOOK]: DISABLED_VIEW_MODE_STATE,
    [RESULTS_VIEW_MODES_ENUM.MAP]: DISABLED_MAP_VIEW_MODE_STATE,
  },
}


/**
 * Extracts and returns current view state (type and mode)
 * @param {*} resultsContext results context (respects corresponding shape)
 * @return {{type: string, mode: string, currentTypeState: *, currentModeState: *}} current type, current type state, current mode and current mode
 */
function getViewData(resultsContext = {}) {
  const { type, typeState } = resultsContext
  const currentTypeState = typeState && type ? typeState[type] : DISABLED_TYPE_STATE
  return {
    type,
    mode: currentTypeState.mode,
    currentTypeState,
    currentModeState: currentTypeState.modeState[currentTypeState.mode],
  }
}

/** Types for which sorting is allowed */
const SORTING_ALLOWED_TYPES = [ENTITY_TYPES_ENUM.DATA, ENTITY_TYPES_ENUM.DOCUMENT]

/**
 * Is sorting allowed for entity type as parameter (ie can entity be used to filter results?)
 * @param {string} type entity type, from ENTITY_TYPES_ENUM
 * @return {boolean} true when allowed, false otherwise
 */
function allowSorting(type) {
  return SORTING_ALLOWED_TYPES.includes(type)
}

/** Types for which selection is allowed */
const SELECTION_ALLOWING_TYPES = [ENTITY_TYPES_ENUM.DATA]

/** Modes for which selection is allowed */
const SELECTION_ALLOWING_MODES = [RESULTS_VIEW_MODES_ENUM.TABLE, RESULTS_VIEW_MODES_ENUM.LIST]

/**
 * Is selection allowed for entity type and view mode as parameter (ie can entity be used to filter results?)
 * @param {string} type entity type, from ENTITY_TYPES_ENUM
 * @param {string} mode view results mode, from RESULTS_VIEW_MODES_ENUM
 * @return {boolean} true when allowed, false otherwise
 */
function allowSelection(type, mode) {
  return SELECTION_ALLOWING_TYPES.includes(type) && SELECTION_ALLOWING_MODES.includes(mode)
}

/** Types for which services are allowed */
const SERVICES_ALLOWING_TYPES = [ENTITY_TYPES_ENUM.DATA]

/**
 * Are services allowed for entity type as parameter
 * @param {string} type entity type, from ENTITY_TYPES_ENUM
 * @return {boolean} true when allowed, false otherwise
 */
function allowServices(type) {
  return SERVICES_ALLOWING_TYPES.includes(type)
}


/** Types for which navigate to (results filtering) is allowed */
const NAVIGATE_TO_ALLOWING_TYPES = [ENTITY_TYPES_ENUM.DATASET]

/**
 * Is navigate to allowed for entity type as parameter (ie can entity be used to filter results?)
 * @param {string} type entity type, from ENTITY_TYPES_ENUM
 * @return {boolean} true when allowed, false otherwise
 */
function allowNavigateTo(type) {
  return NAVIGATE_TO_ALLOWING_TYPES.includes(type)
}

/**
 * Maps each view type to the view type to display on navigate to entity operation
 */
const NAVIGATE_TO_VIEW_TYPE = {
  [ENTITY_TYPES_ENUM.DATASET]: ENTITY_TYPES_ENUM.DATA, // show matching data
  [ENTITY_TYPES_ENUM.DATA]: ENTITY_TYPES_ENUM.DATA, // no change
  [ENTITY_TYPES_ENUM.COLLECTION]: ENTITY_TYPES_ENUM.COLLECTION, // no change
  [ENTITY_TYPES_ENUM.DOCUMENT]: ENTITY_TYPES_ENUM.DOCUMENT, // no change
}

/**
 * Returns view type to display after navigate to operation, according with currently displayed view type
 * @param {*} type current view type
 * @return next view type to display
 */
function getNavigateToViewType(type) {
  return NAVIGATE_TO_VIEW_TYPE[type]
}

export default {
  DEFAULT_VIEW_MODE,
  DISABLED_VIEW_MODE_STATE,
  DISABLED_MAP_VIEW_MODE_STATE,
  DISABLED_TYPE_STATE,
  getViewData,
  allowSorting,
  allowSelection,
  allowServices,
  allowNavigateTo,
  getNavigateToViewType,
}
