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
import {
  CommonDomain, DamDomain, UIDomain, CatalogDomain,
} from '@regardsoss/domain'
import { getChainableTypeChecker } from '../../rs-common'
import { AttributeModel } from '../../rs-dam/AttributeModel'
import { RequestParameters } from '../../rs-common/RequestParameters'


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
const BasicCriterion = PropTypes.shape({
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

/** A tag criterion (with query parameters constraint) */
export const TagCriterion = PropTypes.shape({
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(CatalogDomain.TAG_TYPES).isRequired,
  searchKey: PropTypes.string.isRequired, // search key, which is word when a type is WORD and entity ID otherwise
  ...commonCriterionFields,
})

/** A geometry criterion */
export const GeometryCriterion = PropTypes.shape({
  ...commonCriterionFields,
})

/** A tags array */
export const TagsArray = PropTypes.arrayOf(TagCriterion)

/** A sorting criterion */
export const SortingCriterion = PropTypes.shape({
  attribute: AttributeModel.isRequired, // corresponding attribute
  sortOrder: PropTypes.oneOf([CommonDomain.SORT_ORDERS_ENUM.ASCENDING_ORDER, CommonDomain.SORT_ORDERS_ENUM.DESCENDING_ORDER]), // one the ASCENDING / DESCENDING orders (NONE should not be seen here)
  ...commonCriterionFields,
})

/** Defines a common criteria arrays map, without specific fields */
const criteriaArraysMap = PropTypes.objectOf(PropTypes.arrayOf(BasicCriterion))

/**
 * Criteria part validator: it validates each key in criteria is a BasicCriterion array and optionnaly checks a shape (fieldsValidator)
 * For the sake of default state creation, it is possible to turn off specific shape checking when the parent element is disabled
 * (parameter whenEnabled = true)
 * @param {Function} fieldsValidator PropType validator to apply to criteria field, null allowed
 * @param {boolean} whenEnabled when true, if properties bag does not hold enabled:true, no check will be performed
 */
function getCriteriaWithFieldsValidator(fieldsValidator = null, whenEnabled = true) {
  // build a chainable checker
  return getChainableTypeChecker((props, propName, componentName) => {
    if (whenEnabled && !props.enabled) {
      return null
    }

    // A - Check each mandatory search results field is present
    if (fieldsValidator) {
      PropTypes.checkPropTypes(fieldsValidator, props, propName, componentName)
    }
    // B - check all object properties are criteria arrays
    PropTypes.checkPropTypes(criteriaArraysMap.isRequired, props, propName, componentName)
    return null
  })
}

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
  attributes: PropTypes.arrayOf(AttributeModel).isRequired, // attributes displayed in this presentation model
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
  criteria: getCriteriaWithFieldsValidator(), // Free fields allowed for external controllers
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
  // initial presentation models with their state (table columns reset functionnality)
  initialPresentationModels: PropTypes.arrayOf(PropTypes.oneOfType([AttributePresentationModel, FunctionalPresentationModel])).isRequired,
  presentationModels: PropTypes.arrayOf(PropTypes.oneOfType([AttributePresentationModel, FunctionalPresentationModel])).isRequired,
}

/**
 * View mode state for quicklooks
 */
const QuicklookViewModeState = PropTypes.shape({
  ...commonViewStateFields,
  presentationModels: PropTypes.arrayOf(AttributePresentationModel).isRequired,
  // quicklooks graphics configuration
  graphicsConfiguration: PropTypes.shape({
    quicklookColumnWidth: PropTypes.number,
    quicklookColumnGutter: PropTypes.number,
  }),
  // Override criteria to force quicklook specific filter presence
  criteria: getCriteriaWithFieldsValidator(
    PropTypes.shape({
      quicklookFiltering: PropTypes.arrayOf(BasicCriterion).isRequired,
    }).isRequired),
})

/**
 * View mode state for maps
 */
const MapViewModeState = PropTypes.shape({
  ...commonViewStateFields,
  presentationModels: PropTypes.arrayOf(AttributePresentationModel).isRequired,
  // TODO: add specific map fields
  // Override criteria to force quicklook specific filter presence
  criteria: getCriteriaWithFieldsValidator(PropTypes.shape({
    quicklookFiltering: PropTypes.arrayOf(BasicCriterion).isRequired,
  }).isRequired),
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
  // current mode in view group
  mode: PropTypes.oneOf(UIDomain.RESULTS_VIEW_MODES).isRequired,
  // optional group label (from configuration)
  label: PropTypes.shape({
    en: PropTypes.string,
    fr: PropTypes.string,
  }),
  // facets related state
  facets: PropTypes.shape({
    allowed: PropTypes.bool.isRequired,
    enabled: PropTypes.bool.isRequired,
    list: PropTypes.arrayOf(RequestFacetCriterion).isRequired,
  }).isRequired,
  // Criteria that apply for whole type group (facets, sortables.....). Free fields allowed for external controllers
  criteria: getCriteriaWithFieldsValidator(PropTypes.shape({
    requestFacets: PropTypes.arrayOf(RequestFacetCriterion).isRequired, // List of requested facets on results
    // Sorting attributes with sorting types. The first sorting in array is the first applied when in multi-sort
    sorting: PropTypes.arrayOf(SortingCriterion).isRequired,
  }).isRequired),
  // state by mode
  modeState: PropTypes.shape({
    [UIDomain.RESULTS_VIEW_MODES_ENUM.LIST]: ListViewModeState.isRequired,
    [UIDomain.RESULTS_VIEW_MODES_ENUM.TABLE]: TableViewModeState.isRequired,
    [UIDomain.RESULTS_VIEW_MODES_ENUM.QUICKLOOK]: QuicklookViewModeState.isRequired,
    [UIDomain.RESULTS_VIEW_MODES_ENUM.MAP]: MapViewModeState.isRequired,
  }).isRequired,
})

/** Complete results context */
export const ResultsContext = PropTypes.shape({
  // current entity type
  type: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired,
  // criteria applying to the whole results view (free fields allowed for external controllers)
  criteria: getCriteriaWithFieldsValidator(PropTypes.shape({
    contextTags: PropTypes.arrayOf(TagCriterion).isRequired, // parent controller tags (user cannot remove them)
    tags: PropTypes.arrayOf(TagCriterion).isRequired, // user added tags
    appliedFacets: PropTypes.arrayOf(SelectedFacetCriterion).isRequired, // List of selected facets, filtering results
    geometry: PropTypes.arrayOf(GeometryCriterion).isRequired,
  }).isRequired, false),
  // view state for each entity type
  typeState: PropTypes.shape({
    [DamDomain.ENTITY_TYPES_ENUM.DATA]: ViewsGroupState.isRequired,
    [DamDomain.ENTITY_TYPES_ENUM.DATASET]: ViewsGroupState.isRequired,
    [DamDomain.ENTITY_TYPES_ENUM.DOCUMENT]: ViewsGroupState.isRequired,
    [DamDomain.ENTITY_TYPES_ENUM.COLLECTION]: ViewsGroupState.isRequired,
  }).isRequired,
})
