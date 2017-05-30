/**
 * LICENSE_PLACEHOLDER
 **/
import { i18nContextType } from '@regardsoss/i18n'
import FlatButton from 'material-ui/FlatButton'
import { connect } from '@regardsoss/redux'
import { themeContextType } from '@regardsoss/theme'
import { SingleContentURLDialogContainer } from '@regardsoss/components'
import { URL } from '@regardsoss/model'
import { AuthenticationClient } from '@regardsoss/authentication-manager'
import ProjectLicenseActions from '../model/ProjectLicenseActions'
import ProjectLicenseSelectors from '../model/ProjectLicenseSelectors'


/**
 * License display container, shows license validation dialog after user authenticated (injected by parent)
 */
export class LicenseDisplayContainer extends React.Component {

  static propTypes = {
    project: PropTypes.string.isRequired,
    // from mapStateToProps
    licenseLink: URL,
    accepted: PropTypes.bool,
    // from mapDispatchToProps
    fetchLicenseInformation: PropTypes.func.isRequired,
    flushLicenseInformation: PropTypes.func.isRequired,
    sendAcceptLicense: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  }


  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  componentDidMount = () => {
    // mounting: the user just authentified, fetch license state
    const { project, fetchLicenseInformation } = this.props
    fetchLicenseInformation(project)
  }

  componentWillUnmount = () => {
    // unmounting: user logged out, clear license state
    this.props.flushLicenseInformation()
  }

  onAccept = () => {
    const { project, sendAcceptLicense } = this.props
    sendAcceptLicense(project)
  }

  onRefuse = () => { this.props.logout() }

  render() {
    const { licenseLink, accepted } = this.props
    const { dialog: { bodyStyle, heightPercent, widthPercent } } = this.context.moduleTheme

    if (licenseLink && !accepted) {
      return (
        <SingleContentURLDialogContainer
          contentURL={licenseLink}
          loadingMessage={this.context.intl.formatMessage({ id: 'license.loading.message' })}
          dialogHeightPercent={heightPercent}
          dialogWidthPercent={widthPercent}
          bodyStyle={bodyStyle}
          open
          actions={[
            <FlatButton
              label={this.context.intl.formatMessage({ id: 'license.refuse' })}
              onTouchTap={this.onRefuse}
            />,
            <FlatButton
              label={this.context.intl.formatMessage({ id: 'license.accept' })}
              primary
              onTouchTap={this.onAccept}
            />,
          ]}
        />
      )
    }
    return null
  }
}
const mapStateToProps = state => ({
  licenseLink: ProjectLicenseSelectors.getResult(state) && ProjectLicenseSelectors.getResult(state).licenseLink,
  accepted: ProjectLicenseSelectors.getResult(state) ? ProjectLicenseSelectors.getResult(state).accepted : false,
})

const mapDispatchToProps = dispatch => ({
  fetchLicenseInformation: (project) => { dispatch(ProjectLicenseActions.fetchLicenseInformation(project)) },
  sendAcceptLicense: (project) => { dispatch(ProjectLicenseActions.sendAcceptLicense(project)) },
  flushLicenseInformation: () => { dispatch(ProjectLicenseActions.flush()) },
  logout: () => { dispatch(AuthenticationClient.authenticationActions.flush()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(LicenseDisplayContainer)

