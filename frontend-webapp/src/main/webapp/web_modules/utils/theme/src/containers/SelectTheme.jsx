import IconButton from 'material-ui/IconButton'
import Palette from 'material-ui/svg-icons/image/palette'
import IconMenu from 'material-ui/IconMenu'
import { connect } from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import { map, keys } from 'lodash'
import { I18nProvider } from '@regardsoss/i18n'
import setTheme from '../actions/ThemeActions'
import ThemeHelper from '../ThemeHelper'

export class SelectTheme extends React.Component {

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
    console.log('SelectTheme', this.props.theme)

    return (
      <I18nProvider messageDir="utils/theme/src/i18n">
        <IconMenu
          iconButtonElement={<IconButton><Palette /></IconButton>}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
          value={this.props.theme}
          onChange={this.handleChange}
        >
          {items}
        </IconMenu>
      </I18nProvider>
    )
  }
}
SelectTheme.propTypes = {
  theme: React.PropTypes.string,
  setTheme: React.PropTypes.func,
}
const mapStateToProps = state => ({
  theme: state.common.theme,
})
const mapDispatchToProps = dispatch => ({
  setTheme: theme => dispatch(setTheme(theme)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectTheme)
