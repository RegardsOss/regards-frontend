/**
* LICENSE_PLACEHOLDER
**/

import { AccessShapes } from '@regardsoss/shape'
import OneElementTarget from '../../../definitions/targets/OneElementTarget'
import ManyElementsTarget from '../../../definitions/targets/ManyElementsTarget'
import RunServiceDialogComponent from '../../../components/services/RunServiceDialogComponent'

/**
* Run UI service container: This container lifecycle MUST BE correlated with the run service request,
* ie it must be mounted when an YU service is requested and unmounted when done / cancelled
*/
class RunUIPluginServiceContainer extends React.Component {

  static Steps = {
    PARAMETERS_CONFIGURATION: 'PARAMETERS',
    SERVICE_RUN: 'SERVICE_RUN',
  }

  static propTypes = {
    // service to run
    serviceConf: AccessShapes.UIPluginConf.isRequired,
    // service target (dataobject / dataset / selection) or null
    target: PropTypes.oneOfType([PropTypes.instanceOf(OneElementTarget), PropTypes.instanceOf(ManyElementsTarget)]),
    // on done / on quit service
    onQuit: PropTypes.func.isRequired,
  }


  componentWillMount = () => {
    // compute first step for workflow
    // TODO
    // const { serviceConf } = this.props
    // const step = service.shouldConfigure() ?
    //   RunUIServiceContainer.Steps.PARAMETERS_CONFIGURATION : // first, the user must configure dynamic parameters
    //   RunUIServiceContainer.Steps.SERVICE_RUN // Direct run of the service
    // this.setState({ step, dynamicConfiguration: [] })
  }

  /**
   * Called on configuration form submit, must
   * @param values values as furnished by redux form ( key = fieldName, value = selectedValue)
   */
  onConfigurationDone = (values) => {
    // TODO save in state the new parameters from values
    // const configuration = []
    this.setState({ step: RunUIPluginServiceContainer.Steps.SERVICE_RUN, dynamicConfiguration: [] })
  }

  render() {
    const { serviceConf, onQuit } = this.props
    // TODO
    // const { step, dynamicConfiguration } = this.state
    return (
      <RunServiceDialogComponent serviceName={serviceConf.label} onClose={onQuit}>
        <div>UI aint business</div>
      </RunServiceDialogComponent>
    )
  }
}
export default RunUIPluginServiceContainer
