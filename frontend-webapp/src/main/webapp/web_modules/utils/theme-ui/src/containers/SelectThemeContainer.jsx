/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 */
import compose from 'lodash/fp/compose'
import map from 'lodash/map'
import IconButton from 'material-ui/IconButton'
import Palette from 'material-ui/svg-icons/image/palette'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
// cannot import our connect method here, cyclic dependencies
import { connect } from 'react-redux'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { withModuleStyle, themeContextType, getCurrentTheme, setCurrentTheme, ThemeSelectors, defaultTheme } from '@regardsoss/theme'
import messages from '../i18n'
import styles from '../styles'

/**
 * Selector allowing the user to change the app's theme.
 *
 * @author Xavier-Alexandre Brochard
 */
export class SelectThemeContainer extends React.Component {
  static propTypes = {
    currentTheme: AccessShapes.Theme,
    themeList: AccessShapes.ThemeList,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    currentTheme: defaultTheme,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static iconButtonElement = (<IconButton><Palette /></IconButton>)

  static anchorOriginStyle = { horizontal: 'left', vertical: 'bottom' }

  static targetOriginStyle = { horizontal: 'middle', vertical: 'bottom' }

  render() {
    const { currentTheme, themeList, onChange } = this.props
    const { intl: { formatMessage } } = this.context
    const items = map(themeList, item => (
      <MenuItem value={item.content.id} key={item.content.id} primaryText={item.content.name} />
    ))

    return (
      <div title={formatMessage({ id: 'select.theme.tooltip' })}>
        <IconMenu
          iconButtonElement={SelectThemeContainer.iconButtonElement}
          anchorOrigin={SelectThemeContainer.anchorOriginStyle}
          targetOrigin={SelectThemeContainer.targetOriginStyle}
          value={currentTheme.content.id}
          onChange={(event, value) => onChange(value)}
        >
          {items}
        </IconMenu>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentTheme: getCurrentTheme(state),
  themeList: ThemeSelectors.getList(state),
})
const mapDispatchToProps = dispatch => ({
  onChange: themeId => dispatch(setCurrentTheme(themeId)),
})


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withI18n(messages), withModuleStyle(styles),
)(SelectThemeContainer)
