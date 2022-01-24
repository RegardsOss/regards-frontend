/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import FlatButton from 'material-ui/FlatButton'
import TreeIcon from 'mdi-material-ui/FileTree'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Option to toggle tree visible / hidden
 * @author Raphaël Mechali
 */
class ToggleTreeVisibleOptionComponent extends React.Component {
  static propTypes = {
    browsingTreeVisible: PropTypes.bool.isRequired,
    onToggleVisible: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { browsingTreeVisible, onToggleVisible } = this.props
    const { intl: { formatMessage }, moduleTheme: { user: { header: { flatIconButtonStyle } } } } = this.context
    return (
      <FlatButton
        onClick={onToggleVisible}
        icon={<TreeIcon />}
        secondary={browsingTreeVisible}
        style={flatIconButtonStyle}
        title={formatMessage({ id: 'module.description.header.toggle.tree.visible.tooltip' })}
      />
    )
  }
}
export default ToggleTreeVisibleOptionComponent
