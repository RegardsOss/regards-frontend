/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { AuthenticateSelectors } from '@regardsoss/authentication-manager'
import { ShowableAtRender } from '@regardsoss/components'
import { LicenseDisplayContainer } from './LicenseDisplayContainer'

/**
* License module container: only mounts / unmounts the display container when license state changes (lets the sub container )
*/
class LicenseModuleContainer extends React.Component {

  static propTypes = {
    // from mapStateToProps
    isAuthenticated: React.PropTypes.bool.isRequired,
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
const mapStateToProps = state => ({
  isAuthenticated: AuthenticateSelectors.isAuthenticated(state),
})

export default connect(mapStateToProps)(LicenseModuleContainer)
