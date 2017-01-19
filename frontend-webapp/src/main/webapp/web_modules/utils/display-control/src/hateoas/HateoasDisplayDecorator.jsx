/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from 'react-redux'
import { EndpointSelectors } from '@regardsoss/endpoint'
import hateoasDisplayLogic from './hateoasDisplayLogic'
import DisplayDecorator from './../DisplayDecorator'

/**
 * Component controlling the display of its children with Hateoas display logic
 *
 * @author Léo Mieulet
 * @author Xavier-Alexandre Brochard
 */
export class HateoasDisplayDecorator extends React.Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired,
    requiredEndpoints: React.PropTypes.arrayOf(React.PropTypes.string),
    availableEndpoints: React.PropTypes.arrayOf(React.PropTypes.string),
  }

  render() {
    const { children, requiredEndpoints, availableEndpoints } = this.props
    return (
      <DisplayDecorator displayLogic={() => hateoasDisplayLogic(requiredEndpoints, availableEndpoints)}>
        {children}
      </DisplayDecorator>
    )
  }
}
const mapStateToProps = state => ({
  availableEndpoints: EndpointSelectors.getList(state),
})

export default connect(mapStateToProps)(HateoasDisplayDecorator)
