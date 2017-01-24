/**
 * LICENSE_PLACEHOLDER
 **/
import Container from './Container'

const Layout = React.PropTypes.shape({
  id: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  classes: React.PropTypes.arrayOf(React.PropTypes.string),
  styles: React.PropTypes.object,
  containers: React.PropTypes.arrayOf(Container),
})

export default Layout
