/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import compose from 'lodash/fp/compose'
import filter from 'lodash/filter'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import omit from 'lodash/omit'
import { connect } from '@regardsoss/redux'
import { DamDomain } from '@regardsoss/domain'
import { DataManagementShapes } from '@regardsoss/shape'
import { BasicFacetsPageableSelectors } from '@regardsoss/store-utils'
import { StringComparison } from '@regardsoss/form-utils'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import { FacetArray } from '../../../models/facets/FacetShape'
import { FilterListShape } from '../../../models/facets/FilterShape'
import SearchResultsTableLayoutComponent from '../../../components/user/results/SearchResultsTableLayoutComponent'

import messages from '../../../i18n'
import styles from '../../../styles'

/**
* Search results table layout container, which also acts as proxy callbacks provider for facets and results state
* @author Raphaël Mechali
*/
export class SearchResultsTableLayoutContainer extends React.Component {

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { searchSelectors }) {
    return {
      resultsCount: searchSelectors.getResultsCount(state),
      facets: searchSelectors.getFacets(state),
      isFetching: searchSelectors.isFetching(state),
    }
  }

  static propTypes = {
    resultsCount: PropTypes.number.isRequired,
    filters: FilterListShape,
    attributeModels: PropTypes.objectOf(DataManagementShapes.AttributeModel), // used only in state update
    onFiltersChanged: PropTypes.func.isRequired,
    searchSelectors: PropTypes.instanceOf(BasicFacetsPageableSelectors).isRequired,
    // ... reports all other properties to its child
    // from mapStateToProps
    facets: FacetArray,
    isFetching: PropTypes.bool.isRequired,
    // from mapDispatchToProps
  }

  static defaultProps = {
    resultsCount: 0,
  }

  /** Default component state */
  static DEFAULT_STATE = {
    facets: [],
  }

  /**
   * Lifecycle method component will mount. Used here to detect properties change
   */
  componentWillMount = () => this.onPropertiesChanged({}, this.props)

  /**
   * Lifecycle method component will receive props. Used here to detect properties change
   * @param nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesChanged(this.props, nextProps)

  /**
   * On properties changed: recompute facets and filters from new properties
   */
  onPropertiesChanged = (oldProps, newProps) => {
    const oldState = this.state
    const newState = oldState ? { ...oldState } : SearchResultsTableLayoutContainer.DEFAULT_STATE
    let filteredFacets = get(oldState, 'nextChildProps.facets')
    // 1 - recompute facets only when updated
    if (!isEqual(oldProps.facets, newProps.facets) ||
      !isEqual(oldProps.attributeModels, newProps.attributeModels)) {
      // Resolve all facets with their label, removing all empty values and facet without values
      const attributeModels = newProps.attributeModels
      filteredFacets = (newProps.facets || []).reduce((acc, { attributeName, type, values }) => {
        // Clear empty values, check if the facet should be filtered
        const filteredValues = values.filter(value => value.count)
        if (filteredValues.length < 2) {
          // there is no meaning in a facet with zero or one element (it doesn't facet anything)
          return acc
        }
        // Return resuting facet with label and filtered values
        return [...acc, {
          attributeName,
          label: DamDomain.AttributeModelController.findLabelFromAttributeFullyQualifiedName(attributeName, attributeModels),
          type,
          values: filteredValues,
        }]
      }, [])
      // Sort on facet labels
      filteredFacets.sort((facet1, facet2) => StringComparison.compare(facet1.label, facet2.label))
    }

    // 2 - push facets and next child properties (pre-built for render)
    newState.nextChildProps = {
      ...omit(newProps, ['facets', 'onFiltersChanged', 'attributeModels']),
      facets: filteredFacets,
      onSelectFacet: this.onSelectFacet,
      onDeleteFilter: this.onDeleteFilter,
    }

    // 3 - update when they changed
    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  /**
   * On user selected a facet
   * @param filterKey key to add
   * @param filterLabel filter label
   * @param openSearchQuery corresponding query
   */
  onSelectFacet = (filterKey, filterLabel, openSearchQuery) => this.updateFilters([...this.getFiltersWithout(filterKey), { filterKey, filterLabel, openSearchQuery }])

  /**
   * On user deleted a facet
   * @param filterKey key to delete
   */
  onDeleteFilter = filterKey => this.updateFilters(this.getFiltersWithout(filterKey))

  /**
   * Returns facets
   */
  getFiltersWithout = filterKey => filter(this.props.filters, ({ filterKey: currentFilterKey }) => currentFilterKey !== filterKey)

  /**
   * Updates filters list
   */
  updateFilters = (filters) => {
    // dispatch to table
    this.props.onFiltersChanged(filters)
  }

  render() {
    const { nextChildProps } = this.state
    return (
      <SearchResultsTableLayoutComponent {...nextChildProps} />
    )
  }
}

// TODO fix that container (probably replaces a lot of the search results container)
export default compose(
  connect(SearchResultsTableLayoutContainer.mapStateToProps),
  withI18n(messages), withModuleStyle(styles))(SearchResultsTableLayoutContainer)
