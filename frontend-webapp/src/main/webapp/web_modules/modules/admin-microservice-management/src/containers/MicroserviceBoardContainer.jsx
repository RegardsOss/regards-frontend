/**
 * LICENSE_PLACEHOLDER
 **/
import forEach from 'lodash/forEach'
import { connect } from '@regardsoss/redux'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import MicroserviceBoardComponent from '../components/MicroserviceBoardComponent'
import MaintenanceModeActions from '../model/MaintenanceModeActions'
import MaintenanceModeSelectors from '../model/MaintenanceModeSelectors'
import SetMaintenanceModeActions, { MAINTENANCES_ACTIONS } from '../model/SetMaintenanceModeActions'

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

  constructor(props) {
    super(props)

    this.state = {
      microservicesMaintenance: {},
    }
  }

  componentDidMount() {
    forEach(STATIC_CONFIGURATION.microservices, microservice => this.props.fetchMaintenance(microservice))
  }

  componentWillReceiveProps() {
    const microservicesMaintenance = {}
    forEach(STATIC_CONFIGURATION.microservices, (microservice) => {
      microservicesMaintenance[microservice] = {}
      microservicesMaintenance[microservice].isOn = (projectName) => {
        const maintenanceTenants = this.props.maintenanceList(microservice).content
        if (maintenanceTenants) {
          return maintenanceTenants[projectName]
        }
        return false
      }
      microservicesMaintenance[microservice].set = (projectName, value) =>
        this.handleSetMaintenance(microservice, projectName, value ? MAINTENANCES_ACTIONS.ACTIVATE : MAINTENANCES_ACTIONS.DISABLE)
    })
    this.setState({
      microservicesMaintenance,
    })
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
          maintenance={this.state.microservicesMaintenance}
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
    dispatch(SetMaintenanceModeActions(microservice).sendSignal('PUT', null, {
      microservice,
      action,
      tenant: projectName,
    }))
  },
})


// Decorate with hateoas display logic
export default connect(mapStateToProps, mapDispatchToProps)(MicroserviceBoardContainer)
