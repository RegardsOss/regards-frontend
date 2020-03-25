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
import { UIDomain, DamDomain } from '@regardsoss/domain'
import { DataManagementShapes, AccessShapes, UIShapes } from '@regardsoss/shape'
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'

/**
 * Module configuration shapes
 * @author Raphaël Mechali
 */

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
  enabledFor: PropTypes.shape({
    [DamDomain.ENTITY_TYPES_ENUM.DATA]: PropTypes.bool,
    [DamDomain.ENTITY_TYPES_ENUM.DATASET]: PropTypes.bool,
  }),
  initiallyEnabled: PropTypes.bool, // is initially enabled?
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
  sorting: AccessShapes.AttributeListConfigurationModel,
})

/**
 * Dataset view configuration
 */
export const DatasetViewsConfiguration = PropTypes.shape({
  ...commonViewsGroupFields,
})

/** Possible restrictions on datasets to show: none, by dataset selection or by dataset models selection */
export const NoDatasetRescriction = PropTypes.shape({
  type: PropTypes.oneOf([UIDomain.DATASET_RESCRICTIONS_TYPES_ENUM.NONE]),
})

export const DatasetSelectionRescriction = PropTypes.shape({
  type: PropTypes.oneOf([UIDomain.DATASET_RESCRICTIONS_TYPES_ENUM.SELECTED_DATASETS]),
  selection: PropTypes.arrayOf(PropTypes.string).isRequired, // in that case, selection is a list of URN
})

export const DatasetModelsRestriction = PropTypes.shape({
  type: PropTypes.oneOf([UIDomain.DATASET_RESCRICTIONS_TYPES_ENUM.SELECTED_MODELS]),
  selection: PropTypes.arrayOf(PropTypes.string).isRequired, // in that case, selection is a list of model names
})

export const DatasetRestriction = PropTypes.oneOfType([
  NoDatasetRescriction,
  DatasetSelectionRescriction,
  DatasetModelsRestriction,
])

/** Configuration of results restrictions */
export const RestrictionsConfiguration = PropTypes.shape({
  byDataset: DatasetRestriction,
})

/** A criterion configuration, with internationalized labels */
export const CriterionConfiguration = PropTypes.shape({
  label: UIShapes.IntlMessage.isRequired,
  pluginInstanceId: PropTypes.string.isRequired,
  pluginId: PropTypes.number.isRequired, // TODO raph check, but it seems to be the plugin ==> better use a business ID
  active: PropTypes.bool.isRequired, // TODO make editable
  conf: PropTypes.object.isRequired, // configuration
})

/** A criteria group, with optional title */
export const CriteriaGroup = PropTypes.shape({
  showTitle: PropTypes.bool.isRequired,
  title: UIShapes.IntlMessage.isRequired,
  criteria: PropTypes.arrayOf(CriterionConfiguration).isRequired,
})

/**
 * Module configuration
 */
const ModuleConfiguration = PropTypes.shape({
  // Special configuration provided if the module is not loaded as an independent module
  selectableAttributes: DataManagementShapes.AttributeModelList,
  // Results facets configuration
  facets: FacetsConfiguration,
  // Results restrictions
  restrictions: RestrictionsConfiguration,
  // Views configurations (by their entities type)
  viewsGroups: PropTypes.shape({
    [ENTITY_TYPES_ENUM.DATA]: DataViewsConfiguration,
    [ENTITY_TYPES_ENUM.DATASET]: DatasetViewsConfiguration,
  }),
  // Criteria groups configuration
  criteriaGroups: PropTypes.arrayOf(CriteriaGroup),
})

export default ModuleConfiguration
