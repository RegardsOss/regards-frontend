/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
import { FormattedMessage } from 'react-intl'
import TextField from 'material-ui/TextField'
import NumericalComparatorComponent from './NumericalComparatorComponent'
import ClearButton from './ClearButton'
import PluginComponent from '../common/PluginComponent'
import AttributeModel from '../common/AttributeModel'

/**
 * Search form criteria plugin displaying a simple number field
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

  state = {
    value: undefined,
    comparator: 'EQ',
  }

  /**
   * Callback function that is fired when the textfield's value changes.
   *
   * @param {Object} event Change event targeting the text field.
   * @param {String} newValue The new value of the text field.
   */
  handleChangeValue = (event, newValue) => {
    const value = this.parse(newValue)
    this.setState({ value })
  }

  handleChangeComparator = (comparator) => {
    this.setState({ comparator })
  }

  /**
   * Clear the entered value
   */
  handleClear = () => {
    this.setState({ value: undefined })
  }

  getPluginSearchQuery = (state) => {
    let query = ''
    if (state.value && state.comparator) {
      const attribute = this.getAttributeName('searchField')
      switch (state.comparator) {
        case 'EQ':
          query = `${attribute}:${state.value}`
          break
        case 'GE' :
          query = `${attribute}:[${state.value} TO *]`
          break
        case 'LE' :
          query = `${attribute}:[* TO ${state.value}]`
          break
        case 'NE' :
          query = `${attribute}:!${state.value}`
          break
        default :
          console.error('Unavailable comparator')
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
    const attributeLabel = this.getAttributeLabel('searchField')
    const { value } = this.state
    const clearButtonDisplayed = !isNaN(value)

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
            fontSize: '1.3em',
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
        <ClearButton onTouchTap={this.handleClear} displayed={clearButtonDisplayed}/>
      </div>
    )
  }
}

export default NumericalCriteriaComponent
