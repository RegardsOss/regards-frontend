/**
 * LICENSE_PLACEHOLDER
 **/
import { themeContextType } from '@regardsoss/theme'
import Dialog from 'material-ui/Dialog'
import { FormattedMessage, intlShape } from 'react-intl'
import FlatButton from 'material-ui/FlatButton'

/**
 * Home page of a project
 * @author Maxime Bouveron
 */
class HomePageContainer extends React.Component {

  static propTypes = {
    project: React.PropTypes.string,
    htmlPath: React.PropTypes.string,
  }

  static contextTypes= {
    ...themeContextType,
    intl: intlShape,
  }

  state = {
    open: true,
    frameHeight: '750px',
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleHide = () => {
    this.handleClose()
    localStorage.setItem(`${this.props.project}HomePageHidden`, true)
  }

  handleFrameLoad = () => {
    this.setState({
      frameHeight: this.frameRef.contentWindow.document.body.scrollHeight + 37,
    })
  }

  render() {
    const { moduleTheme, intl } = this.context
    const actions = [
      <FlatButton
        label={<FormattedMessage id="homepage.hide" />}
        onTouchTap={this.handleHide}
      />,
      <FlatButton
        label={<FormattedMessage id="homepage.ok" />}
        primary
        onTouchTap={this.handleClose}
      />,
    ]

    return (
      <Dialog
        open={this.state.open && !JSON.parse(localStorage.getItem(`${this.props.project}HomePageHidden`))}
        actions={actions}
        contentStyle={moduleTheme.dialog}
        bodyStyle={moduleTheme.dialogBody}
        autoScrollBodyContent
      >
        <iframe
          ref={(ref) => { this.frameRef = ref }}
          style={moduleTheme.frame}
          height={this.state.frameHeight}
          src={this.props.htmlPath}
          onLoad={this.handleFrameLoad}
        />
      </Dialog>
    )
  }
}
export default HomePageContainer

