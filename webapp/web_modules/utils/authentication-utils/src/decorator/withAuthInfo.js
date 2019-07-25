/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from '@regardsoss/redux'
import AuthenticationParametersSelectors from '../AuthenticationParametersSelectors'
import AuthenticationClient from '../AuthenticationClient'

const getReactCompoName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component'

/**
 * Decorates a React component with Regards Auth info.
 * Provides projectName & current user token if available
 *
 * @type {function}
 * @param {React.Component} DecoratedComponent The component to enhance
 * @return {React.Component}
 * @author Léo Mieulet
 */
const withAuthInfo = (DecoratedComponent) => {
  class WithAuthInfo extends React.Component {
    static propTypes = {
      // Set by mapStateToProps
      // eslint-disable-next-line react/no-unused-prop-types
      accessToken: PropTypes.string,
      // eslint-disable-next-line react/no-unused-prop-types
      projectName: PropTypes.string.isRequired,
    }

    render() {
      // Remove from otherProps all props that doesn't need to be reinjected in children
      const childProps = omit(this.props, ['theme', 'i18n', 'dispatch'])
      return React.createElement(DecoratedComponent, childProps)
    }
  }
  // Ease debugging in the React Developer Tools by choosing a display name that communicates that it's the result of an HOC
  WithAuthInfo.displayName = `withAuthInfo(${getReactCompoName(DecoratedComponent)})`

  const mapStateToProps = state => ({
    // user auth info
    accessToken: AuthenticationClient.authenticationSelectors.getAccessToken(state),
    projectName: AuthenticationParametersSelectors.getProject(state),
  })

  return connect(mapStateToProps)(WithAuthInfo)
}

export default withAuthInfo
