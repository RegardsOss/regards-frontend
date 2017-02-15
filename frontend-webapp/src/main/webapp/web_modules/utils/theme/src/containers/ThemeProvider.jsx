/**
 * LICENSE_PLACEHOLDER
 **/
import { isEqual } from 'lodash'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux'
import { ThemeList } from '@regardsoss/model'
import ThemeActions from '../model/actions/ThemeActions'
import ThemeSelectors from '../model/selectors/ThemeSelectors'
import getCurrentTheme from '../model/selectors/getCurrentTheme'
import setCurrentTheme from '../model/actions/setCurrentTheme'

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
    currentTheme: { value: {} },
  }

  constructor(props) {
    super(props)
    this.state = {
      mergedTheme: getMuiTheme(props.currentTheme.value),
    }
  }

  componentDidMount() {
    this.props.fetchThemeList()
  }

  componentWillReceiveProps({ newThemeList }) {
    const { currentTheme, dispatchSetCurrentTheme } = this.props

    const newCurrentTheme = find(newThemeList, theme => theme.active)
    if (!isEqual(newCurrentTheme, currentTheme)) {
      this.setState({
        mergedTheme: getMuiTheme(newCurrentTheme.value),
      })
      // dispatchSetCurrentTheme(newCurrentTheme.id)
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
  fetchThemeList: () => dispatch(ThemeActions.fetchEntityList()),
  dispatchSetCurrentTheme: themeId => dispatch(setCurrentTheme(themeId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ThemeProvider)
