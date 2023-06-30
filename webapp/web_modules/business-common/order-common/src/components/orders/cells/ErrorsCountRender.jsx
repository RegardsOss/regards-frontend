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
* Cell to show errors count in table (formats any error count greater than 0 as a warning)
* @author Raphaël Mechali
*/
class ErrorsCountRender extends React.Component {
  static propTypes = {
    // the error count
    value: PropTypes.number,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { value } = this.props
    const { moduleTheme: { inErrorCell, validCell } } = this.context
    const errorCount = value || 0
    return (
      <div style={errorCount ? inErrorCell : validCell}>
        {errorCount}
      </div>
    )
  }
}
export default ErrorsCountRender
