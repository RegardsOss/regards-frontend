/**
 * LICENSE_PLACEHOLDER
 **/
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
 * @param {ResourceList} resourceDependencies The array of depencies we require in order the component to display
 * @param {function} displayLogic Function taking two arrays of strings as parameters and returning True or False
 * @return {React.Component}
 * @author Xavier-Alexandre Brochard
 */
const withResourceDisplayControl = (DecoratedComponent) => {
  class WithResourceDisplayControl extends React.Component {

    static propTypes = {
      displayLogic: PropTypes.func.isRequired,
      resourceDependencies: PropTypes.arrayOf(PropTypes.string.isRequired),
      // From mapStateToProps
      availableDependencies: PropTypes.arrayOf(PropTypes.string.isRequired),
      isInstance: PropTypes.bool,
    }

    static defaultProps = {
      resourceDependencies: [],
      displayLogic: allMatchHateoasDisplayLogic,
    }

    render() {
      // Remove from otherProps all props that doesn't need to be reinjected in children
      // eslint-disable-next-line no-unused-vars, react/prop-types
      const { displayLogic, resourceDependencies, availableDependencies, isInstance, theme, i18n, dispatch, ...otherProps } = this.props
      const decoratedComponentElement = React.createElement(DecoratedComponent, otherProps)
      const isDisplayed = displayLogic(resourceDependencies, availableDependencies)

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
