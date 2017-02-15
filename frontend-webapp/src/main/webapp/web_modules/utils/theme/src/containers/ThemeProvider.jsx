/**
 * LICENSE_PLACEHOLDER
 **/
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from 'react-redux'
import ThemeActions from '../model/ThemeActions'
import getCurrentTheme from '../model/selectors/getCurrentTheme'

/**
 * React HOC customizing the default MMaterial-Ui's theme before injecting it in the context of all children tree.
 *
 * @author Xavier-Alexandre Brochard
 */
export class ThemeProvider extends React.Component {

  static propTypes = {
    // An object providing default theme properties to override
    currentTheme: React.PropTypes.object,
    // setTheme: React.PropTypes.func,
    fetchThemeList: React.PropTypes.func,
  }

  static defaultProps = {
    theme: {},
  }

  constructor(props) {
    super(props)
    this.state = {
      mergedTheme: getMuiTheme(props.currentTheme),
    }
  }

  componentDidMount() {
    this.props.fetchThemeList()
  }

  componentWillReceiveProps({ newCurrentTheme }) {
    this.setState({
      mergedTheme: getMuiTheme(newCurrentTheme),
    })
  }

  render() {
    const { currentTheme } = this.props
    return (
      <MuiThemeProvider muiTheme={currentTheme}>
        {this.props.children}
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => ({
  currentTheme: getCurrentTheme(state),
})
const mapDispatchToProps = dispatch => ({
  fetchThemeList: () => dispatch(ThemeActions.fetchEntityList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ThemeProvider)
