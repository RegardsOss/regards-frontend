/**
* LICENSE_PLACEHOLDER
**/
import { AccessShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { AuthenticationClient } from '@regardsoss/authentication-manager'
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
    const { project, isAuthenticated } = this.props
    return (
      <ShowableAtRender show={isAuthenticated}>
        <LicenseDisplayContainer project={project} />
      </ShowableAtRender>
    )
  }
}
const mapStateToProps = state => ({
  isAuthenticated: AuthenticationClient.authenticationSelectors.isAuthenticated(state),
})

export default connect(mapStateToProps)(LicenseModuleContainer)
