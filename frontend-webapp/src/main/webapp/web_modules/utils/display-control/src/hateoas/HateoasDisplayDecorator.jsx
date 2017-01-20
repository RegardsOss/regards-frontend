/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from 'react-redux'
import { EndpointSelectors } from '@regardsoss/endpoint'
import { ResourceList } from '@regardsoss/model'
import allMatchHateoasDisplayLogic from './allMatchHateoasDisplayLogic'
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
    hateoasDisplayLogic: React.PropTypes.func.isRequired,
    requiredEndpoints: React.PropTypes.arrayOf(React.PropTypes.string),
    availableEndpoints: React.PropTypes.arrayOf(React.PropTypes.string),
    // requiredEndpoints: ResourceList,
    // availableEndpoints: ResourceList,
  }

  static defaultProps = {
    hateoasDisplayLogic: allMatchHateoasDisplayLogic,
  }

  render() {
    const { children, hateoasDisplayLogic, requiredEndpoints, availableEndpoints } = this.props
    return (
      <DisplayDecorator displayLogic={() => hateoasDisplayLogic(requiredEndpoints, availableEndpoints)}>
        {children}
      </DisplayDecorator>
    )
  }
}

const mapStateToProps = state => ({
  availableEndpoints: EndpointSelectors.getArray(state),
  // availableEndpoints: EndpointSelectors.getList(state),
})

export default connect(mapStateToProps)(HateoasDisplayDecorator)
