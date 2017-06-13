/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
import {FormattedMessage} from 'react-intl'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import Clear from 'material-ui/svg-icons/content/clear'
import NumericalComparatorComponent from './NumericalComparatorComponent'
import {AttributeModel, getAttributeName} from '../common/AttributeModel'
import PluginComponent from '../common/PluginComponent'

/**
 * TODO
 *
 * @author Xavier-Alexandre Brochard
 */
export class NumericalCriteriaComponent extends PluginComponent {

  static propTypes = {
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
      comparator: 'EQ',
    }
  }

  /**
   * Callback function that is fired when the textfield's value changes.
   *
   * @param {Object} event Change event targeting the text field.
   * @param {String} newValue The new value of the text field.
   */
  handleChangeValue = (event, newValue) => {
    const value = this.parse(newValue)
    this.setState({value},this._onPluginChangeValue)
  }

  handleChangeComparator = (comparator) => {
    this.setState({comparator},this._onPluginChangeValue)
  }

  /**
   * Clear the entered value
   */
  handleClear = () => {
    this.setState({
      value: '',
    }, this._onPluginChangeValue)
  }

  getPluginSearchQuery = (state) => {
    let query = ''
    if (state.value && state.comparator) {
      const attribute = getAttributeName(this.props.attributes.searchField)
      switch (state.comparator) {
        case "EQ":
          query = `${attribute}:${state.value}`
          break
        case "GE" :
          query = `${attribute}:[${state.value} TO *]`
          break
        case "LE" :
          query = `${attribute}:[* TO ${state.value}]`
          break
        case "NE" :
          query = `${attribute}:!${state.value}`
          break
        default :
          console.error("Unavailable comparator")
      }
    }

    return query
  }

  /**
   * Parses the value given from the field input component.
   *
   * @param {String} value
   */
  parse = value => parseFloat(value)

  /**
   * Formats the value before displaying in the field input component.
   *
   * @param {String} value
   */
  format = value => !isNaN(value) ? value : ''

  render() {
    const attributeLabel = this.props.attributes.searchField.label || this.props.attributes.searchField.name || this.props.attributes.searchField.id || 'Undefined attribute'
    const { value } = this.state
    const iconButtonScale = value === null || value === '' ? 0 : 1

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
            fontSize: '1.3em'
          }}
        >
          {attributeLabel}
        </span>
        <NumericalComparatorComponent onChange={this.handleChangeComparator}/>
        <TextField
          id="search"
          type="number"
          floatingLabelText={<FormattedMessage id="criterion.search.field.label"/>}
          value={this.format(value)}
          onChange={this.handleChangeValue}
          style={{
            top: -13,
            maxWidth: 80,
            margin: '0px 10px',
          }}
        />
        <IconButton
          tooltip={<FormattedMessage id="criterion.clear" />}
          style={{transform:`scale(${iconButtonScale})`}}
        >
          <Clear onTouchTap={this.handleClear}/>
        </IconButton>
      </div>
    )
  }
}

export default NumericalCriteriaComponent
