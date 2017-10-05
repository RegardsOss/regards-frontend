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
 **/
import { themeContextType } from '@regardsoss/theme'

/**
* Common dynamic modules title (when not using a breadcrumb) - Impl, requires styles context - XXX V2 merge with ModuleTitle
* @author Raphaël Mechali
*/
class ModuleTitleImpl extends React.Component {

  static propTypes = {
    IconConstructor: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    tooltip: PropTypes.string,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { IconConstructor, text, tooltip } = this.props
    const { moduleTheme: { moduleTitle } } = this.context
    return (
      <div style={moduleTitle.style} title={tooltip}>
        <IconConstructor style={moduleTitle.iconStyle} />
        <div style={moduleTitle.labelStyle}>
          {text}
        </div >
      </div>
    )
  }
}
export default ModuleTitleImpl
