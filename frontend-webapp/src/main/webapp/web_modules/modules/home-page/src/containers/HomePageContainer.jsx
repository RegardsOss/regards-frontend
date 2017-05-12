/**
 * LICENSE_PLACEHOLDER
 **/
import root from 'window-or-global'
import { FormattedMessage } from 'react-intl'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import HomeIcone from 'material-ui/svg-icons/action/home'
import { themeContextType } from '@regardsoss/theme'
import { SingleContentURLDialogContainer } from '@regardsoss/components'

/**
 * Home page module container (shows home page for a project)
 * @author Maxime Bouveron
 */
class HomePageContainer extends React.Component {

  static propTypes = {
    project: PropTypes.string.isRequired,
    moduleConf: PropTypes.shape({
      htmlPath: PropTypes.string.isRequired,
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

  onCacheHomePageDisplayed = () => {
    root.localStorage.setItem(`${this.props.project}HomePageHidden`, false)
    this.onClose()
  }

  isHomePageHiddenCached = () => !!JSON.parse(root.localStorage.getItem(`${this.props.project}HomePageHidden`))

  forceOpen = () => {
    this.setState({ dialogOpen: true })
  }


  render() {
    const { moduleConf: { htmlPath } } = this.props
    const { dialogOpen } = this.state
    const { dialog: { bodyStyle, heightPercent, widthPercent } } = this.context.moduleTheme
    const actionButton = this.isHomePageHiddenCached() ? (<FlatButton
      label={<FormattedMessage id="homepage.display" />}
      onTouchTap={this.onCacheHomePageDisplayed}
    />) :
    (<FlatButton
      label={<FormattedMessage id="homepage.hide" />}
      onTouchTap={this.onCacheHomePageHidden}
    />)
    return (
      <div>
        <FloatingActionButton
          style={{
            position: 'fixed',
            bottom: 10,
            right: 15,
            zIndex: 5000,
          }}
          mini
          onTouchTap={this.forceOpen}
          title="Home"
        >
          <HomeIcone />
        </FloatingActionButton>
        <SingleContentURLDialogContainer
          open={dialogOpen}
          contentURL={htmlPath}
          loadingMessage={<FormattedMessage id="homepage.loading.message" />}
          dialogHeightPercent={heightPercent}
          dialogWidthPercent={widthPercent}
          onRequestClose={this.onClose}
          bodyStyle={bodyStyle}
          actions={[
            actionButton,
            <FlatButton
              label={<FormattedMessage id="homepage.ok" />}
              primary
              onTouchTap={this.onClose}
            />,
          ]}
        />
      </div>
    )
  }
}
export default HomePageContainer

