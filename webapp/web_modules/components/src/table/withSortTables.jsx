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
import isEqual from 'lodash/isEqual'
import { UIDomain } from '@regardsoss/domain'
import { getDisplayName } from '@regardsoss/display-control'

import TableFilterSortingAndVisibilityContainer from './filters/TableFilterSortingAndVisibilityContainer'

/**
 * Decorates a React component, add sorting column management for multi tabs component.
 * Necessary when SwitchTables is used.
 * Prevent propagation of wrong column sort key when user change tab
 *
 * @type {function}
 * @param {object} columnKeys table column keys
 * @param {React.Component} DecoratedComponent The component to enhance
 * @return {React.Component}
 * @author Théo
 */
const withSortTables = (columnKeys) => (DecoratedComponent) => {
  class WithSortTables extends React.Component {
    static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
      requestParameters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
    }

    static displayName = `WithSortTables(${getDisplayName(DecoratedComponent)})`

    state = {
      requestParameters: {},
    }

    /**
     * Lifecycle method: component will mount. Used here to detect first properties change and update local state
     */
    UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

    /**
     * Lifecycle method: component receive props. Used here to detect properties change and update local state
     * @param {*} nextProps next component properties
     */
    UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

    /**
     * Properties change detected: update local state
     * @param oldProps previous component properties
     * @param newProps next component properties
     */
    onPropertiesUpdated = (oldProps, newProps) => {
      const { requestParameters } = newProps
      if (!isEqual(oldProps.requestParameters, requestParameters)) {
        this.setState({
          requestParameters: UIDomain.SortingHelper.buildSortingParameters(requestParameters, columnKeys),
        })
      }
    }

    render() {
      const { ...otherProps } = this.props
      const { requestParameters } = this.state
      return React.createElement(DecoratedComponent, {
        ...otherProps,
        requestParameters,
      })
    }
  }

  return WithSortTables
}

export default withSortTables
