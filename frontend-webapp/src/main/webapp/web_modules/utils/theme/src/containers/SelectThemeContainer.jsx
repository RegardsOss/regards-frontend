/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import IconButton from 'material-ui/IconButton'
import Palette from 'material-ui/svg-icons/image/palette'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
// cannot import our connect method here, cyclic dependencies
import { connect } from 'react-redux'
import { I18nProvider } from '@regardsoss/i18n'
import { Theme, ThemeList } from '@regardsoss/model'
import getCurrentTheme from '../model/selectors/getCurrentTheme'
import setCurrentTheme from '../model/actions/setCurrentTheme'
import { themeSelectors } from '../clients/ThemeClient'
import defaultTheme from '../model/defaultTheme'

/**
 * Selector allowing the user to change the app's theme.
 *
 * @author Xavier-Alexandre Brochard
 */
export class SelectThemeContainer extends React.Component {

  static propTypes = {
    currentTheme: Theme,
    themeList: ThemeList,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    currentTheme: defaultTheme,
  }

  static iconButtonElement = (<IconButton><Palette /></IconButton>)

  static anchorOriginStyle = { horizontal: 'left', vertical: 'bottom' }

  static targetOriginStyle = { horizontal: 'middle', vertical: 'bottom' }

  render() {
    const { currentTheme, themeList, onChange } = this.props
    const items = map(themeList, item => (
      <MenuItem value={item.content.id} key={item.content.id} primaryText={item.content.name} />
    ))

    return (
      <I18nProvider messageDir="utils/theme/src/i18n">
        <IconMenu
          iconButtonElement={SelectThemeContainer.iconButtonElement}
          anchorOrigin={SelectThemeContainer.anchorOriginStyle}
          targetOrigin={SelectThemeContainer.targetOriginStyle}
          value={currentTheme.content.id}
          onChange={(event, value) => onChange(value)}
        >
          {items}
        </IconMenu>
      </I18nProvider>
    )
  }
}

const mapStateToProps = state => ({
  currentTheme: getCurrentTheme(state),
  themeList: themeSelectors.getList(state),
})
const mapDispatchToProps = dispatch => ({
  onChange: themeId => dispatch(setCurrentTheme(themeId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectThemeContainer)
