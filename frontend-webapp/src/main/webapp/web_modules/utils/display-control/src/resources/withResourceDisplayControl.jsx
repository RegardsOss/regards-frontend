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
import omit from 'lodash/omit'
import get from 'lodash/get'
import isString from 'lodash/isString'
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { connect } from '@regardsoss/redux'
import ShowableAtRender from '../ShowableAtRender'
import allMatchHateoasDisplayLogic from './../logics/allMatchHateoasDisplayLogic'
import getDisplayName from '../getDisplayName'

/**
 * Decorates a React component with Hateoas display logic.
 *
 * @type {function}
 * @param {React.Component} DecoratedComponent The component to enhance
 * @return {React.Component}
 * @author Xavier-Alexandre Brochard
 */
const withResourceDisplayControl = (DecoratedComponent) => {
  class WithResourceDisplayControl extends React.Component {
    static propTypes = {
      // Function taking two arrays of strings as parameters and returning True or False
      displayLogic: PropTypes.func,
      // Either the dependency or the array of dependencies we require in order to display the decorated component
      resourceDependencies: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
      ]),
      hideDisabled: PropTypes.bool,
      // From mapStateToProps
      // The full list of dependencies
      availableDependencies: PropTypes.arrayOf(PropTypes.string),
      // Bypass the display logic if user is instance admin
      isInstance: PropTypes.bool,
    }

    static defaultProps = {
      displayLogic: allMatchHateoasDisplayLogic,
      resourceDependencies: [],
      hideDisabled: true,
    }

    render() {
      // Remove from otherProps all props that doesn't need to be reinjected in children
      // eslint-disable-next-line no-unused-vars, react/prop-types
      const {
        displayLogic, resourceDependencies, availableDependencies, isInstance, hideDisabled, ...otherProps
      } = this.props
      const requiredDependencies = isString(resourceDependencies) ? [resourceDependencies] : resourceDependencies
      const isDisplayed = requiredDependencies.length === 0 || displayLogic(requiredDependencies, availableDependencies) || isInstance
      // we provide a disabled to be used by subcomponent - if you provide too the prop we respect it
      const disabled = !isDisplayed || get(otherProps, 'disabled', false)
      const decoratedComponentElement = React.createElement(DecoratedComponent, omit({ ...otherProps, disabled }, ['theme', 'i18n', 'dispatch']))

      if (!hideDisabled) {
        return decoratedComponentElement
      }
      return (
        <ShowableAtRender show={isDisplayed}>
          {decoratedComponentElement}
        </ShowableAtRender>
      )
    }
  }

  // Ease debugging in the React Developer Tools by choosing a display name that communicates that it's the result of an HOC
  WithResourceDisplayControl.displayName = `WithResourceDisplayControl(${getDisplayName(DecoratedComponent)})`

  const mapStateToProps = state => ({
    availableDependencies: CommonEndpointClient.endpointSelectors.getListOfKeys(state),
    isInstance: AuthenticationParametersSelectors.isInstance(state),
  })

  return connect(mapStateToProps)(WithResourceDisplayControl)
}

export default withResourceDisplayControl
