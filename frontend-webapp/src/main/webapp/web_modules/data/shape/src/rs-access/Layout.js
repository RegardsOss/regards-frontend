/**
 * LICENSE_PLACEHOLDER
 **/

import Container from './Container'

/**
 * Layout shape entity
 * @author Sébastien Binda
 */
const LayoutContent = PropTypes.shape({
  id: PropTypes.number.isRequired,
  applicationId: PropTypes.string.isRequired,
  layout: Container.isRequired,
})

/**
 * Layout shape entity
 * @author Sébastien Binda
 */
const Layout = PropTypes.shape({
  content: LayoutContent,
})

export default {
  LayoutContent,
  Layout,
}
