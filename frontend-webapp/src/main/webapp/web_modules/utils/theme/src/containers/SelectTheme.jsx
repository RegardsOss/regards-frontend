/**
 * LICENSE_PLACEHOLDER
 **/
import IconButton from 'material-ui/IconButton'
import Palette from 'material-ui/svg-icons/image/palette'
import IconMenu from 'material-ui/IconMenu'
import { connect } from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import { map, keys } from 'lodash'
import { I18nProvider } from '@regardsoss/i18n'
import ThemeHelper from '../ThemeHelper'
import getCurrentTheme from '../model/selectors/getCurrentTheme'
import setCurrentTheme from '../model/actions/setCurrentTheme'
import ThemeSelectors from '../model/selectors/ThemeSelectors'

/**
 * Selector allowing the user to change the app's theme.
 *
 * @author Xavier-Alexandre Brochard
 */
export class SelectTheme extends React.Component {

  static propTypes = {
    theme: React.PropTypes.string,
    setTheme: React.PropTypes.func,
  }

  /**
   * @type {{muiTheme: *}}
   */
  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (event, value) => {
    this.props.setTheme(value)
  }

  render() {
    const themes = ThemeHelper.getThemes()
    const themeNames = keys(themes)
    const items = map(themeNames, themeName => (
      <MenuItem value={themeName} key={themeName} primaryText={themeName} />
    ))

    return (
      <I18nProvider messageDir="utils/theme/src/i18n">
        <IconMenu
          iconButtonElement={<IconButton><Palette /></IconButton>}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
          value={this.props.theme}
          onChange={this.handleChange}
          iconStyle={this.context.muiTheme.menu.localeDropdown}
        >
          {items}
        </IconMenu>
      </I18nProvider>
    )
  }
}

const mapStateToProps = state => ({
  theme: getCurrentTheme(state),
  themeList: ThemeSelectors.getList(state),
})
const mapDispatchToProps = dispatch => ({
  setTheme: themeId => dispatch(setCurrentTheme(themeId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectTheme)
