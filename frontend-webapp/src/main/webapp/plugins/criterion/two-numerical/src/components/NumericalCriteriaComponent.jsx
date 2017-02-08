/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
import TextField from 'material-ui/TextField'
import NumericalComparatorComponent from './NumericalComparatorComponent'

/**
 * Plugin component allowing the user to configure the numerical value of an attribute with a mathematical comparator (=, >, <=, ...).
 * The plugin's output is the execution of the passed {@code onChange} prop.
 *
 * @author Xavier-Alexandre Brochard
 */
export class NumericalCriteriaComponent extends React.Component {

  static propTypes = {
    /**
     * Plugin identifier
     */
    pluginInstanceId: React.PropTypes.number,
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
    attribute: React.PropTypes.shape({
      name: React.PropTypes.string,
      description: React.PropTypes.string,
      type: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props)
    this.state = {
      value: undefined,
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
    const { attribute, pluginInstanceId, onChange } = this.props
    const { comparator } = this.state

    this.setState({
      value: this.parse(newValue),
    })

    // Call the plugin's output callback
    onChange({
      attribute,
      comparator,
      value: newValue,
    }, pluginInstanceId)
  }

  /**
   * Callback function that is fired when the comparator's value changes.
   *
   * @param {String} comparator The new value of the comparator.
   */
  handleChangeComparator = (comparator) => {
    const { attribute, pluginInstanceId, onChange } = this.props
    const { value } = this.state

    this.setState({
      comparator,
    })

    // Call the plugin's output callback
    onChange({
      attribute,
      comparator,
      value,
    }, pluginInstanceId)
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
  format = value => value

  render() {
    const { attribute } = this.props

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'baseline',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0px 16px',
          }}
        >
          <span>{attribute.name}</span>
          <NumericalComparatorComponent onChange={this.handleChangeComparator} />
          <TextField
            id="search"
            type="number"
            floatingLabelText={'Nombre...'} // TODO
            value={this.format(this.state.value)}
            onChange={this.handleChangeValue}
            style={{
              top: -10,
              width: '33%',
            }}
          />
        </div>
      </div>
    )
  }
}

export default NumericalCriteriaComponent
