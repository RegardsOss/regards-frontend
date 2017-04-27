/**
 * LICENSE_PLACEHOLDER
 **/
import { HateoasDisplayDecorator } from '@regardsoss/display-control'
import SidebarElement from './SidebarElement'

/**
 * Decorate a SidebarElementit with the Hateoas display control logic
 *
 * @author Sébastien Binda
 */
export class HateoasSidebarElement extends React.Component {
  static propTypes = {
    requiredEndpoints: React.PropTypes.arrayOf(React.PropTypes.string),
    hateoasDisplayLogic: React.PropTypes.func,
  }
  render() {
    return (
      <HateoasDisplayDecorator
        requiredEndpoints={this.props.requiredEndpoints}
        hateoasDisplayLogic={this.props.hateoasDisplayLogic}
      >
        <SidebarElement {...this.props} />
      </HateoasDisplayDecorator>
    )
  }
}

export default HateoasSidebarElement
