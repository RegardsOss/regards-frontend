/**
 * LICENSE_PLACEHOLDER
 **/
import { FormattedMessage, intlShape } from 'react-intl'
import FlatButton from 'material-ui/FlatButton'
import { connect } from '@regardsoss/redux'
import { themeContextType } from '@regardsoss/theme'
import { LoadableContentDialogComponent } from '@regardsoss/components'
import { URL } from '@regardsoss/model'


/**
 * License display container, shows license validation dialog after user authenticated (injected by parent)
 */
class LicenseDisplayContainer extends React.Component {

  static propTypes = {
    // from mapStateToProps
    licenseLink: URL,
    accepted: React.PropTypes.bool.isRequired,
    // from mapDispatchToProps
    fetchLicenseState: React.PropTypes.func.isRequired,
    flushLicenseState: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    intl: intlShape,
  }


  componentWillMount = () => {
    // mounting: the user just authentified, fetch license state
    this.props.fetchLicenseState()
  }

  componentWillUnmount = () => {
    // unmounting: user logged out, clear license state
    this.props.flushLicenseState()
  }

  onAccept = () => { }

  onRefuse = () => { }

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
  licenseLink: 'www.google.com', // TODO
  accepted: false,
})

const mapDispatchToProps = dispatch => ({
  // rs- admin / project / licence /
  fetchLicenseState: () => { }, // TODO
  flushLicenseState: () => { },
})

export default connect(mapStateToProps, mapDispatchToProps)(LicenseDisplayContainer)

