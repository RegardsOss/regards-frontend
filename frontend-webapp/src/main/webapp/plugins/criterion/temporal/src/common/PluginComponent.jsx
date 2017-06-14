/**
 * LICENSE_PLACEHOLDER
 **/
import merge from 'lodash/merge'
import get from 'lodash/get'
import transform from 'lodash/transform'
import React from 'react'
import AttributeModel from './AttributeModel'

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
    const query = this.getPluginSearchQuery(this.state)
    if (query && query != '') {
      this.props.onChange(query, this.props.pluginInstanceId)
    }

    const initValues = transform(this.props.attributes, (result, attribute, key) => {
      const initValue = this.getAttributeInitValue(key, this.props)
      if (initValue) {
        result[key] = initValue
      }
    }, {})

    this.setState(initValues)
  }

  /**
   * Update state with new values form the Manager.
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {

    // If initial value set value to the state
    let toUpdate = false
    const initValues = transform(nextProps.attributes, (result, attribute, key) => {
      const initValue = this.getAttributeInitValue(key, nextProps)
      if (initValue && initValue !== this.state[key]){
        toUpdate = true
        result[key] = initValue
      }
    }, {})

    if (toUpdate) {
      this.setState(initValues)
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

  getAttributeName(configuredAttributeName, props){
    const attribute = get(props || this.props, `attributes[${configuredAttributeName}]`)
    if (!attribute) {
      return null
    }
    return attribute.jsonPath
  }

  /**
   * Return the initial value of the configured attribute as it is given from the search-form manager.
   * @param attributeName
   * @returns {*}
   */
  getAttributeInitValue(configuredAttributeName, props) {
    const attribute = get(props, `attributes[${configuredAttributeName}]`)
    if (!attribute) {
      return null
    }
    const attributeName = this.getAttributeName(attribute, props)
    return get(props, `initialValues[${attributeName}]`)
  }

  getAttributeLabel(configuredAttributeName) {
    return get(this.props,`attributes[${configuredAttributeName}].label`,get(this.props,`attributes[${configuredAttributeName}].name`,'Undefined attribute'))
  }

  setState(state) {
    super.setState(state,this._onPluginChangeValue)
  }
}

export default PluginComponent
