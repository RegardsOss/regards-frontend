/**
* LICENSE_PLACEHOLDER
**/

import { CommonShapes } from '@regardsoss/shape'
import OneElementTarget from '../../../definitions/targets/OneElementTarget'
import ManyElementsTarget from '../../../definitions/targets/ManyElementsTarget'
import RunServiceDialogComponent from '../../../components/services/RunServiceDialogComponent'

/**
* Run business service container: This container lifecycle MUST BE correlated with the run service request,
* ie it must be mounted when a business service is requested and unmounted when done / cancelled
*/
class RunCatalogPluginServiceContainer extends React.Component {

  static Steps = {
    PARAMETERS_CONFIGURATION: 'PARAMETERS',
    WAITING_RESULT: 'WAITING_RESULT',
    SHOWING_RESULT: 'SHOWING_RESULT',
  }

  static propTypes = {
    // service to run
    serviceConf: CommonShapes.PluginConfiguration.isRequired,
    // service target (dataobject / dataset / selection) or null
    target: PropTypes.oneOfType([PropTypes.instanceOf(OneElementTarget), PropTypes.instanceOf(ManyElementsTarget)]),
    // on done / on quit service
    onQuit: PropTypes.func.isRequired,
  }

  componentWillMount = () => {
    // TODO
    // const { service } = this.props
    // const step = service.shouldConfigure() ?
    //   RunBusinessServiceContainer.Steps.PARAMETERS_CONFIGURATION : // first, the user must configure dynamic parameters
    //   RunBusinessServiceContainer.Steps.WAITING_RESULT // Direct run of the service
    // // TODO launch the service
    // this.setState({ step, dynamicConfiguration: [] })
  }
  /**
   * render current step
   */
  getView = () => null
  // TODO
  // const { service, onQuit } = this.props
  // const { step, dynamicConfiguration } = this.state
  // console.error('LEOOOOOOOOOVIEW', this)
  // switch (step) {
  //   case RunBusinessServiceContainer.Steps.PARAMETERS_CONFIGURATION:
  //     return (<ParametersFormContainer
  //       parameters={service.dynamicParameters}
  //       onDone={this.onConfigurationDone}
  //     />)
  //   // TODO
  //   case RunBusinessServiceContainer.Steps.WAITING_RESULT:
  //   case RunBusinessServiceContainer.Steps.SHOWING_RESULT:
  //   default:
  //     return (<div>Business is business</div>)
  // }

  /**
   * Called on configuration form submit, must
   * @param values values as furnished by redux form ( key = fieldName, value = selectedValue)
   */
  onConfigurationDone = (paramters) => {
    const configuration = [] // TODO save in state the new parameters from values
    // TODO launch the service
    this.setState({ step: RunCatalogPluginServiceContainer.Steps.WAITING_RESULT, dynamicConfiguration: [] })
  }

  onServiceResults = () => {
    // TODO also code me!!
    this.setState({ step: RunCatalogPluginServiceContainer.Steps.SHOWING_RESULT, results: {} })
  }

  render() {
    const { serviceConf, onQuit } = this.props
    // const { step, dynamicConfiguration } = this.state
    return (
      <RunServiceDialogComponent serviceName={serviceConf.label} onClose={onQuit}>
        {this.getView()}
      </RunServiceDialogComponent>
    )
  }
}
export default RunCatalogPluginServiceContainer
