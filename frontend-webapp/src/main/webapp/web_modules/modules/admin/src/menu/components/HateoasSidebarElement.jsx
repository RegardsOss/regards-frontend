import { HateoasDisplayDecorator } from '@regardsoss/display-control'
import SidebarElement from './SidebarElement'

/**
 * Decorate a SidebarElementit with the Hateoas display control logic
 */
export class HateoasSidebarElement extends React.Component {
  static propTypes = {
    requiredEndpoints: React.PropTypes.arrayOf(React.PropTypes.string),
  }
  render() {
    return (
      <HateoasDisplayDecorator
        requiredEndpoints={this.props.requiredEndpoints}
      >
        <SidebarElement {...this.props} />
      </HateoasDisplayDecorator>
    )
  }
}

export default HateoasSidebarElement
