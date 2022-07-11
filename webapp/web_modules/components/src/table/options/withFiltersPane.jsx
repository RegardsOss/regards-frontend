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
import { getDisplayName } from '@regardsoss/display-control'
import {
  FiltersPaneComponent,
} from '@regardsoss/components'
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
    }

    static displayName = `WithFiltersPane(${getDisplayName(DecoratedComponent)})`

    render() {
      // Remove from otherProps all props that doesn't need to be reinjected in children
      // eslint-disable-next-line no-unused-vars, react/prop-types
      const {
        isPaneOpened, onCloseFiltersPane, updateRequestParameters, ...otherProps
      } = this.props

      return (
        <FiltersPaneComponent
          isPaneOpened={isPaneOpened}
          onCloseFiltersPane={onCloseFiltersPane}
          defaultFiltersState={defaultFiltersState}
          filtersComponent={DecoratedComponent}
          updateRequestParameters={updateRequestParameters}
          filtersComponentProps={otherProps}
        />
      )
    }
  }

  return WithFiltersPane
}

export default withFiltersPane
