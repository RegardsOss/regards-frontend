/**
 * LICENSE_PLACEHOLDER
 **/
import { FormattedMessage, intlShape } from 'react-intl'
import FlatButton from 'material-ui/FlatButton'
import { connect } from '@regardsoss/redux'
import { themeContextType } from '@regardsoss/theme'
import { LoadableContentDialogComponent } from '@regardsoss/components'
import { URL } from '@regardsoss/model'
import { AuthenticateActions } from '@regardsoss/authentication-manager'
import ProjectLicenseActions from '../model/ProjectLicenseActions'
import ProjectLicenseSelectors from '../model/ProjectLicenseSelectors'


/**
 * License display container, shows license validation dialog after user authenticated (injected by parent)
 */
class LicenseDisplayContainer extends React.Component {

  static propTypes = {
    project: React.PropTypes.string.isRequired,
    // from mapStateToProps
    licenseLink: URL,
    accepted: React.PropTypes.bool,
    // from mapDispatchToProps
    fetchLicenseInformation: React.PropTypes.func.isRequired,
    flushLicenseInformation: React.PropTypes.func.isRequired,
    sendAcceptLicense: React.PropTypes.func.isRequired,
    logout: React.PropTypes.func.isRequired,
  }


  static contextTypes = {
    ...themeContextType,
    intl: intlShape,
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
        <LoadableContentDialogComponent
          contentURL={licenseLink}
          loadingMessage={<FormattedMessage id="license.loading.message" />}
          dialogHeightPercent={heightPercent}
          dialogWidthPercent={widthPercent}
          bodyStyle={bodyStyle}
          open
          actions={[
            <FlatButton
              label={<FormattedMessage id="license.refuse" />}
              onTouchTap={this.onRefuse}
            />,
            <FlatButton
              label={<FormattedMessage id="license.accept" />}
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
  logout: () => { dispatch(AuthenticateActions.flush()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(LicenseDisplayContainer)

