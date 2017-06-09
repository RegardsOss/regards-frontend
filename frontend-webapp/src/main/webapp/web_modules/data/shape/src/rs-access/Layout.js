/**
 * LICENSE_PLACEHOLDER
 **/

import ContainerContent from './ContainerContent'

/**
 * Layout shape entity
 * @author Sébastien Binda
 */
const LayoutContent = PropTypes.shape({
  id: PropTypes.number.isRequired,
  applicationId: PropTypes.string.isRequired,
  layout: ContainerContent.isRequired,
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
