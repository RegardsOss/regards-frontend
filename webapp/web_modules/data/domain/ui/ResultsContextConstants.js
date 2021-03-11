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
import { ENTITY_TYPES_ENUM } from '../dam/EntityTypes'
import { MAP_SELECTION_MODES_ENUM } from './MapSelectionModeEnum'
import { MAP_VIEW_MODES_ENUM } from './MapViewModesEnum'
import { RESULTS_VIEW_MODES_ENUM } from './ResultsViewModeEnum'
import { RESULTS_TABS_ENUM } from './ResultsTabs'
import { MAP_ENGINE_ENUM } from './MapEngineEnum'

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
  mapEngine: MAP_ENGINE_ENUM.CESIUM,
  layers: [],
  selectionMode: MAP_SELECTION_MODES_ENUM.PICK_ON_CLICK,
  viewMode: MAP_VIEW_MODES_ENUM.MODE_3D,
  splitPosition: null,
  selectedProducts: [],
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
  facetsAllowed: false,
  modes: {
    [RESULTS_VIEW_MODES_ENUM.LIST]: DISABLED_VIEW_MODE_STATE,
    [RESULTS_VIEW_MODES_ENUM.TABLE]: DISABLED_VIEW_MODE_STATE,
    [RESULTS_VIEW_MODES_ENUM.QUICKLOOK]: DISABLED_VIEW_MODE_STATE,
    [RESULTS_VIEW_MODES_ENUM.MAP]: DISABLED_MAP_VIEW_MODE_STATE,
  },
  criteria: {
    sorting: [],
  },
}

/** Default results context */
const DEFAULT_RESULTS_CONTEXT = {
  selectedTab: RESULTS_TABS_ENUM.MAIN_RESULTS,
  tabs: {
    [RESULTS_TABS_ENUM.MAIN_RESULTS]: {
      facets: {
        enabled: false,
        list: [],
      },
      search: {
        enabled: false,
        open: false,
        groups: [],
      },
      criteria: {
        configurationRestrictions: [],
        staticParameters: [],
        contextTags: [],
        searchCriteria: [],
        appliedFacets: [],
        geometry: [],
        entitiesSelection: [],
        tagsFiltering: [],
        requestFacets: [],
        toponymCriteria: [],
      },
      selectedType: ENTITY_TYPES_ENUM.DATA,
      types: {
        [ENTITY_TYPES_ENUM.DATA]: DISABLED_TYPE_STATE,
        [ENTITY_TYPES_ENUM.DATASET]: DISABLED_TYPE_STATE,
      },
    },
    [RESULTS_TABS_ENUM.DESCRIPTION]: {
      unresolvedRootEntityId: null,
      descriptionPath: [],
      selectedIndex: 0,
    },
    [RESULTS_TABS_ENUM.TAG_RESULTS]: {
      facets: {
        enabled: false,
        list: [],
      },
      search: {
        enabled: false,
        open: false,
        groups: [],
      },
      criteria: {
        configurationRestrictions: [],
        staticParameters: [],
        contextTags: [],
        searchCriteria: [],
        appliedFacets: [],
        geometry: [],
        entitiesSelection: [],
        tagsFiltering: [],
        requestFacets: [],
        toponymCriteria: [],
      },
      selectedType: ENTITY_TYPES_ENUM.DATA,
      types: {
        [ENTITY_TYPES_ENUM.DATA]: DISABLED_TYPE_STATE,
        [ENTITY_TYPES_ENUM.DATASET]: DISABLED_TYPE_STATE,
      },
    },
  },
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

/**
 * Maps each view type to the page size
 */
const PAGE_SIZE_FOR = {
  [RESULTS_VIEW_MODES_ENUM.LIST]: 500,
  [RESULTS_VIEW_MODES_ENUM.TABLE]: 500,
  [RESULTS_VIEW_MODES_ENUM.MAP]: STATIC_CONF.MAP.PAGE_SIZE_MAP,
  [RESULTS_VIEW_MODES_ENUM.QUICKLOOK]: 200,
}

export default {
  RESULTS_INITIAL_TYPE_PREFERENCE,
  DEFAULT_RESULTS_CONTEXT,
  DEFAULT_VIEW_MODE,
  DISABLED_VIEW_MODE_STATE,
  DISABLED_MAP_VIEW_MODE_STATE,
  DISABLED_TYPE_STATE,
  PAGE_SIZE_FOR,
  allowDownload,
  allowSorting,
  allowSelection,
  allowServices,
  allowNavigateTo,
  getNavigateToViewType,
}
