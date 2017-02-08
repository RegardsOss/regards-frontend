/**
 * LICENSE_PLACEHOLDER
 **/
import React from 'react'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import NumericalComparatorComponent from './NumericalComparatorComponent'

/**
 * TODO
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
    attributes: React.PropTypes.object,
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
    const { attributes, pluginInstanceId, onChange } = this.props
    const { comparator } = this.state
    this.setState({
      value: this.parse(newValue),
    })
    onChange({
      attribute: attributes.searchField,
      comparator,
      value: newValue,
    }, pluginInstanceId)
  }

  handleChangeComparator = (comparator) => {
    this.setState({
      comparator,
    })
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
    const attributeLabel = this.props.attributes && this.props.attributes.searchField && this.props.attributes.searchField.name

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'baseline',
        }}
      >
        <Paper
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0px 16px',
            maxWidth: 400,
          }}
        >
          <span>{attributeLabel}</span>
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
        </Paper>
      </div>
    )
  }
}

export default NumericalCriteriaComponent
