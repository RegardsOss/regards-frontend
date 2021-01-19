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

 * Note: for APIs components, it is a good idea, when component needs an enriched styles context, to use the
 * stackCallingContext true property. Indeed, when provided, if there is a calling moduleTheme context, it will get merged with new
 * context but IT WILL KEEP HIGER PRIORITY. IE: the calling context can override the component context and thus redefine its
 * styles
 **/
import themeContextType from '../contextType'

/**
 */
class SwitchThemeDecorator extends React.Component {
  /**
   * Retrieve mui theme from context provide by upper RegardsThemeProvider
   * @type {{}}
  */
  static contextTypes = {
    ...themeContextType,
  }

  /**
   * @type {{children: *, module: *}}
   */
  static propTypes = {
    children: PropTypes.element,
    useMainTheme: PropTypes.bool,
  }

  static defaultProps = {
    useMainTheme: true,
  }

  /**
   *
   * @type {{moduleTheme: *}}
   */
  static childContextTypes = {
    ...themeContextType,
  }

  /**
   * Return child context override with computed moduleTheme
   * @returns {{moduleTheme: *}}
   */
  getChildContext() {
    const { useMainTheme } = this.props
    const { mainTheme, alternativeTheme, moduleTheme } = this.context
    return {
      muiTheme: useMainTheme ? mainTheme : alternativeTheme,
      mainTheme,
      alternativeTheme,
      moduleTheme,
    }
  }

  /**
   * Render provider
   */
  render() {
    return this.props.children
  }
}

export default SwitchThemeDecorator
