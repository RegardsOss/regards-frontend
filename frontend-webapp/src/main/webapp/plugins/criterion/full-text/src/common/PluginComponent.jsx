/**
 * LICENSE_PLACEHOLDER
 **/
import merge from 'lodash/merge'
import isEqual from 'lodash/isEqual'
import React from 'react'
import {AttributeModel} from '../common/AttributeModel'

/**
 * Abstract class to extend in order to create a criterion plugin.
 * This class provides :
 * _onPluginChangeValue function that allow plugins to communicate with global search form
 * to save the plugin state.
 *
 * The function getPluginSearchQuery must be override to allow search form to get the plugin open search query.
 *  *
 * @author Sébastien Binda
 */
class PluginComponent extends React.Component {

  static propTypes = {
    /**
     * Plugin identifier
     */
    pluginInstanceId: React.PropTypes.string,
    /**
     * Callback to change the current criteria values in form
     * Parameters :
     * criteria : an object like : {attribute:<AttributeModel>, comparator:<ComparatorEnumType>, value:<value>}
     * id: current plugin identifier
     */
    onChange: React.PropTypes.func,
    /**
     * List of attributes associated to the plugin.
     * Keys of this object are the "name" props of the attributes defined in the plugin-info.json
     * Value of each keys are the attribute id (retrieved from the server) associated
     */
    attributes: React.PropTypes.objectOf(AttributeModel),
    /**
     * Function to get initial plugin state saved by the next props savePluginState
     */
    getDefaultState: React.PropTypes.func,
    /**
     * Save the current state in order to retrieve it at initialization with getDefaultState
     */
    savePluginState: React.PropTypes.func,
  }

  componentWillMount() {
    const defaultState = this.props.getDefaultState(this.props.pluginInstanceId)
    if (this.state && defaultState) {
      const newState = merge({}, this.state, defaultState)
      this.setState(newState)
    }
  }

  componentDidMount() {
    // If initial state is not the default one, send conf to search form
    if (!isEqual(this.state, this.props.getDefaultState(this.props.pluginInstanceId))) {
      const query = this.getPluginSearchQuery(this.state)
      if (query) {
        this.props.onChange(query, this.props.pluginInstanceId)
      }
    }
  }

  _onPluginChangeValue = () => {
    // Generate query
    const query = this.getPluginSearchQuery(this.state)
    // Update plugin saved state into search form
    this.props.savePluginState(this.props.pluginInstanceId, this.state)
    // Change value into searchForm
    this.props.onChange(query, this.props.pluginInstanceId)
  }

  getPluginSearchQuery() {
    console.error("method getPluginSearchQuery should be overide by plugin !")
    return null
  }
}

export default PluginComponent
