/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from 'react-redux';

// Init the regards plugin in the application.
// The plugin is added to the application store to be used by the application.
const initPlugin = ( pluginName, pluginClass, reducer, messages, pluginInfo ) => {

  const mapStateToProps= (state) => ({
    locale: state.common.i18n.locale,
    theme: state.common.theme
  })

  const mapDispatchToProps= (dispatch) => ({
    test: () => dispatch({type:'RECEIVE_ERROR', message: `Plugin ${pluginName} loaded` })
  })

  const plugin = connect(mapStateToProps, mapDispatchToProps)(pluginClass)
  let event = new CustomEvent('plugin', { 'detail': {name: pluginName, plugin: plugin, messages: messages, reducer: reducer, info: pluginInfo}})
  document.dispatchEvent(event)
}

export { initPlugin }
