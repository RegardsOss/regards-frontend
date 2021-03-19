/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import IconButton from 'material-ui/IconButton'
import SearchIcon from 'mdi-material-ui/Magnify'
import { themeContextType } from '@regardsoss/theme'

/**
 * Open File Cell Component
 * @author Rachid OULASRI
 */
class OpenFileCellComponent extends React.Component {
  static propTypes = {
    tooltip: PropTypes.string.isRequired,
    onOpenFileInNewTab: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { tooltip, onOpenFileInNewTab } = this.props
    const { moduleTheme: { user: { main: { tree: { cell: { iconButton } } } } } } = this.context
    return (
      <IconButton
        title={tooltip}
        onClick={onOpenFileInNewTab}
        style={iconButton.style}
        iconStyle={iconButton.iconStyle}
      >
        <SearchIcon />
      </IconButton>)
  }
}
export default OpenFileCellComponent
