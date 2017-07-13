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
import { connect } from '@regardsoss/redux'
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'
import ShowableAtRender from '../ShowableAtRender'
import hateoasDisplayLogic from './hateoasDisplayLogic'
import HateoasLinks from '../model/HateoasLinks'
import getDisplayName from '../getDisplayName'

/**
 * Decorates a React component with Hateoas display logic.
 *
 * @type {function}
 * @param {React.Component} DecoratedComponent The component to enhance
 * @return {React.Component}
 * @author Xavier-Alexandre Brochard
 */
const withHateoasDisplayControl = (DecoratedComponent) => {
  class WithHateoasDisplayControl extends React.Component {

    static propTypes = {
      entityLinks: PropTypes.arrayOf(HateoasLinks),
      hateoasKey: PropTypes.string,
      alwaysDisplayforInstanceUser: PropTypes.bool,
      disableInsteadOfHide: PropTypes.bool,
      // Set by mapStateToProps
      isInstance: PropTypes.bool,
      displayLogic: PropTypes.func,
    }

    static defaultProps = {
      alwaysDisplayforInstanceUser: true,
      disableInsteadOfHide: false,
      displayLogic: hateoasDisplayLogic,
    }

    render() {
      // Remove from otherProps all props that doesn't need to be reinjected in children
      // eslint-disable-next-line no-unused-vars, react/prop-types
      const { entityLinks, hateoasKey, alwaysDisplayforInstanceUser, isInstance, theme, i18n, dispatch, disableInsteadOfHide, displayLogic, ...otherProps } = this.props
      const childProps = otherProps
      const isDisplayed = displayLogic(hateoasKey, entityLinks, isInstance, alwaysDisplayforInstanceUser)
      if (!isDisplayed && disableInsteadOfHide) {
        childProps.disabled = true
      }
      const decoratedComponentElement = React.createElement(DecoratedComponent, childProps)

      return (
        <ShowableAtRender show={isDisplayed || disableInsteadOfHide}>
          {decoratedComponentElement}
        </ShowableAtRender>
      )
    }
  }
  // Ease debugging in the React Developer Tools by choosing a display name that communicates that it's the result of an HOC
  WithHateoasDisplayControl.displayName = `WithHateoasDisplayControl(${getDisplayName(DecoratedComponent)})`

  const mapStateToProps = state => ({
    isInstance: AuthenticationParametersSelectors.isInstance(state),
  })

  return connect(mapStateToProps)(WithHateoasDisplayControl)
}

export default withHateoasDisplayControl
