/**
 * LICENSE_PLACEHOLDER
 **/
import Container from './Container'
/**
 * Layout shape entity
 * @author Sébastien Binda
 */
const Layout = React.PropTypes.shape({
  id: React.PropTypes.number.isRequired,
  applicationId: React.PropTypes.string.isRequired,
  layout: Container.isRequired,
})

export default Layout
