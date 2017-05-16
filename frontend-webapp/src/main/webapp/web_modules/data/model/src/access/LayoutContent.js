/**
 * LICENSE_PLACEHOLDER
 **/
import Container from './Container'
/**
 * Layout shape entity
 * @author Sébastien Binda
 */
const Layout = PropTypes.shape({
  id: PropTypes.number.isRequired,
  applicationId: PropTypes.string.isRequired,
  layout: Container.isRequired,
})

export default Layout
