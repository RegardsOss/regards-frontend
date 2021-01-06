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
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { IFrameURLContentDisplayer } from '@regardsoss/components'
import { AuthenticateShape, AuthenticationClient } from '@regardsoss/authentication-utils'
import { connect } from '@regardsoss/redux'

/**
 * Main component of module menu
 * @author Léo Mieulet
 **/
export class ModuleContainer extends React.Component {
  static propTypes = {
    project: PropTypes.string,
    authentication: AuthenticateShape,
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static RENDER_STYLES = {
    width: '100%',
    height: '100vh',
  }

  static mapStateToProps = (state) => ({
    authentication: AuthenticationClient.authenticationSelectors.getAuthenticationResult(state),
  })

  getMizarContextURL = () => {
    const { authentication, project, id } = this.props
    const baseURL = '/MizarWidget/index.html?ctxurl='
    const accessURL = `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ACCESS_PROJECT}/applications/user/modules/${id}/map`
    if (authentication) {
      return `${baseURL}${encodeURIComponent(`${accessURL}?token=${authentication.access_token}`)}`
    }
    return `${baseURL}${encodeURIComponent(`${accessURL}?scope=${project}`)}`
  }

  render() {
    return (
      <IFrameURLContentDisplayer
        source={this.getMizarContextURL()}
        style={ModuleContainer.RENDER_STYLES}
      />
    )
  }
}

export default connect(ModuleContainer.mapStateToProps)(ModuleContainer)
