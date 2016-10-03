import { connect } from 'react-redux';

// Init the regards plugin in the application.
// The plugin is added to the application store to be used by the application.
const initPlugin = ( pluginName, pluginClass ) => {
  const mapDispatchToProps = ( dispatch ) => {return { dispatch: dispatch }};
  const mapStateToProps = ( state ) => {return { store: state } };
  const Plugin = connect(mapStateToProps)(pluginClass)
  let event = new CustomEvent('plugin', { name: pluginName, plugin: Plugin }});
  document.dispatchEvent(event);
}

export { initPlugin }
