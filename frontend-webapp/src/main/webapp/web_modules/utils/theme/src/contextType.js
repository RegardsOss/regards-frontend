/**
 * LICENSE_PLACEHOLDER
 **/
import { PropTypes } from 'react'

/**
 * Porps to manage global theme (muiTheme) and local module theme (moduleTheme)
 * muiTheme is provided by MuiThemeProvider.
 * moduleTheme is provider by ModuleThemeProvider
 * @type {{muiTheme: *, moduleTheme: *}}
 */
const contextTypes = {
  muiTheme: PropTypes.object.isRequired,
  moduleTheme: React.PropTypes.object,
}
export default contextTypes
