/**
 * LICENSE_PLACEHOLDER
 **/
import replace from 'lodash/replace'
import { BasicSignalActions, RequestVerbEnum } from '@regardsoss/store-utils'

const MAINTENANCES_ACTIONS = {
  ACTIVATE : 'enable',
  DISABLE : 'disable'
}

class SetMaintenanceModeActions extends BasicSignalActions {
  constructor(microserviceName) {
    super({
      namespace: `admin-microservice-management/set-maintenance-${microserviceName}`,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/{microservice}/maintenance/{tenant}/{action}`,
    })
    this.microserviceName = microserviceName
  }

  getActivateDependency = () => {
    let dependency = this.getDependency(RequestVerbEnum.PUT)
    dependency = replace(dependency, '{microservice}', this.microserviceName)
    return replace(dependency, '{action}', MAINTENANCES_ACTIONS.ACTIVATE)
  }

  getDesactivateDependency = () => {
    let dependency = this.getDependency(RequestVerbEnum.PUT)
    dependency = replace(dependency, '{microservice}', this.microserviceName)
    return replace(dependency, '{action}', MAINTENANCES_ACTIONS.DISABLE)
  }

}

export {
  MAINTENANCES_ACTIONS
}
export default microserviceName => new SetMaintenanceModeActions(microserviceName)
