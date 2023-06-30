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
import { AccessShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { AuthenticationClient } from '@regardsoss/authentication-utils'
import { ShowableAtRender } from '@regardsoss/components'
import LicenseDisplayContainer from './LicenseDisplayContainer'

/**
* License module container: only mounts / unmounts the display container when license state changes (lets the sub container )
*/
class LicenseModuleContainer extends React.Component {
  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // from mapStateToProps
    isAuthenticated: PropTypes.bool.isRequired,
  }

  static defaultProps = {}

  render() {
    // we mount / unmount the sub container according with authenticated state
    const { isAuthenticated } = this.props
    return (
      <ShowableAtRender show={isAuthenticated}>
        <LicenseDisplayContainer />
      </ShowableAtRender>
    )
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: AuthenticationClient.authenticationSelectors.isAuthenticated(state),
})

export default connect(mapStateToProps)(LicenseModuleContainer)
