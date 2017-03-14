/**
* LICENSE_PLACEHOLDER
**/

const APPLICATION_STARTED = 'authentication/collect-parameters'

/**
 * Actions used to collect required parameters for authentication at application startup
 */
export default {
  APPLICATION_STARTED,
  applicationStarted(project) {
    return {
      type: APPLICATION_STARTED,
      project,
    }
  },


}

