/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
import { FormattedMessage } from 'react-intl'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import PluginComponent from '../common/PluginComponent'
import AttributeModel from '../common/AttributeModel'

export class SampleCriteria extends PluginComponent {

  static propTypes = {
    /**
     * Plugin uniq identifier provided by the plugin loader
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

  /**
   * Class constructor
   * @param props
   */
  constructor(props) {
    super(props)
    this.state = {
      value:''
    }
  }

  /**
   * Method to change the value of the field
   *
   * @param value
   */
  changeValue = (value) => {
    this.setState({
      value
    }, this._onPluginChangeValue)
  }

  /**
   * Method to create openSearch request associated to the current criteria
   *
   * @param state
   * @returns {string}
   */
  getPluginSearchQuery = (state) => {
    let openSearchQuery = ''
    if (state.value && state.value.length > 0) {
      openSearchQuery = `${getAttributeName(this.props.attributes.searchField)}:"${state.value}*"`
    }
    return openSearchQuery
  }

  /**
   * Method to display search criteria
   * @returns {XML}
   */
  render() {
    const attributeLabel = this.props.attributes.searchField.name ? this.props.attributes.searchField.name : null

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            margin: '0px 10px',
          }}
        >
          {attributeLabel}
        </span>
        <TextField
          id="search"
          floatingLabelText={<FormattedMessage id="criterion.search.field.label"/>}
          value={this.state.value}
          onChange={(event, value) => {
            this.changeValue(value)
          }}
          style={{
            top: -13,
            margin: '0px 10px',
            maxWidth: 165,
          }}
        />
      </div>
    )
  }
}
export default SampleCriteria
