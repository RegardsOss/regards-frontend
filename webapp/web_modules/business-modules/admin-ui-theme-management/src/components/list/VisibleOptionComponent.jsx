/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 **/
import get from 'lodash/get'
import EyeIcon from 'mdi-material-ui/Eye'
import EyeOffIcon from 'mdi-material-ui/EyeOff'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { HateoasKeys } from '@regardsoss/display-control'
import { HateoasIconAction } from '@regardsoss/components'

/**
 * Set a theme visible/invisible for users
 * @author Théo Lasserre
 */
class VisibleOptionComponent extends React.Component {
  static propTypes = {
    theme: AccessShapes.Theme.isRequired,
    onUpdate: PropTypes.func.isRequired, // callback like: theme => ()
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  isThemeVisible = (theme) => get(theme, 'content.visible', true)

  isThemeActive = (theme) => get(theme, 'content.active', false)

  /**
   * User callback: on delete theme
   */
  onUpdate = () => {
    const { theme, onUpdate } = this.props
    const isVisible = this.isThemeVisible(theme)
    const newThemeValue = {
      ...theme.content,
      configuration: JSON.stringify(theme.content.configuration),
      visible: !isVisible,
    }
    onUpdate(newThemeValue)
  }

  render() {
    const { theme } = this.props
    const { intl: { formatMessage }, moduleTheme: { themeList } } = this.context
    const isVisible = this.isThemeVisible(theme)
    return (
      <HateoasIconAction
        entityLinks={theme.links}
        hateoasKey={HateoasKeys.UPDATE}
        onClick={this.onUpdate}
        disabled={this.isThemeActive(theme)}
        title={isVisible ? formatMessage({ id: 'theme.list.tooltip.visible' }) : formatMessage({ id: 'theme.list.tooltip.invisible' })}
      >
        {isVisible
          ? <EyeIcon hoverColor={themeList.hoverColor.delete} />
          : <EyeOffIcon hoverColor={themeList.hoverColor.delete} />}
      </HateoasIconAction>)
  }
}
export default VisibleOptionComponent
