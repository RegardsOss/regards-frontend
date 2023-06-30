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
import { themeContextType } from '@regardsoss/theme'

/**
 * Field title
 * @author Raphaël Mechali
 */
class FieldTitle extends React.Component {
  static propTypes = {
    label: PropTypes.string,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { label } = this.props
    const { moduleTheme: { fieldsGroup: { titleStyle } } } = this.context
    if (label) {
      return (
        <div style={titleStyle}>{label}</div>
      )
    }
    return null
  }
}
export default FieldTitle
