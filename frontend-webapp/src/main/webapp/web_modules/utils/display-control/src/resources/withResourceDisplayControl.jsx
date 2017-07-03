/**
 * LICENSE_PLACEHOLDER
 **/
import isString from 'lodash/isString'
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'
import { ShowableAtRender } from '@regardsoss/components'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { connect } from '@regardsoss/redux'
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
      displayLogic: PropTypes.func.isRequired,
      // Either the dependency or the array of dependencies we require in order to display the decorated component
      resourceDependencies: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string.isRequired),
        PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string.isRequired)),
      ]),
      // From mapStateToProps
      // The full list of dependencies
      availableDependencies: PropTypes.arrayOf(PropTypes.string.isRequired),
      // Bypass the display logic if user is instance admin
      isInstance: PropTypes.bool,
    }

    static defaultProps = {
      displayLogic: allMatchHateoasDisplayLogic,
      resourceDependencies: [],
    }

    render() {
      // Remove from otherProps all props that doesn't need to be reinjected in children
      // eslint-disable-next-line no-unused-vars, react/prop-types
      const { displayLogic, resourceDependencies, availableDependencies, isInstance, theme, i18n, dispatch, ...otherProps } = this.props
      const decoratedComponentElement = React.createElement(DecoratedComponent, otherProps)
      const requiredDependencies = isString(resourceDependencies) ? [resourceDependencies] : resourceDependencies
      const isDisplayed = displayLogic(requiredDependencies, availableDependencies)

      return (
        <ShowableAtRender show={isDisplayed || isInstance}>
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
