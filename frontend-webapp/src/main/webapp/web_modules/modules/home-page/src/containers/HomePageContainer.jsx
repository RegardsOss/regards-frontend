/**
 * LICENSE_PLACEHOLDER
 **/
import root from 'window-or-global'
import { FormattedMessage } from 'react-intl'
import FlatButton from 'material-ui/FlatButton'
import { themeContextType } from '@regardsoss/theme'
import { SingleContentURLDialogContainer } from '@regardsoss/components'

/**
 * Home page module container (shows home page for a project)
 * @author Maxime Bouveron
 */
class HomePageContainer extends React.Component {

  static propTypes = {
    project: React.PropTypes.string.isRequired,
    moduleConf: React.PropTypes.shape({
      htmlPath: React.PropTypes.string.isRequired,
    }).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }


  componentWillMount = () => {
    this.setState({
      dialogOpen: !this.isHomePageHiddenCached(),
    })
  }


  onClose = () => {
    this.setState({ dialogOpen: false })
  }

  onCacheHomePageHidden = () => {
    root.localStorage.setItem(`${this.props.project}HomePageHidden`, true)
    this.onClose()
  }

  isHomePageHiddenCached = () => !!JSON.parse(root.localStorage.getItem(`${this.props.project}HomePageHidden`))


  render() {
    const { moduleConf: { htmlPath } } = this.props
    const { dialogOpen } = this.state
    const { dialog: { bodyStyle, heightPercent, widthPercent } } = this.context.moduleTheme
    return (
      <SingleContentURLDialogContainer
        open={dialogOpen}
        contentURL={htmlPath}
        loadingMessage={<FormattedMessage id="homepage.loading.message" />}
        dialogHeightPercent={heightPercent}
        dialogWidthPercent={widthPercent}
        onRequestClose={this.onClose}
        bodyStyle={bodyStyle}
        actions={[
          <FlatButton
            label={<FormattedMessage id="homepage.hide" />}
            onTouchTap={this.onCacheHomePageHidden}
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

