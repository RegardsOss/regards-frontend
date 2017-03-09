/**
 * LICENSE_PLACEHOLDER
 **/
import { FormattedMessage, intlShape } from 'react-intl'
import FlatButton from 'material-ui/FlatButton'
import { connect } from '@regardsoss/redux'
import { themeContextType } from '@regardsoss/theme'
import { LoadableContentDialogComponent } from '@regardsoss/components'

/**
 * License module container, shows license validation dialog after user authenticated, if required
 */
class LicenseContainer extends React.Component {

  static propTypes = {
    project: React.PropTypes.string,
    htmlPath: React.PropTypes.string,
  }

  static contextTypes = {
    ...themeContextType,
    intl: intlShape,
  }

  onClose = () => {
    this.setState({ open: false })
  }

  onHide = () => {
    localStorage.setItem(`${this.props.project}HomePageHidden`, true)
    this.onClose()
  }

  isOpened = () => {
    const { open } = this.state
    return open && !JSON.parse(localStorage.getItem(`${this.props.project}HomePageHidden`))
  }

  render() {
    const { htmlPath } = this.props
    const { dialog: { bodyStyle, heightPercent, widthPercent } } = this.context.moduleTheme
    return (
      <LoadableContentDialogComponent
        contentURL={htmlPath}
        loadingMessage={<FormattedMessage id="homepage.loading.message" />}
        dialogHeightPercent={heightPercent}
        dialogWidthPercent={widthPercent}
        open={this.isOpened()}
        onRequestClose={this.onClose}
        bodyStyle={bodyStyle}
        actions={[
          <FlatButton
            label={<FormattedMessage id="homepage.hide" />}
            onTouchTap={this.onHide}
          />,
          <FlatButton
            label={<FormattedMessage id="homepage.ok" />}
            primary
            onTouchTap={this.onClose}
          />,
        ]}
      />
    )
  }
}
export default LicenseContainer

