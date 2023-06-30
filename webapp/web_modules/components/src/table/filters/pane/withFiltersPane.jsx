/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { getDisplayName } from '@regardsoss/display-control'
import { UIShapes } from '@regardsoss/shape'
import { BasicSelector } from '@regardsoss/store-utils'
import { FiltersPaneContainer, FiltersActions } from '@regardsoss/components'
/**
 * Decorates a React component, add filter pane management.
 *
 * @type {function}
 * @param {object} defaultFiltersState initial form state
 * @param {React.Component} DecoratedComponent The component to enhance
 * @return {React.Component}
 * @author Théo
 * @author Léo
 */
const withFiltersPane = (defaultFiltersState) => (DecoratedComponent) => {
  class WithFiltersPane extends React.Component {
    static propTypes = {
      isPaneOpened: PropTypes.bool.isRequired,
      onCloseFiltersPane: PropTypes.func.isRequired,
      updateRequestParameters: PropTypes.func,
      ignoredURLParameters: PropTypes.arrayOf(PropTypes.string),
      filtersActions: PropTypes.instanceOf(FiltersActions),
      filtersSelectors: PropTypes.instanceOf(BasicSelector),
      filtersI18n: UIShapes.FiltersI18nList,
    }

    static displayName = `WithFiltersPane(${getDisplayName(DecoratedComponent)})`

    render() {
      const {
        isPaneOpened, onCloseFiltersPane, updateRequestParameters, filtersActions,
        filtersI18n, filtersSelectors, ignoredURLParameters, ...otherProps
      } = this.props
      return (
        <FiltersPaneContainer
          isPaneOpened={isPaneOpened}
          onCloseFiltersPane={onCloseFiltersPane}
          defaultFiltersState={defaultFiltersState}
          ignoredURLParameters={ignoredURLParameters}
          filtersComponent={DecoratedComponent}
          updateRequestParameters={updateRequestParameters}
          filtersActions={filtersActions}
          filtersSelectors={filtersSelectors}
          filtersI18n={filtersI18n}
          filtersComponentProps={otherProps}
        />
      )
    }
  }

  return WithFiltersPane
}

export default withFiltersPane
