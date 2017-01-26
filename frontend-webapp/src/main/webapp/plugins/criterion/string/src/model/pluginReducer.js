/**
 * LICENSE_PLACEHOLDER
 **/
const PLUGIN_TEST = 'plugin/TEST'

function reducer(state = {
  pluginTest: false,
  message: 'Loading plugin.',
}, action) {
  switch (action.type) {
    case PLUGIN_TEST:
      return { ...state, pluginTest: true }
  }
  return state
}

export default {
  pluginTest: reducer,
}
