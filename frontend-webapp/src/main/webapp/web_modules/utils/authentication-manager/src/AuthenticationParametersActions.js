/**
* LICENSE_PLACEHOLDER
**/

const APPLICATION_STARTED = 'authentication/collect-parameters'
const INSTANCE = 'instance'

/**
 * Actions used to collect required parameters for authentication at application startup
 */
module.exports = {
  // single action ID
  APPLICATION_STARTED,
  // application instance name
  INSTANCE,
  // single action builder
  applicationStarted(project = INSTANCE) {
    return {
      type: APPLICATION_STARTED,
      project,
    }
  },
}

