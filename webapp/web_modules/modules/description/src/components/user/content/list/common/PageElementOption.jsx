/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { themeContextType } from '@regardsoss/theme'

/**
 * Shows a list element option as an IconButton
 * @author Raphaël Mechali
 */
class PageElementOption extends React.Component {
  static propTypes = {
    IconConstructor: PropTypes.func.isRequired,
    tooltip: PropTypes.string,
    onClick: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { IconConstructor, tooltip, onClick } = this.props
    const { moduleTheme: { user: { main: { content: { listPage } } } } } = this.context
    return (
      <IconButton
        title={tooltip}
        onClick={onClick}
        style={listPage.rigthIconButton}
      >
        <IconConstructor />
      </IconButton>
    )
  }
}
export default PageElementOption
