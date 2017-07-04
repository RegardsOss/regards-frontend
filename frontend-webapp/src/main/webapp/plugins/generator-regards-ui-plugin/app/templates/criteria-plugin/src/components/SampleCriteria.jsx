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
     * List of attributes associated to the plugin.
     * Keys of this object are the "name" props of the attributes defined in the plugin-info.json
     * Value of each keys are the attribute id (retrieved from the server) associated
     */
    attributes: React.PropTypes.objectOf(AttributeModel),
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
    this.setState({value})
  }

  /**
   * Method to create openSearch request associated to the current criteria
   *
   * @param state
   * @returns {string}
   */
  getPluginSearchQuery = (state) => {
    const attributeName = this.getAttributeName('searchField')
    let openSearchQuery = ''
    if (state.value && state.value.length > 0) {
      // Create openSearch query by adding " characters around the requested value
      openSearchQuery = `${attributeName}:"${state.value}"`
    }
    return openSearchQuery
  }

  parseOpenSearchQuery = (parameterName, openSearchQuery) => {
    // Return the value without the additional " characters
    return replace(openSearchQuery,/\"/g)
  }

  /**
   * Method to display search criteria
   */
  render() {
    const attributeLabel = this.getAttributeLabel('searchField')

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
