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
import filter from 'lodash/filter'
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { ShowableAtRender } from '@regardsoss/components'
import { BasicFacetsPageableSelectors } from '@regardsoss/store-utils'
import { StringComparison } from '@regardsoss/form-utils'
import { DamDomain } from '@regardsoss/domain'
import { AttributeModel } from '@regardsoss/model'
import ModuleContentComponent from '../components/ModuleContentComponent'
import { FacetArray } from '../model/FacetShape'
import { filterListShape } from '../model/FilterShape'

/**
 * Display the search facets content (mount / unmount children as the show property changes,
 * but alway stays mounted to keep a valid historical state)
 */
export class ModuleContainer extends React.Component {

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    appName: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    project: PropTypes.string,
    moduleConf: PropTypes.shape({
      onFiltersChanged: PropTypes.func.isRequired,
      filters: filterListShape.isRequired,
      show: PropTypes.bool.isRequired,
      resultsSelectors: PropTypes.instanceOf(BasicFacetsPageableSelectors).isRequired,
      attributeModels: PropTypes.objectOf(AttributeModel).isRequired,
    }).isRequired,
    // from map state to props
    // eslint-disable-next-line react/no-unused-prop-types
    facets: FacetArray.isRequired, // facets, used only in onPropertiesChanged
  }

  /** Default component state */
  static DEFAULT_STATE = {
    filters: [],
    facets: [],
  }

  componentWillMount = () => this.onPropertiesChanged({}, this.props)
  componentWillReceiveProps = nextProps => this.onPropertiesChanged(this.props, nextProps)

  onPropertiesChanged = (oldProps, newProps) => {
    const oldState = this.state
    const newState = oldState ? { ...oldState } : ModuleContainer.DEFAULT_STATE
    if (!isEqual(oldProps.facets, newProps.facets) ||
      !isEqual(oldProps.moduleConf.attributeModels, newProps.moduleConf.attributeModels)) {
      // 1 - resolve all facets with their label, removing all empty values and facet without values
      const attributeModels = newProps.moduleConf.attributeModels
      const filteredFacets = (newProps.facets || []).reduce((acc, { attributeName, type, values }) => {
        // 1 - clear empty values, check if the facet should be filtered
        const filteredValues = values.filter(value => value.count)
        if (filteredValues.length < 2) {
          // there is no meaning in a facet with zero or one element (it doesn't facet anything)
          return acc
        }
        // 2 - return resuting facet with label and filtered values
        return [...acc, {
          attributeName,
          label: DamDomain.AttributeModelController.findLabelFromAttributeFullyQualifiedName(attributeName, attributeModels),
          type,
          values: filteredValues,
        }]
      }, [])
      // 2 - sort on facet labels
      filteredFacets.sort((facet1, facet2) => StringComparison.compare(facet1.label, facet2.label))
      // 3 - push them in state
      newState.facets = filteredFacets
    }

    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  getFiltersWithout = filterKey => filter(this.props.moduleConf.filters, ({ filterKey: currentFilterKey }) => currentFilterKey !== filterKey)


  /**
   * Apply a new facet filter to current search (adds or repliace it in current filters list)
   */
  applyFilter = (filterKey, filterLabel, openSearchQuery) => this.updateFilters([...this.getFiltersWithout(filterKey), { filterKey, filterLabel, openSearchQuery }])

  /**
   * Deletes a facet
   */
  deleteFilter = filterKey => this.updateFilters(this.getFiltersWithout(filterKey))

  /**
   * Updates filters list
   */
  updateFilters = (filters) => {
    // dispatch to table
    this.props.moduleConf.onFiltersChanged(filters)
  }

  /**
   * @returns {React.Component}
   */
  render() {
    const { moduleConf: { show, filters } } = this.props
    const { facets } = this.state

    return (
      <ShowableAtRender show={show}>
        <ModuleContentComponent
          facets={facets}
          filters={filters}
          applyFilter={this.applyFilter}
          deleteFilter={this.deleteFilter}
        />
      </ShowableAtRender>
    )
  }
}

const mapStateToProps = (state, { moduleConf: { resultsSelectors, facets } }) => ({
  facets: resultsSelectors.getFacets(state) || [],
})

export default connect(mapStateToProps)(ModuleContainer)
