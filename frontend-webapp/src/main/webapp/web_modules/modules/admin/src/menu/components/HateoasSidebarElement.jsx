import { HateoasDisplayDecorator } from '@regardsoss/display-control'
import SidebarElement from './SidebarElement'

/**
 * Decorate a SidebarElementit with the Hateoas display control logic
 */
export class HateoasSidebarElement extends React.Component {
  render() {
    return (
      <HateoasDisplayDecorator>
        <SidebarElement {...this.props} />
      </HateoasDisplayDecorator>
    )
  }
}

export default HateoasSidebarElement
