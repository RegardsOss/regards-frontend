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
import { connect } from '@regardsoss/redux'
import { UIShapes } from '@regardsoss/shape'
import { BasicSelector } from '@regardsoss/store-utils'
import { FiltersActions } from '@regardsoss/components'
import FiltersPaneComponent from './FiltersPaneComponent'

/**
 * @author Théo Lasserre
 */
export class FiltersPaneContainer extends React.Component {
  static propTypes = {
    isPaneOpened: PropTypes.bool.isRequired,
    onCloseFiltersPane: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    defaultFiltersState: PropTypes.object,
    ignoredURLParameters: PropTypes.arrayOf(PropTypes.string),
    filtersComponent: PropTypes.func.isRequired,
    updateRequestParameters: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    filtersComponentProps: PropTypes.object,
    // eslint-disable-next-line react/no-unused-prop-types
    filtersActions: PropTypes.instanceOf(FiltersActions).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    filtersSelectors: PropTypes.instanceOf(BasicSelector).isRequired,
    filtersI18n: UIShapes.FiltersI18nList.isRequired,
    // from mapDispatchToProps
    updateFiltersStore: PropTypes.func.isRequired,
    clearFiltersStore: PropTypes.func.isRequired,
    // from mapStateToProps
    // eslint-disable-next-line react/forbid-prop-types
    filters: PropTypes.object,
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { filtersActions }) {
    return {
      updateFiltersStore: (filtersValues) => dispatch(filtersActions.updateFiltersStore(filtersValues)),
      clearFiltersStore: () => dispatch(filtersActions.clearFiltersStore()),
    }
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { filtersSelectors }) {
    return {
      filters: filtersSelectors.getFilters(state),
    }
  }

  render() {
    const {
      isPaneOpened, onCloseFiltersPane, defaultFiltersState, filtersComponent, updateRequestParameters,
      filtersComponentProps, updateFiltersStore, clearFiltersStore, filters, ignoredURLParameters,
      filtersI18n,
    } = this.props
    return (
      <FiltersPaneComponent
        isPaneOpened={isPaneOpened}
        onCloseFiltersPane={onCloseFiltersPane}
        defaultFiltersState={defaultFiltersState}
        ignoredURLParameters={ignoredURLParameters}
        filtersComponent={filtersComponent}
        updateRequestParameters={updateRequestParameters}
        filtersComponentProps={filtersComponentProps}
        updateFiltersStore={updateFiltersStore}
        clearFiltersStore={clearFiltersStore}
        filters={filters}
        filtersI18n={filtersI18n}
      />
    )
  }
}
export default connect(
  FiltersPaneContainer.mapStateToProps,
  FiltersPaneContainer.mapDispatchToProps)(FiltersPaneContainer)
