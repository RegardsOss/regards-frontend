/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from 'react-redux'
import { forEach, map } from 'lodash'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { applyHateoasDisplayLogic, someMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import MicroserviceBoardComponent from '../components/MicroserviceBoardComponent'
import requiredEndpoints from '../requiredEndpoints'
import MaintenanceModeActions from '../model/MaintenanceModeActions'
import MaintenanceModeSelectors from '../model/MaintenanceModeSelectors'
import SetMaintenanceModeActions from '../model/SetMaintenanceModeActions'
import microservices from '../data/microservices.json'

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
    fetchMaintenance: React.PropTypes.func,
    setMaintenance: React.PropTypes.func,
    maintenanceList: React.PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  componentWillMount() {
    this.maintenance = {}

    forEach(microservices, (microservice) => {
      this.maintenance[microservice.name] = {}
      this.maintenance[microservice.name].isOn = projectName => this.props.maintenanceList(microservice.name)[projectName]
      this.maintenance[microservice.name].fetch = () => this.props.fetchMaintenance(microservice.name)
      this.maintenance[microservice.name].set = (projectName, value) =>
        this.handleSetMaintenance(microservice.name, projectName, value ? 'activate' : 'desactivate')
    })

    this.refreshMaintenanceStatusAlt()
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  refreshMaintenanceStatusAlt = () => {
    const tasks = map(microservices, microservice => this.props.fetchMaintenance(microservice.name))
    Promise.all(tasks).then(this.timeout = setTimeout(this.refreshMaintenanceStatusAlt, 10000))
  }

  handleSetMaintenance = (microserviceName, projectName, action) => {
    Promise.resolve(this.props.setMaintenance(microserviceName, projectName, action))
      .then((actionResult) => {
        this.props.fetchMaintenance(microserviceName)
      })
  }

  render() {
    return (
      <I18nProvider messageDir="modules/admin-microservice-management/src/i18n">
        <MicroserviceBoardComponent
          project={this.props.params.project}
          maintenance={this.maintenance}
        />
      </I18nProvider>
    )
  }
}

const mapStateToProps = state => ({
  maintenanceList(microservice) {
    return MaintenanceModeSelectors(microservice).getResult(state)
  },
})

const mapDispatchToProps = dispatch => ({
  fetchMaintenance(microservice) {
    dispatch(MaintenanceModeActions(microservice).sendSignal('GET'))
  },
  setMaintenance(microservice, projectName, action) {
    dispatch(SetMaintenanceModeActions(microservice).sendSignal('GET', null, { microservice, action, projectName }))
  },
})


// Decorate with hateoas display logic
export default applyHateoasDisplayLogic(requiredEndpoints.MicroserviceBoardContainer, someMatchHateoasDisplayLogic)(connect(mapStateToProps, mapDispatchToProps)(MicroserviceBoardContainer))
