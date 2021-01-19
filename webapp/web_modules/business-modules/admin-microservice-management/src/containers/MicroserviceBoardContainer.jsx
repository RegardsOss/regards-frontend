/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import sortBy from 'lodash/sortBy'
import map from 'lodash/map'
import get from 'lodash/get'
import concat from 'lodash/concat'
import { connect } from '@regardsoss/redux'
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import MicroserviceBoardComponent from '../components/MicroserviceBoardComponent'
import MaintenanceModeActions from '../model/MaintenanceModeActions'
import MaintenanceModeSelectors from '../model/MaintenanceModeSelectors'
import SetMaintenanceModeActions, { MAINTENANCES_ACTIONS } from '../model/SetMaintenanceModeActions'
import { microserviceInfoActions } from '../clients/MicroserviceInfoClient'
import { MicroserviceConfBackupStatusActions, MicroserviceConfBackupStatusSelector } from '../clients/MicroserviceConfBackupStatusClient'
import messages from '../i18n'

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
    fetchMaintenance: PropTypes.func.isRequired,
    fetchBackupConfStatus: PropTypes.func.isRequired,
    backupConfAvailable: PropTypes.func.isRequired,
    checkMicroserviceStatus: PropTypes.func.isRequired,
    setMaintenance: PropTypes.func.isRequired,
    maintenanceList: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  state = {
    microservicesUp: [],
  }

  componentDidMount() {
    // For each microservice, check if it is up
    return map(STATIC_CONF.MSERVICES, (microservice) => (
      Promise.resolve(this.props.checkMicroserviceStatus(microservice)).then((actionResult) => {
        if (!actionResult.error) {
          // If microservice is Up, check related info
          this.setState({
            microservicesUp: sortBy(concat([], this.state.microservicesUp, [microservice]), (value) => value),
          }, () => this.fetchRelatedInformations(microservice))
        }
        return actionResult
      })
    ))
  }

  /**
   * If a microservice is up, fetch its maintenance mode and if this microservice can export its conf.
   */
  fetchRelatedInformations = (microserviceName) => {
    this.props.fetchMaintenance(microserviceName)
    this.props.fetchBackupConfStatus(microserviceName)
  }

  isMicroserviceActive = (microserviceName) => get(this.props.maintenanceList(microserviceName), `content.${this.props.params.project}.active`, false)

  isMicroserviceBackupable = (microserviceName) => this.props.backupConfAvailable(microserviceName)

  toggleMaintenance = (microserviceName) => {
    const isActive = this.isMicroserviceActive(microserviceName)
    const action = isActive ? MAINTENANCES_ACTIONS.DISABLE : MAINTENANCES_ACTIONS.ACTIVATE
    return Promise.resolve(this.props.setMaintenance(microserviceName, action))
      .then((actionResult) => this.props.fetchMaintenance(microserviceName))
  }

  render() {
    return (
      <I18nProvider messages={messages}>
        <MicroserviceBoardComponent
          project={this.props.params.project}
          microservices={this.state.microservicesUp}
          isMicroserviceActive={this.isMicroserviceActive}
          isMicroserviceBackupable={this.isMicroserviceBackupable}
          toggleMaintenance={this.toggleMaintenance}
        />
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  maintenanceList(microservice) {
    return MaintenanceModeSelectors(microservice).getResult(state)
  },
  backupConfAvailable(microservice) {
    return !MicroserviceConfBackupStatusSelector(microservice).isFetching(state) && !MicroserviceConfBackupStatusSelector(microservice).hasError(state)
  },
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  checkMicroserviceStatus: (microserviceName) => dispatch(microserviceInfoActions.check(microserviceName)),
  fetchMaintenance: (microservice) => dispatch(MaintenanceModeActions(microservice).sendSignal('GET')),
  fetchBackupConfStatus: (microserviceName) => dispatch(MicroserviceConfBackupStatusActions(microserviceName).check(microserviceName)),
  setMaintenance: (microservice, action) => dispatch(SetMaintenanceModeActions(microservice).sendSignal('PUT', null, {
    microservice,
    action,
    tenant: ownProps.params.project,
  })),
})

// Decorate with hateoas display logic
export default connect(mapStateToProps, mapDispatchToProps)(MicroserviceBoardContainer)
