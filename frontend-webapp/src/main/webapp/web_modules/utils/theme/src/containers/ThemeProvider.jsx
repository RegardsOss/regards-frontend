/**
 * LICENSE_PLACEHOLDER
 **/
import { isEqual, find, merge } from 'lodash'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux'
import { Theme, defaultTheme } from '@regardsoss/model'
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'
import ThemeActions from '../model/actions/ThemeActions'
import ThemeInstanceActions from '../model/actions/ThemeInstanceActions'
import ThemeSelectors from '../model/selectors/ThemeSelectors'
import getCurrentTheme from '../model/selectors/getCurrentTheme'
import setCurrentTheme from '../model/actions/setCurrentTheme'
import defaultCustomConfiguration from '../custom/defaultCustomConfiguration'
import '../custom/reset.css'
import '../custom/main.css'
import '../custom/bootstrap_grid_100.css'
import '../custom/background.jpg'

/**
 * React HOC customizing the default MMaterial-Ui's theme before injecting it in the context of all children tree.
 *
 * @author Xavier-Alexandre Brochard
 */
export class ThemeProvider extends React.Component {

  static propTypes = {
    currentTheme: Theme,
    isInstance: React.PropTypes.bool,
    fetchThemeList: React.PropTypes.func,
    fetchThemeInstanceList: React.PropTypes.func,
    dispatchSetCurrentTheme: React.PropTypes.func,
    children: React.PropTypes.node,
  }

  static defaultProps = {
    currentTheme: defaultTheme,
  }

  /**
   * Get MuiTheme with default application custom properties
   * @param conf
   * @returns {*}
   */
  static getCustomMuiTheme(conf) {
    return merge({}, defaultCustomConfiguration, getMuiTheme(conf))
  }

  constructor(props) {
    super(props)
    this.state = {
      mergedTheme: ThemeProvider.getCustomMuiTheme(props.currentTheme.configuration),
    }
  }

  componentDidMount() {
    const { dispatchSetCurrentTheme } = this.props
    let fetchAction = this.props.fetchThemeList
    if (this.props.isInstance) {
      fetchAction = this.props.fetchThemeInstanceList
    }

    fetchAction().then((actionResult) => {
      // Init the current theme from the new list
      let activeTheme = defaultTheme
      if (actionResult && actionResult.payload && actionResult.payload.entities && actionResult.payload.entities.theme) {
        activeTheme = find(actionResult.payload.entities.theme, theme => theme.content.active) || defaultTheme
      }
      this.setState({
        mergedTheme: ThemeProvider.getCustomMuiTheme(activeTheme.content.configuration),
      })
      dispatchSetCurrentTheme(activeTheme.content.id)
    })
  }

  componentWillReceiveProps(nextProps) {
    const { currentTheme } = this.props

    // Recompute the merged theme when the current theme has changed
    if (!isEqual(nextProps.currentTheme, currentTheme)) {
      this.setState({
        mergedTheme: ThemeProvider.getCustomMuiTheme(nextProps.currentTheme.content.configuration || defaultTheme),
      })
    }
  }

  render() {
    const { mergedTheme } = this.state
    return (
      <MuiThemeProvider muiTheme={mergedTheme}>
        {this.props.children}
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => ({
  themeList: ThemeSelectors.getList(state),
  currentTheme: getCurrentTheme(state),
  project: AuthenticationParametersSelectors.getProject(state),
  isInstance: AuthenticationParametersSelectors.isInstance(state),
})
const mapDispatchToProps = dispatch => ({
  fetchThemeList: () => dispatch(ThemeActions.fetchPagedEntityList(0, 100)),
  fetchThemeInstanceList: () => dispatch(ThemeInstanceActions.fetchPagedEntityList(0, 100)),
  dispatchSetCurrentTheme: themeId => dispatch(setCurrentTheme(themeId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ThemeProvider)
