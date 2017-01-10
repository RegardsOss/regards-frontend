/**
 * LICENSE_PLACEHOLDER
 **/

// Init the regards plugin in the application.
// The plugin is added to the application store to be used by the application.
const initPlugin = ( pluginName, pluginClass ) => {
  /*const mapDispatchToProps = ( dispatch ) => {return { dispatch: dispatch }}
  const mapStateToProps = ( state ) => {return { store: state } }
  const Plugin = connect(mapStateToProps,mapDispatchToProps)(pluginClass)
  let event = new CustomEvent('plugin', { 'detail': {name: pluginName, plugin: Plugin }})
  */
  let event = new CustomEvent('plugin', { 'detail': {name: pluginName, plugin: pluginClass }})
  document.dispatchEvent(event)
}

export { initPlugin }
