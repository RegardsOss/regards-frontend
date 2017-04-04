/**
 * LICENSE_PLACEHOLDER
 **/
import InstanceRouterProvider from './InstanceRouterProvider'
import ModulesListContainer from './ModulesListContainer'

/**
 * React container to display the modules configuration list.
 * @author Sébastien Binda
 */
export class ModulesListContainerRouter extends React.Component {

  static propTypes = {
    // From react router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      applicationId: React.PropTypes.string,
    }),
  }

  render() {
    return (
      <InstanceRouterProvider
        params={this.props.params}
        element={ModulesListContainer}
      />
    )
  }
}

export default ModulesListContainerRouter
