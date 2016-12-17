/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from 'react-redux'
import hateoasDisplayLogic from './hateoasDisplayLogic'
import EndpointSelectors from '../model/EndpointSelectors'
import DisplayDecorator from './../DisplayDecorator'

/**
 * Shortcut decorator component with Hateoas display control logic
 */
export class HateoasDisplayDecorator extends React.Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired,
    // Todo : endpoints: React.PropTypes.arrayOf(React.PropTypes.string),
  }

  render() {
    const { children } = this.props
    return (
      <DisplayDecorator displayLogic={hateoasDisplayLogic}>
        {children}
      </DisplayDecorator>
    )
  }
}

const mapStateToProps = state => ({
  endpoints: EndpointSelectors.getEndpointsItems(state),
})

export default connect(mapStateToProps)(HateoasDisplayDecorator)
