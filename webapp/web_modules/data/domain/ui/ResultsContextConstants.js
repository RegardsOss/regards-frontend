/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { RESULTS_TABS, RESULTS_TABS_ENUM } from './ResultsTabs'

/**
 * Holds constants and accessors related to results context
 * @author Raphaël Mechali
 */

/** Preferred initial entity type in results types */
const RESULTS_INITIAL_TYPE_PREFERENCE = [
  ENTITY_TYPES_ENUM.DATASET,
  ENTITY_TYPES_ENUM.DATA,
]

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
  ...DISABLED_VIEW_MODE_STATE,
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
  selectedMode: DEFAULT_VIEW_MODE,
  facets: { allowed: false, enabled: false, list: [] },
  modes: {
    [RESULTS_VIEW_MODES_ENUM.LIST]: DISABLED_VIEW_MODE_STATE,
    [RESULTS_VIEW_MODES_ENUM.TABLE]: DISABLED_VIEW_MODE_STATE,
    [RESULTS_VIEW_MODES_ENUM.QUICKLOOK]: DISABLED_VIEW_MODE_STATE,
    [RESULTS_VIEW_MODES_ENUM.MAP]: DISABLED_MAP_VIEW_MODE_STATE,
  },
  criteria: {
    requestFacets: [],
    sorting: [],
  },
}


/** Default results context */
const DEFAULT_RESULTS_CONTEXT = {
  selectedTab: RESULTS_TABS_ENUM.MAIN_RESULTS,
  tabs: {
    [RESULTS_TABS_ENUM.MAIN_RESULTS]: {
      criteria: {
        contextTags: [],
        otherFilters: [],
        quicklookFiltering: [],
        appliedFacets: [],
        geometry: [],
        entitiesSelection: [],
        tagsFiltering: [],
      },
      selectedType: ENTITY_TYPES_ENUM.DATA,
      types: PropTypes.shape({
        [ENTITY_TYPES_ENUM.DATA]: DISABLED_TYPE_STATE,
        [ENTITY_TYPES_ENUM.DATASET]: DISABLED_TYPE_STATE,
      }).isRequired,
    },
    [RESULTS_TABS_ENUM.DESCRIPTION]: { descriptionPath: [] },
    [RESULTS_TABS_ENUM.TAG_RESULTS]: {
      criteria: {
        contextTags: [],
        otherFilters: [],
        quicklookFiltering: [],
        appliedFacets: [],
        geometry: [],
        entitiesSelection: [],
        tagsFiltering: [],
      },
      selectedType: ENTITY_TYPES_ENUM.DATA,
      types: PropTypes.shape({
        [ENTITY_TYPES_ENUM.DATA]: DISABLED_TYPE_STATE,
        [ENTITY_TYPES_ENUM.DATASET]: DISABLED_TYPE_STATE,
      }).isRequired,
    },
  },
}


/**
 * Extracts and returns current view state (type and mode) in results tab
 * @param {*} resultsContext results context (respects corresponding shape)
 * @param {string} tabType tab (one of RESULTS_TABS_ENUM.MAIN_RESULTS | RESULTS_TABS_ENUM.TAG_RESULTS)
 * @return {{tab: *, selectedType: string, selectedMode: string, selectedTypeState: *, selectedModeState: *}} tab, selected type,
 * selected type state, selected mode and selected mode
 */
function getResultsViewData(resultsContext = {}, tabType) {
  // check tab type
  if (!RESULTS_TABS.includes(tabType)) {
    throw new Error(`Invalid tab type ${tabType}`)
  }
  const tab = resultsContext.tabs[tabType]
  const { selectedType, types } = tab
  const selectedTypeState = selectedType && types ? types[selectedType] : DISABLED_TYPE_STATE
  return {
    tab,
    selectedType,
    selectedMode: selectedTypeState.selectedMode,
    selectedTypeState,
    selectedModeState: selectedTypeState.modes[selectedTypeState.selectedMode],
  }
}

/** Types for which download is allowed */
const DOWNLOAD_ALLOWED_TYPES = [ENTITY_TYPES_ENUM.DATA]

/**
 * Is download allowed for entity type as parameter
 * @param {string} type entity type, from ENTITY_TYPES_ENUM
 * @return {boolean} true when allowed, false otherwise
 */
function allowDownload(type) {
  return DOWNLOAD_ALLOWED_TYPES.includes(type)
}

/** Types for which sorting is allowed */
const SORTING_ALLOWED_TYPES = [ENTITY_TYPES_ENUM.DATA]

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
  RESULTS_INITIAL_TYPE_PREFERENCE,
  DEFAULT_RESULTS_CONTEXT,
  DEFAULT_VIEW_MODE,
  DISABLED_VIEW_MODE_STATE,
  DISABLED_MAP_VIEW_MODE_STATE,
  DISABLED_TYPE_STATE,
  getViewData: getResultsViewData,
  allowDownload,
  allowSorting,
  allowSelection,
  allowServices,
  allowNavigateTo,
  getNavigateToViewType,
}
