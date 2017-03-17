/**
* LICENSE_PLACEHOLDER
**/
import FacetsDisplayerComponent from '../components/FacetsDisplayerComponent'

/**
* Displays whole module content, but this react component can be unmounted when
* switching views, while module container should never be
*/
export class FacetsDisplayerContainer extends React.Component {

  static propTypes = {}

  static defaultProps = {}

  render() {
    const { } = this.props
    // TODO
    return (
      <FacetsDisplayerComponent />
    )
  }
}
export default FacetsDisplayerContainer
