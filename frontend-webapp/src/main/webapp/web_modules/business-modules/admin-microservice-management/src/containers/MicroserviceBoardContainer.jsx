/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import concat from 'lodash/concat'
import { connect } from '@regardsoss/redux'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import MicroserviceBoardComponent from '../components/MicroserviceBoardComponent'
import MaintenanceModeActions from '../model/MaintenanceModeActions'
import MaintenanceModeSelectors from '../model/MaintenanceModeSelectors'
import SetMaintenanceModeActions, { MAINTENANCES_ACTIONS } from '../model/SetMaintenanceModeActions'
import MicroserviceInfoClient from '../clients/MicroserviceInfoClient'

/**
 * Module container connecting {@link MicroserviceBoardComponent} to redux in order to display the list of microservices.
 *
 * @author Xavier-Alexandre Brochard
 */
export class MicroserviceBoardContainer extends React.Component {

  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    fetchMaintenance: PropTypes.func,
    checkMicroserviceStatus: PropTypes.func,
    setMaintenance: PropTypes.func,
    maintenanceList: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  state = {
    microservicesMaintenance: {},
    microservicesUp: [],
  }

  componentDidMount() {
    // For each microservice, check if it is up
    return map(STATIC_CONF.MSERVICES, microservice => (
      Promise.resolve(this.props.checkMicroserviceStatus(microservice)).then((actionResult) => {
        // If microservice is Up, then check for maintenance mode.
        if (!actionResult.error) {
          this.setState({
            microservicesUp: concat([], this.state.microservicesUp, [microservice]),
          }, () => this.props.fetchMaintenance(microservice))
        }
        return actionResult
      })
    ))
  }

  componentWillReceiveProps() {
    const microservicesMaintenance = {}
        // Only display active microservices.
    forEach(this.state.microservicesUp, (microservice) => {
            // Build maintenance informations for the given microservice
      microservicesMaintenance[microservice] = {}
      microservicesMaintenance[microservice].isOn = (projectName) => {
        const maintenanceTenants = this.props.maintenanceList(microservice).content
        if (maintenanceTenants && maintenanceTenants[projectName]) {
          return maintenanceTenants[projectName].active
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

  handleSetMaintenance = (microserviceName, projectName, action) => Promise.resolve(this.props.setMaintenance(microserviceName, projectName, action))
      .then(actionResult => this.props.fetchMaintenance(microserviceName))

  render() {
    return (
      <I18nProvider messageDir="business-modules/admin-microservice-management/src/i18n">
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
  checkMicroserviceStatus: microserviceName => dispatch(MicroserviceInfoClient.microserviceInfoActions.check(microserviceName)),
  fetchMaintenance: microservice => dispatch(MaintenanceModeActions(microservice).sendSignal('GET')),
  setMaintenance: (microservice, projectName, action) => dispatch(SetMaintenanceModeActions(microservice).sendSignal('PUT', null, {
    microservice,
    action,
    tenant: projectName,
  })),
})


// Decorate with hateoas display logic
export default connect(mapStateToProps, mapDispatchToProps)(MicroserviceBoardContainer)
