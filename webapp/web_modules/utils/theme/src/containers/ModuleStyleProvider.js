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
import isFunction from 'lodash/isFunction'
import themeContextType from '../contextType'

/**
 * Provide specific module theme styles into the context of children component.
 * Each module surrounded by the ModuleStyleProvider must expose a public Styles
 * function as : export Styles = (theme) => {}
 * @author Sébastien Binda
 */
class ModuleStyleProvider extends React.Component {
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
    stackCallingContext: PropTypes.bool,
  }

  static defaultProps = {
    stackCallingContext: false,
  }

  /**
   * Add computed moduleTheme into children context
   * @type {{moduleTheme: *}}
   */
  static childContextTypes = {
    moduleTheme: themeContextType.moduleTheme,
  }

  /**
   * Return child context override with computed moduleTheme
   * @returns {{moduleTheme: *}}
   */
  getChildContext() {
    const { module: { styles: localStylesBuilder }, stackCallingContext } = this.props
    const {
      muiTheme, moduleTheme: callingModuleTheme,
    } = this.context
    if (!localStylesBuilder || !isFunction(localStylesBuilder)) {
      throw new Error(`module styles must be provided as a function in module property. Received "${JSON.stringify(this.props.module)}" module property instead`)
    }

    const moduleTheme = {
      ...localStylesBuilder(muiTheme),
      ...((stackCallingContext && callingModuleTheme) || {}),
    }
    return {
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

export default ModuleStyleProvider
