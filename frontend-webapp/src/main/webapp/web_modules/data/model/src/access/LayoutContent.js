/**
 * LICENSE_PLACEHOLDER
 **/
import Container from './Container'
/**
 * Layout shape entity
 * @author Sébastien Binda
 */
const Layout = React.PropTypes.shape({
  id: React.PropTypes.string,
  layout: React.PropTypes.oneOfType([React.PropTypes.string, Container]),
})

export default Layout
