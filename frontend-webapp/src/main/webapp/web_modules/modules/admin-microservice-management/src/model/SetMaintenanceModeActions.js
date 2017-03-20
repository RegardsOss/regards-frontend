/**
 * LICENSE_PLACEHOLDER
 **/
import replace from 'lodash/replace'
import { BasicSignalActions, RequestVerbEnum } from '@regardsoss/store-utils'

class SetMaintenanceModeActions extends BasicSignalActions {
  constructor(microserviceName) {
    super({
      namespace: `admin-microservice-management/set-maintenance-${microserviceName}`,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/{microservice}/maintenances/{tenant}/{action}`,
    })
    this.microserviceName = microserviceName
  }

  getActivateDependency = () => {
    let dependency = this.getDependency(RequestVerbEnum.PUT)
    dependency = replace(dependency,'{microservice}',this.microserviceName)
    return replace(dependency,'{action}','activate')
  }

  getDesactivateDependency = () => {
    let dependency = this.getDependency(RequestVerbEnum.PUT)
    dependency = replace(dependency,'{microservice}',this.microserviceName)
    return replace(dependency,'{action}','desactivate')
  }

}

export default microserviceName => new SetMaintenanceModeActions(microserviceName)
