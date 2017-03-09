/**
 * LICENSE_PLACEHOLDER
 **/
import { FormattedMessage, intlShape } from 'react-intl'
import FlatButton from 'material-ui/FlatButton'
import { themeContextType } from '@regardsoss/theme'
import { LoadableContentDialogComponent } from '@regardsoss/components'

/**
 * Home page module container (shows home page for a project)
 * @author Maxime Bouveron
 */
class HomePageContainer extends React.Component {

  static propTypes = {
    project: React.PropTypes.string.isRequired,
    htmlPath: React.PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    intl: intlShape,
  }


  componentWillMount = () => {
    this.setState({
      open: true,
    })
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
export default HomePageContainer

