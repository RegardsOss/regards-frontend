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
 * Provide specific module theme styles into the context of children component.
 * Each module surrounded by the ModuleThemeProvider must expose a public Styles
 * function as : export Styles = (theme) => {}
 * @author Sébastien Binda
 */
class ModuleThemeProvider extends React.Component {

  /**
   * Retrieve mui theme from context provide by upper MuiThemeProvider
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
    module: PropTypes.shape({
      styles: PropTypes.func,
    }).isRequired,
  }

  /**
   * Add computed moduleTheme into children context
   * @type {{moduleTheme: *}}
   */
  static childContextTypes = {
    moduleTheme: PropTypes.object.isRequired,
  };

  /**
   * Return child context override with computed moduleTheme
   * @returns {{moduleTheme: *}}
   */
  getChildContext() {
    return {
      moduleTheme: this.props.module.styles(this.context.muiTheme),
    }
  }

  /**
   * Render provider
   */
  render() {
    return this.props.children
  }
}

export default ModuleThemeProvider
