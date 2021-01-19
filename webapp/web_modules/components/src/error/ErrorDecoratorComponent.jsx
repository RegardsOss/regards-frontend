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
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import styles from './styles'

/**
 * React components to add the color on a text or another components
 */
class ErrorDecoratorComponent extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { moduleTheme: { errorDecorator } } = this.context
    return (
      <div className="selenium-errorMessage" style={errorDecorator}>
        { this.props.children }
      </div>
    )
  }
}

export default withModuleStyle(styles, true)(ErrorDecoratorComponent)
