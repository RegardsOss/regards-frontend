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
import {
  CommonDomain, DamDomain, UIDomain, CatalogDomain,
} from '@regardsoss/domain'
import { RequestParameters } from '../../rs-common/RequestParameters'
import { AttributeModel, AttributeModelContent } from '../../rs-dam/AttributeModel'
import { Entity } from '../../rs-catalog/entity/Entity'
import { LayerDefinition } from '../LayerDefinition'
import { DescriptionTreeEntry, EntityWithTreeEntry } from '../EntityWithTreeEntry'

/**
 * Defines results module context definition
 * @author Raphaël Mechali
 */

/** Fields common to all criteria */
const commonCriterionFields = {
  // criterion query parameters: key is parameter key, value is parameter value
  requestParameters: RequestParameters.isRequired,
}

/** An external query search criterion, as emitted by search form for instance */
export const BasicCriterion = PropTypes.shape({
  ...commonCriterionFields,
})

export const StaticParameterCriterion = PropTypes.shape({
  label: PropTypes.string.isRequired, // label explains the purpose of this criterion
  ...commonCriterionFields,
})

/** A requested facet criterion, emitted and consumed by search results */
export const RequestFacetCriterion = PropTypes.shape({
  facetLabels: PropTypes.objectOf(PropTypes.string).isRequired, // label map by locale
  attribute: AttributeModel.isRequired,
  ...commonCriterionFields,
})

/** Fields common to all selected facet value criterion types  */
const commonSelectFacetCriterionFields = {
  facetLabels: PropTypes.objectOf(PropTypes.string).isRequired, // corresponding facet label map by locale
  attribute: AttributeModel.isRequired, // attribute that facet is filtering
  facetType: PropTypes.oneOf(CatalogDomain.FACET_TYPES).isRequired, // specified by each selected facet criterion type
  facetValue: PropTypes.any.isRequired, // specified by each selected facet criterion type
  ...commonCriterionFields,
}
/** Selected facet value criterion for boolean facets */
export const SelectedBooleanFacetCriterion = PropTypes.shape({
  ...commonSelectFacetCriterionFields,
  facetType: PropTypes.oneOf([CatalogDomain.FACET_TYPES_ENUM.BOOLEAN]).isRequired,
  facetValue: PropTypes.bool.isRequired,
})
/** Selected facet value criterion for date range facets */
export const SelectedDateRangeFacetCriterion = PropTypes.shape({
  ...commonSelectFacetCriterionFields,
  facetType: PropTypes.oneOf([CatalogDomain.FACET_TYPES_ENUM.DATE]).isRequired,
  facetValue: PropTypes.shape({ // date range as optional string values
    lower: PropTypes.string,
    upper: PropTypes.string,
  }),
})
/** Selected facet value criterion for date range facets */
export const SelectedNumberRangeFacetCriterion = PropTypes.shape({
  ...commonSelectFacetCriterionFields,
  facetType: PropTypes.oneOf([CatalogDomain.FACET_TYPES_ENUM.NUMBER]).isRequired,
  facetValue: PropTypes.shape({ // number rangeas optional string values
    lower: PropTypes.string,
    upper: PropTypes.string,
  }),
})
/** Selected facet value criterion for date range facets */
export const SelectedStringFacetCriterion = PropTypes.shape({
  ...commonSelectFacetCriterionFields,
  facetType: PropTypes.oneOf([CatalogDomain.FACET_TYPES_ENUM.STRING]).isRequired,
  facetValue: PropTypes.string.isRequired,
})

/** A selected facet criterion, emitted and consumed by search results */
export const SelectedFacetCriterion = PropTypes.oneOfType([
  SelectedBooleanFacetCriterion,
  SelectedDateRangeFacetCriterion,
  SelectedNumberRangeFacetCriterion,
  SelectedStringFacetCriterion])

/** An entity tag criterion */
export const EntityTagCriterion = PropTypes.shape({
  type: PropTypes.oneOf([
    CatalogDomain.TAG_TYPES_ENUM.COLLECTION,
    CatalogDomain.TAG_TYPES_ENUM.DATA,
    CatalogDomain.TAG_TYPES_ENUM.DATASET,
  ]).isRequired,
  entity: Entity.isRequired,
  searchKey: PropTypes.string.isRequired,
  ...commonCriterionFields,
})

/** A simple word tag criterion */
export const WordTagCriterion = PropTypes.shape({
  type: PropTypes.oneOf([CatalogDomain.TAG_TYPES_ENUM.WORD]).isRequired,
  searchKey: PropTypes.string.isRequired,
  ...commonCriterionFields,
})

/** An unresolved tag (usually an entity that could not be retrieved, transitory state) */
export const UnresolvedTagCriterion = PropTypes.shape({
  type: PropTypes.oneOf([CatalogDomain.TAG_TYPES_ENUM.UNRESOLVED]).isRequired,
  searchKey: PropTypes.string.isRequired,
  ...commonCriterionFields,
})

/** A tag criterion (with query parameters constraint) */
export const TagCriterion = PropTypes.oneOfType([EntityTagCriterion, WordTagCriterion, UnresolvedTagCriterion])

/** A tags array */
export const TagsArray = PropTypes.arrayOf(TagCriterion)

/** A geometry criterion */
export const GeometryCriterion = PropTypes.shape({
  // area points (as coordinates array)
  point1: PropTypes.arrayOf(PropTypes.number).isRequired,
  point2: PropTypes.arrayOf(PropTypes.number).isRequired,
  // request
  ...commonCriterionFields,
})

/** An entities selection criterion */
export const EntitiesSelectionCriterion = PropTypes.shape({
  entitiesCount: PropTypes.number.isRequired,
  ...commonCriterionFields,
})

/** A sorting criterion */
export const SortingCriterion = PropTypes.shape({
  attribute: AttributeModel.isRequired, // corresponding attribute
  sortOrder: PropTypes.oneOf([CommonDomain.SORT_ORDERS_ENUM.ASCENDING_ORDER, CommonDomain.SORT_ORDERS_ENUM.DESCENDING_ORDER]), // one the ASCENDING / DESCENDING orders (NONE should not be seen here)
  ...commonCriterionFields,
})

/** Holds a resolved attribute and configured rendering data (later resolved, depending on view) */
export const AttributeAndRender = PropTypes.shape({
  renderer: PropTypes.string, // optional renderer type
  model: AttributeModel.isRequired, // corresponding attribute model
})

/** An attribute presentation model */
export const AttributePresentationModel = PropTypes.shape({
  // The key used to refer to this model (for custom columns, it identifies them too)
  key: PropTypes.string.isRequired,
  // internationalized label for presentation, optional
  label: PropTypes.shape({
    en: PropTypes.string.isRequired,
    fr: PropTypes.string.isRequired,
  }),
  visible: PropTypes.bool.isRequired,
  attributes: PropTypes.arrayOf(AttributeAndRender).isRequired, // attributes displayed in this presentation model
  enableSorting: PropTypes.bool.isRequired, // Is it possible to sort using this presentation model attribute? (attributes.length === 1 in such cases)
})

/**
 * A functional presentation model (like sort, options...): allows to add non attributes elements that can
 * be ordered and hidden as any other attribute presentation model. Especially used in tables
 */
export const FunctionalPresentationModel = PropTypes.shape({
  key: PropTypes.string.isRequired, // for such model, key also points out the functionnality type
  visible: PropTypes.bool.isRequired,
})

/** Fields common to all view types */
export const commonViewStateFields = {
  enabled: PropTypes.bool.isRequired,
  enableSelection: PropTypes.bool.isRequired,
}

/**
 * ListView mode state for list
 */
const ListViewModeState = PropTypes.shape({
  ...commonViewStateFields,
  presentationModels: PropTypes.arrayOf(AttributePresentationModel).isRequired,
})

/**
 * View mode state for table
 */
const TableViewModeState = {
  ...commonViewStateFields,
  // initial presentation models with their state (table columns reset functionality)
  initialPresentationModels: PropTypes.arrayOf(PropTypes.oneOfType([AttributePresentationModel, FunctionalPresentationModel])).isRequired,
  presentationModels: PropTypes.arrayOf(PropTypes.oneOfType([AttributePresentationModel, FunctionalPresentationModel])).isRequired,
}

/**
 * View mode state for quicklooks
 */
const QuicklookViewModeState = PropTypes.shape({
  ...commonViewStateFields,
  presentationModels: PropTypes.arrayOf(AttributePresentationModel).isRequired,
})

/**
 * View mode state for maps
 */
const MapViewModeState = PropTypes.shape({
  ...commonViewStateFields,
  mapEngine: PropTypes.oneOf(UIDomain.MAP_ENGINE).isRequired,
  presentationModels: PropTypes.arrayOf(AttributePresentationModel).isRequired,
  layers: PropTypes.arrayOf(LayerDefinition).isRequired,
  mapSelectionMode: PropTypes.oneOf(UIDomain.MAP_SELECTION_MODES).isRequired, // current map selection mode
  viewMode: PropTypes.oneOf(UIDomain.MAP_VIEW_MODES).isRequired, // current view mode
  splitPosition: PropTypes.number, // current split position
  zoomTo: PropTypes.shape({
    feature: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
})

/**
 * A view entity state (held for each available entity type, holds each mode state)
 */
export const ViewsGroupState = PropTypes.shape({
  // is view enabled?
  enabled: PropTypes.bool.isRequired,
  // is download enabled?
  enableDownload: PropTypes.bool.isRequired,
  // are services enabled for that group
  enableServices: PropTypes.bool.isRequired,
  // Is it allowed to restrict search results by that view entities (ie search one of the entities)?
  enableSearchEntity: PropTypes.bool.isRequired,
  // is sorting enabled in that view group?
  enableSorting: PropTypes.bool.isRequired,
  // Initial sorting for views group or empty array
  initialSorting: PropTypes.arrayOf(SortingCriterion).isRequired,
  // Is currently in initial sorting state
  isInInitialSorting: PropTypes.bool.isRequired,
  // optional group label (from configuration)
  label: PropTypes.shape({
    en: PropTypes.string,
    fr: PropTypes.string,
  }),
  facetsAllowed: PropTypes.bool.isRequired,
  // Criteria that apply for whole type group (facets, sortables.....). Free fields allowed for external controllers
  criteria: PropTypes.shape({
    // Sorting attributes with sorting types. The first sorting in array is the first applied when in multi-sort
    sorting: PropTypes.arrayOf(SortingCriterion).isRequired,
  }).isRequired,
  // selected mode in view group
  selectedMode: PropTypes.oneOf(UIDomain.RESULTS_VIEW_MODES).isRequired,
  // state by mode
  modes: PropTypes.shape({
    [UIDomain.RESULTS_VIEW_MODES_ENUM.LIST]: ListViewModeState.isRequired,
    [UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE]: TableViewModeState.isRequired,
    [UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK]: QuicklookViewModeState.isRequired,
    [UIDomain.RESULTS_VIEW_MODES_ENUM.MAP]: MapViewModeState.isRequired,
  }).isRequired,
})

/**
 * An appying search criterion (holds only runtime data)
 */
export const ApplyingSearchCriterion = PropTypes.shape({
  pluginInstanceId: PropTypes.string.isRequired, // plugin instance ID (generated by the front end)
  // eslint-disable-next-line react/forbid-prop-types
  state: PropTypes.object, // current plugin state
  ...commonCriterionFields, // current plugin parameters
})

/** Search criterion from configuration */
export const SearchCriterion = PropTypes.shape({
  pluginId: PropTypes.number.isRequired,
  pluginInstanceId: PropTypes.string.isRequired,
  conf: PropTypes.shape({ // configuration
    attributes: PropTypes.objectOf(AttributeModelContent).isRequired,
  }),
  label: PropTypes.shape({
    en: PropTypes.string, // english group label, optional
    fr: PropTypes.string, // french group label, optional
  }).isRequired,
})

/**
 * A criteria group from configuration
 */
export const SearchCriteriaGroup = PropTypes.shape({
  showTitle: PropTypes.bool.isRequired,
  title: PropTypes.shape({
    en: PropTypes.string, // english group label, optional
    fr: PropTypes.string, // french group label, optional
  }).isRequired, // labels dictionary, required
  criteria: PropTypes.arrayOf(SearchCriterion).isRequired,
})

/**
 * Common to all results views
 */
export const ResultsTab = PropTypes.shape({
  facets: PropTypes.shape({
    enabled: PropTypes.bool.isRequired,
    list: PropTypes.arrayOf(RequestFacetCriterion).isRequired,
  }).isRequired,
  search: PropTypes.shape({
    enabled: PropTypes.bool.isRequired, // search enabled for that tab?
    open: PropTypes.bool.isRequired, // is currently open?
    groups: PropTypes.arrayOf(SearchCriteriaGroup).isRequired,
  }),
  criteria: PropTypes.shape({
    configurationRestrictions: PropTypes.arrayOf(BasicCriterion).isRequired, // Restrictions from configuration
    staticParameters: PropTypes.arrayOf(StaticParameterCriterion), // Static criterion, only used on MAIN_RESULTS
    unactiveStaticParameters: PropTypes.arrayOf(PropTypes.bool), // Currently unactived static criterion, only used on MAIN_RESULTS
    contextTags: TagsArray.isRequired, // Other filters (especially used by tag results tab)
    searchCriteria: PropTypes.arrayOf(ApplyingSearchCriterion).isRequired, // Currently applying search criteria
    appliedFacets: PropTypes.arrayOf(SelectedFacetCriterion).isRequired, // List of selected facets
    geometry: PropTypes.arrayOf(GeometryCriterion).isRequired, // Selected filtering geometry criteria
    entitiesSelection: PropTypes.arrayOf(EntitiesSelectionCriterion).isRequired, // Selected entities set criteria
    requestFacets: PropTypes.arrayOf(RequestFacetCriterion).isRequired, // List of requested facets on results
    tagsFiltering: TagsArray.isRequired, // applying tags (parent can set some here)
    toponymCriteria: PropTypes.arrayOf(BasicCriterion).isRequired,
  }),
  selectedType: PropTypes.oneOf([DamDomain.ENTITY_TYPES_ENUM.DATA, DamDomain.ENTITY_TYPES_ENUM.DATASET]).isRequired,
  types: PropTypes.shape({
    [DamDomain.ENTITY_TYPES_ENUM.DATA]: ViewsGroupState.isRequired,
    [DamDomain.ENTITY_TYPES_ENUM.DATASET]: ViewsGroupState.isRequired,
  }).isRequired,
})

/**
 * Description results tab model
 */
export const DescriptionTabModel = PropTypes.shape({
  unresolvedTreeEntry: DescriptionTreeEntry,
  unresolvedRootEntityId: PropTypes.string, // used when entity from URL could not be resolved at loading time
  // Entities in current description path (empty when no description)
  descriptionPath: PropTypes.arrayOf(EntityWithTreeEntry).isRequired,
  // Displayed entity index in current description path
  selectedIndex: PropTypes.number.isRequired,
})

/** Complete results context: holds only the three tabs */
export const ResultsContext = PropTypes.shape({
  selectedTab: PropTypes.oneOf(UIDomain.RESULTS_TABS).isRequired,
  tabs: PropTypes.shape({
    [UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS]: ResultsTab.isRequired,
    [UIDomain.RESULTS_TABS_ENUM.DESCRIPTION]: DescriptionTabModel.isRequired,
    [UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS]: ResultsTab.isRequired,
  }),
})
