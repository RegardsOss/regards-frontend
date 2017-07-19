/**
* LICENSE_PLACEHOLDER
**/

/**
 * Actions to handle running a plugin service
 */
class RunPluginServiceActions {

  constructor() {
    this.RUN_SERVICE = 'search-results/run-plugin-service/RUN_SERVICE'
    this.CLOSE_SERVICE = 'search-results/run-plugin-service/CLOSE_SERVICE'
  }

  /**
  * Runs a service
  * @param {Service} service service to run
  * @param {ServiceTarget} target service target
  */
  runService(service, target) {
    return {
      type: this.RUN_SERVICE,
      service,
      target,
    }
  }

  closeService(service, target) {
    return {
      type: this.CLOSE_SERVICE,
    }
  }

}

export default new RunPluginServiceActions()
