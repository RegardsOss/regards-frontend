/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
import {FormattedMessage} from 'react-intl'
import TextField from 'material-ui/TextField'
import {AttributeModel, getAttributeName} from '../common/AttributeModel'

export class StringCriteriaComponent extends React.Component {

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
  }

  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }

  changeValue = (value) => {
    let openSearchQuery = ''
    if (value && value.length > 0) {
      openSearchQuery = `${getAttributeName(this.props.attributes.searchField)}:${value}*`
    }
    this.props.onChange(openSearchQuery, this.props.pluginInstanceId)
    this.setState({
      value,
    })

  }

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

export default StringCriteriaComponent
