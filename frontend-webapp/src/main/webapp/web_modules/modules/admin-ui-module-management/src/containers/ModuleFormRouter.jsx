/**
 * LICENSE_PLACEHOLDER
 **/
import InstanceRouterProvider from './InstanceRouterProvider'
import ModuleFormContainer from './ModuleFormContainer'

/**
 * React component to display a Module form.
 * @author Sébastien Binda
 */
export class ModuleFormRouter extends React.Component {

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
        element={ModuleFormContainer}
      />
    )
  }
}

export default ModuleFormRouter
