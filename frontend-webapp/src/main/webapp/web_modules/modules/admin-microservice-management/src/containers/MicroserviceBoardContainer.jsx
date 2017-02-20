/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from 'react-redux'
import { forEach } from 'lodash'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { applyHateoasDisplayLogic, someMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import MicroserviceBoardComponent from '../components/MicroserviceBoardComponent'
import requiredEndpoints from '../requiredEndpoints'
import {
  accessMaintenanceActions,
  adminMaintenanceActions,
  cloudMaintenanceActions,
  damMaintenanceActions,
  gatewayMaintenanceActions,
} from '../model/MaintenanceModeActions'
import {
  accessMaintenanceSelectors,
  adminMaintenanceSelectors,
  cloudMaintenanceSelectors,
  damMaintenanceSelectors,
  gatewayMaintenanceSelectors,
} from '../model/MaintenanceModeSelectors'
import {
  accessActivateMaintenanceActions,
  adminActivateMaintenanceActions,
  cloudActivateMaintenanceActions,
  damActivateMaintenanceActions,
  gatewayActivateMaintenanceActions,
} from '../model/ActivateMaintenanceActions'

import {
  accessDeactivateMaintenanceActions,
  adminDeactivateMaintenanceActions,
  cloudDeactivateMaintenanceActions,
  damDeactivateMaintenanceActions,
  gatewayDeactivateMaintenanceActions,
} from '../model/DeactivateMaintenanceActions'

/**
 * Module container connecting {@link MicroserviceBoardComponent} to redux in order to display the list of microservices.
 *
 * @author Xavier-Alexandre Brochard
 */
export class MicroserviceBoardContainer extends React.Component {

  static propTypes = {
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
    fetchMaintenance: React.PropTypes.objectOf(React.PropTypes.func),
    activateMaintenance: React.PropTypes.objectOf(React.PropTypes.func),
    deactivateMaintenance: React.PropTypes.objectOf(React.PropTypes.func),
    maintenanceList: React.PropTypes.objectOf(React.PropTypes.objectOf(React.PropTypes.bool)),
  }

  static contextTypes = {
    ...i18nContextType,
  }

  componentDidMount() {
    const fetchAll = () => {
      forEach(this.props.fetchMaintenance, microservice => microservice())
    }
    fetchAll()
    setInterval(fetchAll, 10000)
  }

  render() {
    return (
      <I18nProvider messageDir="modules/admin-microservice-management/src/i18n">
        <MicroserviceBoardComponent
          project={this.props.params.project}
          fetchMaintenance={this.props.fetchMaintenance}
          maintenanceList={this.props.maintenanceList}
          activateMaintenance={this.props.activateMaintenance}
          deactivateMaintenance={this.props.deactivateMaintenance}
        />
      </I18nProvider>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchMaintenance: {
    'rs-access': () => dispatch(accessMaintenanceActions.sendSignal('GET')),
    'rs-admin': () => dispatch(adminMaintenanceActions.sendSignal('GET')),
    'rs-cloud': () => dispatch(cloudMaintenanceActions.sendSignal('GET')),
    'rs-dam': () => dispatch(damMaintenanceActions.sendSignal('GET')),
    'rs-gateway': () => dispatch(gatewayMaintenanceActions.sendSignal('GET')),
  },
  activateMaintenance: {
    'rs-access': projectName =>
      dispatch(accessActivateMaintenanceActions(projectName).sendSignal('GET')),
    'rs-admin': projectName =>
      dispatch(adminActivateMaintenanceActions(projectName).sendSignal('GET')),
    'rs-cloud': projectName =>
      dispatch(cloudActivateMaintenanceActions(projectName).sendSignal('GET')),
    'rs-dam': projectName =>
      dispatch(damActivateMaintenanceActions(projectName).sendSignal('GET')),
    'rs-gateway': projectName =>
      dispatch(gatewayActivateMaintenanceActions(projectName).sendSignal('GET')),
  },
  deactivateMaintenance: {
    'rs-access': projectName =>
      dispatch(accessDeactivateMaintenanceActions(projectName).sendSignal('GET')),
    'rs-admin': projectName =>
      dispatch(adminDeactivateMaintenanceActions(projectName).sendSignal('GET')),
    'rs-cloud': projectName =>
      dispatch(cloudDeactivateMaintenanceActions(projectName).sendSignal('GET')),
    'rs-dam': projectName =>
      dispatch(damDeactivateMaintenanceActions(projectName).sendSignal('GET')),
    'rs-gateway': projectName =>
      dispatch(gatewayDeactivateMaintenanceActions(projectName).sendSignal('GET')),
  },
})

const mapStateToProps = state => ({
  maintenanceList: {
    'rs-access': accessMaintenanceSelectors.getResult(state),
    'rs-admin': adminMaintenanceSelectors.getResult(state),
    'rs-cloud': cloudMaintenanceSelectors.getResult(state),
    'rs-dam': damMaintenanceSelectors.getResult(state),
    'rs-gateway': gatewayMaintenanceSelectors.getResult(state),
  },
})

// Decorate with hateoas display logic
export default applyHateoasDisplayLogic(requiredEndpoints.MicroserviceBoardContainer, someMatchHateoasDisplayLogic)(connect(mapStateToProps, mapDispatchToProps)(MicroserviceBoardContainer))
