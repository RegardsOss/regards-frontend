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
import { UIDomain } from '@regardsoss/domain'
import { DataManagementShapes, AccessShapes } from '@regardsoss/shape'
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'

/**
 * Fields that are commmon to all views (table / list / quicklooks / map)
 */
const commonViewFields = {
  enabled: PropTypes.bool, // is view enabled?
  attributes: AccessShapes.AttributeListConfigurationModel, // attributes and groups to show in view
}

/** Table view (also used for list) */
export const TableViewConfiguration = PropTypes.shape({
  ...commonViewFields,
})

/** Quicklook view */
export const QuicklookViewConfiguration = PropTypes.shape({
  ...commonViewFields,
})

/** Map view */
export const MapViewConfiguration = PropTypes.shape({
  ...commonViewFields,
  backgroundLayer: PropTypes.shape({ // mandatory but cannot be granted when starting new module edition
    url: PropTypes.string,
    type: PropTypes.oneOf(UIDomain.MIZAR_LAYER_TYPES).isRequired,
  }),
})

/** Facets sub configuration */
const FacetsConfiguration = PropTypes.shape({
  enabled: PropTypes.bool,
  initiallyEnabled: PropTypes.bool, // is initially enabled? (ignored when disabled)
  list: AccessShapes.AttributeListConfigurationModel, // facets list (facets are considered disabled when empty)
})

/** Common fields for views groups */
const commonViewsGroupFields = {
  // is views group enabled
  enabled: PropTypes.bool,
  // optional tab title
  tabTitle: PropTypes.shape({
    en: PropTypes.string,
    fr: PropTypes.string,
  }),
  initialMode: PropTypes.oneOf(UIDomain.RESULTS_VIEW_MODES),
  // views belows (all views are not necessarily enabled, according with group entities type)
  views: PropTypes.shape({
    [UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE]: TableViewConfiguration,
    [UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK]: QuicklookViewConfiguration,
    [UIDomain.RESULTS_VIEW_MODES_ENUM.MAP]: MapViewConfiguration,
  }),
}

/**
 * Data view configuration
 */
export const DataViewsConfiguration = PropTypes.shape({
  ...commonViewsGroupFields,
  enableDownload: PropTypes.bool,
  facets: FacetsConfiguration,
  sorting: AccessShapes.AttributeListConfigurationModel,
})

/**
 * Dataset view configuration
 */
export const DatasetViewsConfiguration = PropTypes.shape({
  ...commonViewsGroupFields,
})

/**
 * Document view configuration
 */
export const DocumentsViewsConfiguration = PropTypes.shape({
  ...commonViewsGroupFields,
  enableDownload: PropTypes.bool,
  facets: FacetsConfiguration,
  sorting: AccessShapes.AttributeListConfigurationModel,
})

/**
 * Form entity description
 * @author Sébastien binda
 */
const ModuleConfiguration = PropTypes.shape({
  // Special configuration given if the module is not loaded as an independent module
  selectableAttributes: DataManagementShapes.AttributeModelList,
  // Views configurations (by their entities type)
  viewsGroups: PropTypes.shape({
    [ENTITY_TYPES_ENUM.DATA]: DataViewsConfiguration,
    [ENTITY_TYPES_ENUM.DATASET]: DatasetViewsConfiguration,
    [ENTITY_TYPES_ENUM.DOCUMENT]: DocumentsViewsConfiguration,
  }),
})

export default ModuleConfiguration