/**
 * LICENSE_PLACEHOLDER
 **/
import { isEqual, find } from 'lodash'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux'
import { ThemeList, defaultTheme } from '@regardsoss/model'
import ThemeActions from '../model/actions/ThemeActions'
import ThemeSelectors from '../model/selectors/ThemeSelectors'
import getCurrentTheme from '../model/selectors/getCurrentTheme'
import setCurrentTheme from '../model/actions/setCurrentTheme'
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
    // An object providing default theme properties to override
    themeList: ThemeList,
    currentTheme: React.PropTypes.object,
    fetchThemeList: React.PropTypes.func,
    dispatchSetCurrentTheme: React.PropTypes.func,
  }

  static defaultProps = {
    currentTheme: defaultTheme,
  }

  constructor(props) {
    super(props)
    this.state = {
      mergedTheme: getMuiTheme(props.currentTheme.configuration),
    }
  }

  componentDidMount() {
    this.props.fetchThemeList()
  }

  componentWillReceiveProps(nextProps) {
    const { currentTheme, themeList, dispatchSetCurrentTheme } = this.props

    // Init the current theme from the new list
    if (!isEqual(nextProps.themeList, themeList)) {
      const nextCurrentTheme = find(nextProps.themeList, theme => theme.content.active) || defaultTheme
      this.setState({
        mergedTheme: getMuiTheme(nextCurrentTheme.content.configuration),
      })
      dispatchSetCurrentTheme(nextCurrentTheme.content.id)
    }

    // Recompute the merged theme when the current theme has changed
    if (!isEqual(nextProps.currentTheme, currentTheme)) {
      this.setState({
        mergedTheme: getMuiTheme(nextProps.currentTheme.content.configuration || defaultTheme),
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
})
const mapDispatchToProps = dispatch => ({
  fetchThemeList: () => dispatch(ThemeActions.fetchPagedEntityList(0, 100)),
  dispatchSetCurrentTheme: themeId => dispatch(setCurrentTheme(themeId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ThemeProvider)
