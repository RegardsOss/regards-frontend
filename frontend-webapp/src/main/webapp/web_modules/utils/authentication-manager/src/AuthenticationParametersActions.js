/**
* LICENSE_PLACEHOLDER
**/

const APPLICATION_STARTED = 'authentication/collect-parameters'
const INSTANCE = 'instance'

/**
 * Actions used to collect required parameters for authentication at application startup
 */
export default {
  APPLICATION_STARTED,
  INSTANCE,
  applicationStarted(project = INSTANCE) {
    return {
      type: APPLICATION_STARTED,
      project,
    }
  },
}

