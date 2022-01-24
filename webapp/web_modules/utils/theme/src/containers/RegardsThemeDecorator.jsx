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
import themeContextType from '../contextType'

/**
 * Provides the muiTheme, mainTheme and the alternativeTheme to children using React context
 */
class RegardsThemeDecorator extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    // eslint-disable-next-line react/forbid-prop-types
    mainTheme: PropTypes.object.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    alternativeTheme: PropTypes.object.isRequired,
  }

  /**
   * Add computed theme into children context
   * @type {{moduleTheme: *}}
   */
  static childContextTypes = {
    ...themeContextType,
  }

  /**
   * Return child contexts
   * @returns {{moduleTheme: *}}
   */
  getChildContext() {
    const { mainTheme, alternativeTheme } = this.props
    return {
      muiTheme: mainTheme,
      mainTheme,
      alternativeTheme,
    }
  }

  /**
   * Render provider
   */
  render() {
    return this.props.children
  }
}

export default RegardsThemeDecorator
